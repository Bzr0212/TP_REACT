import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

/**
 * UX:
 * - Suppression uniquement via swipe (pas de bouton ❌)
 * - Edition via appui long sur le texte (pas de bouton ✏️)
 * - Enfants : toggle done/undo visible
 * - Parents : bouton + pour ajouter un sous-objectif
 */
export default function TodoItem({
  item,
  type, // "parent" | "child"
  mode = "active", // "active" | "done"
  progressText, // parent: "2/3"
  onToggleChild, // (childId) => void
  onAddChild, // (parentId) => void
  onEdit, // (item) => void
  onDelete, // (id) => void
  disableEdit = false,
}) {
  const isParent = type === "parent";
  const isDone = !!item.done;

  const renderRightActions = () => (
    <Pressable onPress={() => onDelete(item.id)} style={styles.swipeDelete}>
      <Text style={styles.swipeDeleteText}>Supprimer</Text>
    </Pressable>
  );

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <View style={[styles.row, isParent ? styles.parentRow : styles.childRow]}>
        {/* Left: marker + text */}
        <View style={styles.left}>
          <Text style={[styles.marker, isParent ? styles.markerParent : styles.markerChild]}>
            {isParent ? "🎯" : "▸"}
          </Text>

          {/* Long press = edit (active only) */}
          <Pressable
            style={styles.textWrap}
            onLongPress={() => {
              if (!disableEdit && mode === "active") onEdit(item);
            }}
            delayLongPress={250}
          >
            <Text
              style={[
                styles.text,
                isDone && styles.doneText,
                isParent && styles.parentText,
              ]}
              numberOfLines={3}
            >
              {item.text}
            </Text>

            {isParent ? (
              <View style={styles.metaRow}>
                <View style={[styles.badge, isDone ? styles.badgeDone : styles.badgeActive]}>
                  <Text
                    style={[
                      styles.badgeText,
                      isDone ? styles.badgeTextDone : styles.badgeTextActive,
                    ]}
                  >
                    {isDone ? "Terminé" : `Avancement ${progressText ?? "0/0"}`}
                  </Text>
                </View>
                {mode === "active" ? (
                  <Text style={styles.hint}>Appui long pour modifier</Text>
                ) : null}
              </View>
            ) : (
              <View style={styles.metaRow}>
                {mode === "active" ? (
                  <Text style={styles.hint}>Appui long pour modifier</Text>
                ) : null}
              </View>
            )}
          </Pressable>
        </View>

        {/* Right actions */}
        {isParent ? (
          <>
            {/* + Sous-objectif uniquement en active */}
            {mode === "active" && (
              <Pressable style={[styles.iconBtn, styles.addChildBtn]} onPress={() => onAddChild(item.id)}>
                <Text style={styles.emoji}>➕</Text>
              </Pressable>
            )}
          </>
        ) : (
          <>
            {mode === "active" ? (
              <Pressable style={[styles.iconBtn, styles.toggleBtn]} onPress={() => onToggleChild(item.id)}>
                <Text style={styles.emoji}>{item.done ? "✅" : "⬜️"}</Text>
              </Pressable>
            ) : (
              <Pressable style={[styles.iconBtn, styles.undoBtn]} onPress={() => onToggleChild(item.id)}>
                <Text style={styles.emoji}>↩️</Text>
              </Pressable>
            )}
          </>
        )}
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.78)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  parentRow: {
    backgroundColor: "rgba(255,255,255,0.88)",
  },
  childRow: {
    marginLeft: 18,
    backgroundColor: "rgba(255,255,255,0.70)",
  },

  left: { flex: 1, flexDirection: "row", alignItems: "flex-start", gap: 10 },
  marker: { marginTop: 2 },
  markerParent: { fontSize: 18 },
  markerChild: { fontSize: 16, opacity: 0.7 },

  textWrap: { flex: 1 },
  text: { fontSize: 16, fontWeight: "650", color: "#111827" },
  parentText: { fontSize: 17, fontWeight: "800" },
  doneText: { textDecorationLine: "line-through", opacity: 0.55 },

  metaRow: { marginTop: 8, gap: 6 },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeActive: {
    backgroundColor: "rgba(59,130,246,0.10)",
    borderColor: "rgba(59,130,246,0.22)",
  },
  badgeDone: {
    backgroundColor: "rgba(34,197,94,0.14)",
    borderColor: "rgba(34,197,94,0.26)",
  },
  badgeText: { fontWeight: "800", fontSize: 12 },
  badgeTextActive: { color: "#1d4ed8" },
  badgeTextDone: { color: "#166534" },

  hint: { fontSize: 12, fontWeight: "700", opacity: 0.55 },

  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    overflow: "hidden",
  },
  emoji: { fontSize: 18, lineHeight: 18 },

  addChildBtn: {
    backgroundColor: "rgba(99,102,241,0.12)",
    borderColor: "rgba(99,102,241,0.25)",
  },
  toggleBtn: {
    backgroundColor: "rgba(34,197,94,0.14)",
    borderColor: "rgba(34,197,94,0.26)",
  },
  undoBtn: {
    backgroundColor: "rgba(245,158,11,0.16)",
    borderColor: "rgba(245,158,11,0.28)",
  },

  swipeDelete: {
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(239,68,68,0.88)",
    borderRadius: 16,
    marginVertical: 6,
    marginRight: 6,
  },
  swipeDeleteText: { color: "white", fontWeight: "900" },
});
