import React, { useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const [taches, setTaches] = useState([
    { id: 100, text: "Devenir freelance", parentId: null, done: false },
    { id: 101, text: "Créer un portfolio", parentId: 100, done: false },
    { id: 102, text: "Trouver 3 clients", parentId: 100, done: false },
    { id: 103, text: "Fixer ses tarifs", parentId: 100, done: false },

    { id: 200, text: "Être en meilleure forme", parentId: null, done: false },
    { id: 201, text: "Aller à la salle 3x / semaine", parentId: 200, done: false },
    { id: 202, text: "Marcher 8 000 pas / jour", parentId: 200, done: false },
  ]);

  const [text, setText] = useState("");

  const [showDone, setShowDone] = useState(false);

  const [editVisible, setEditVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const [childDraftParentId, setChildDraftParentId] = useState(null);
  const [childText, setChildText] = useState("");

  const parents = useMemo(() => taches.filter((t) => t.parentId == null), [taches]);

  const childrenByParent = useMemo(() => {
    const map = new Map();
    for (const t of taches) {
      if (t.parentId != null) {
        if (!map.has(t.parentId)) map.set(t.parentId, []);
        map.get(t.parentId).push(t);
      }
    }
    return map;
  }, [taches]);

  function getChildren(parentId) {
    return childrenByParent.get(parentId) || [];
  }

  function computeParentDone(parentId, list) {
    const kids = list.filter((x) => x.parentId === parentId);
    if (kids.length === 0) return false;
    return kids.every((k) => k.done);
  }

  function addParent() {
    if (!text.trim()) return;
    const newId = Date.now();
    setTaches((prev) => [...prev, { id: newId, text: text.trim(), parentId: null, done: false }]);
    setText("");
  }

  function startAddChild(parentId) {
    setChildDraftParentId(parentId);
    setChildText("");
  }

  function confirmAddChild() {
    if (childDraftParentId == null) return;
    if (!childText.trim()) return;

    const newId = Date.now();
    const pid = childDraftParentId;

    setTaches((prev) => {
      const next = [
        ...prev,
        { id: newId, text: childText.trim(), parentId: pid, done: false },
      ];

      return next.map((t) => (t.id === pid ? { ...t, done: false } : t));
    });

    setChildText("");
    setChildDraftParentId(null);
  }

  function cancelAddChild() {
    setChildText("");
    setChildDraftParentId(null);
  }

  function deleteTache(id) {
    setTaches((prev) => {
      const toDelete = prev.find((t) => t.id === id);
      if (!toDelete) return prev;

      if (toDelete.parentId == null) {
        return prev.filter((t) => t.id !== id && t.parentId !== id);
      }

      const parentId = toDelete.parentId;
      const next = prev.filter((t) => t.id !== id);

      const parentDone = computeParentDone(parentId, next);
      return next.map((t) => (t.id === parentId ? { ...t, done: parentDone } : t));
    });
  }

  function updateTache(id, newText) {
    setTaches((prev) => prev.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  }

  function toggleChildDone(childId) {
    setTaches((prev) => {
      const child = prev.find((t) => t.id === childId);
      if (!child) return prev;
      if (child.parentId == null) return prev;

      const parentId = child.parentId;

      const toggled = prev.map((t) => (t.id === childId ? { ...t, done: !t.done } : t));

      const parentDone = computeParentDone(parentId, toggled);

      return toggled.map((t) => (t.id === parentId ? { ...t, done: parentDone } : t));
    });
  }

  function openEdit(item) {
    setEditId(item.id);
    setEditText(item.text);
    setEditVisible(true);
  }

  function saveEdit() {
    if (editId == null) return;
    if (!editText.trim()) return;
    updateTache(editId, editText.trim());
    setEditVisible(false);
  }

  const doneParents = useMemo(() => parents.filter((p) => p.done), [parents]);

  function renderParent({ item: parent }) {
    const kids = getChildren(parent.id);
    const doneCount = kids.filter((k) => k.done).length;
    const progressText = `${doneCount}/${kids.length}`;

    return (
      <View style={styles.block}>
        <TodoItem
          item={parent}
          type="parent"
          mode="active"
          progressText={progressText}
          onAddChild={startAddChild}
          onEdit={openEdit}
          onDelete={deleteTache}
          disableEdit={false}
        />

        {childDraftParentId === parent.id ? (
          <View style={styles.childComposer}>
            <TextInput
              style={styles.childInput}
              value={childText}
              onChangeText={setChildText}
              placeholder="Ajouter un sous-objectif..."
              autoFocus
            />
            <Pressable
              onPress={confirmAddChild}
              android_ripple={{ color: "rgba(0,0,0,0.12)" }}
              style={[styles.smallBtn, styles.smallBtnPrimary]}
            >
              <Text style={styles.smallBtnText}>Ajouter</Text>
            </Pressable>
            <Pressable
              onPress={cancelAddChild}
              android_ripple={{ color: "rgba(0,0,0,0.12)" }}
              style={[styles.smallBtn, styles.smallBtnGhost]}
            >
              <Text style={styles.smallBtnTextGhost}>Annuler</Text>
            </Pressable>
          </View>
        ) : null}

        {kids.length === 0 ? (
          <Text style={styles.hint}>Ajoute des sous-objectifs pour terminer cet objectif.</Text>
        ) : (
          <View style={styles.children}>
            {kids.map((child) => (
              <TodoItem
                key={child.id}
                item={child}
                type="child"
                mode="active"
                onToggleChild={toggleChildDone}
                onEdit={openEdit}
                onDelete={deleteTache}
                disableEdit={false}
              />
            ))}
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Objectifs principaux</Text>

        <Pressable onPress={() => setShowDone(true)} style={styles.doneTag}>
          <Text style={styles.doneTagText}>Terminés ({doneParents.length})</Text>
        </Pressable>
      </View>

      {/* Ajouter parent */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Ajouter un objectif principal..."
        />
        <Pressable
          onPress={addParent}
          android_ripple={{ color: "rgba(0,0,0,0.12)" }}
          style={styles.addBtn}
        >
          <Text style={styles.addBtnText}>+</Text>
        </Pressable>
      </View>

      {/* Liste parents */}
      {parents.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Ajoute ton premier objectif </Text>
        </View>
      ) : (
        <FlatList
          data={parents}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={renderParent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Modal terminés */}
      <Modal visible={showDone} animationType="slide">
        <KeyboardAvoidingView
          style={styles.modal}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Objectifs terminés</Text>
            <Pressable onPress={() => setShowDone(false)} style={styles.closeBtn}>
              <Text style={styles.closeText}>Fermer</Text>
            </Pressable>
          </View>

          {doneParents.length === 0 ? (
            <Text style={styles.modalEmpty}>Aucun objectif accompli.</Text>
          ) : (
            <FlatList
              data={doneParents}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.list}
              renderItem={({ item: parent }) => {
                const kids = getChildren(parent.id);
                const progressText = `${kids.length}/${kids.length}`;

                return (
                  <View style={styles.block}>
                    <TodoItem
                      item={parent}
                      type="parent"
                      mode="done"
                      progressText={progressText}
                      onAddChild={() => {}}
                      onEdit={() => {}}
                      onDelete={deleteTache}
                      disableEdit={true}
                    />

                    <View style={styles.children}>
                      {kids.map((child) => (
                        <TodoItem
                          key={child.id}
                          item={child}
                          type="child"
                          mode="done"
                          onToggleChild={toggleChildDone} 
                          onEdit={() => {}}
                          onDelete={deleteTache}
                          disableEdit={true}
                        />
                      ))}
                    </View>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </KeyboardAvoidingView>
      </Modal>

      <Modal visible={editVisible} transparent animationType="fade">
        <KeyboardAvoidingView
          style={styles.editBackdrop}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.editCard}>
            <Text style={styles.editTitle}>Modifier</Text>

            <TextInput
              value={editText}
              onChangeText={setEditText}
              style={styles.editInput}
              autoFocus
            />

            <View style={styles.editActions}>
              <Pressable onPress={() => setEditVisible(false)} style={styles.editCancel}>
                <Text style={styles.editCancelText}>Annuler</Text>
              </Pressable>

              <Pressable onPress={saveEdit} style={styles.editSave}>
                <Text style={styles.editSaveText}>Enregistrer</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  headerText: { fontSize: 16, fontWeight: "800" },

  doneTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f7f7f7",
  },
  doneTagText: { fontWeight: "800" },

  inputRow: { flexDirection: "row", gap: 8, alignItems: "center" },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  addBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f3f3f3",
    overflow: "hidden",
  },
  addBtnText: { fontWeight: "900", fontSize: 18 },

  list: { gap: 12, paddingTop: 10, paddingBottom: 24 },

  block: { gap: 10 },
  children: { gap: 10 },

  hint: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: "700",
    opacity: 0.65,
  },

  childComposer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginLeft: 18,
  },
  childInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  smallBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  smallBtnPrimary: {
    backgroundColor: "rgba(99,102,241,0.14)",
    borderColor: "rgba(99,102,241,0.28)",
  },
  smallBtnGhost: {
    backgroundColor: "rgba(100,116,139,0.10)",
    borderColor: "rgba(100,116,139,0.22)",
  },
  smallBtnText: { fontWeight: "900", color: "#3730a3" },
  smallBtnTextGhost: { fontWeight: "900", color: "#334155" },

  emptyBox: {
    marginTop: 16,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.75)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
  },

  modal: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  modalTitle: { fontSize: 22, fontWeight: "900" },
  modalEmpty: { fontSize: 14, fontWeight: "700", opacity: 0.7 },

  closeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f3f3f3",
  },
  closeText: { fontWeight: "900" },

  editBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    padding: 16,
  },
  editCard: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  editTitle: { fontSize: 16, fontWeight: "900", marginBottom: 10 },
  editInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  editActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 12,
  },
  editCancel: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f3f3f3",
  },
  editCancelText: { fontWeight: "900" },
  editSave: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "rgba(59,130,246,0.18)",
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.25)",
  },
  editSaveText: { fontWeight: "900", color: "#1d4ed8" },
});
