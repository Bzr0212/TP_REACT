import React from "react";
import { Modal, View, Text, Pressable, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import TodoItem from "./TodoItem";

export default function DoneModal({ visible, onClose, objectifsTermines, enfants, onToggle, onDelete, styles }) {
  return (
    <Modal visible={visible} animationType="slide">
      <KeyboardAvoidingView style={styles.modal} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Objectifs terminés</Text>
          <Pressable onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>Fermer</Text>
          </Pressable>
        </View> 

        {/* on close est gerer par le parent todolist */}

        {objectifsTermines.length === 0 ? (
          <Text style={styles.modalEmpty}>Aucun objectif accompli.</Text> 
        // si aucun est temriné on affiche le message sinon on affiche la liste
        
        ) : (
          <FlatList
            data={objectifsTermines}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: parent }) => {
              const kids = enfants(parent.id);
              const progress = `${kids.length}/${kids.length}`;

              return (
                <View style={styles.block}>
                  <TodoItem
                    item={parent}
                    type="parent"
                    mode="done"
                    progress={progress}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={() => {}}
                    onAddChild={() => {}}
                    desactiveEdit
                  />

                  <View style={styles.children}>
                    {kids.map((child) => (
                      <TodoItem
                        key={child.id}
                        item={child}
                        type="child"
                        mode="done"
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onEdit={() => {}}
                        onAddChild={() => {}}
                        desactiveEdit
                      />
                    ))} 
                  </View>
                </View>
              );
            }}
          />
        )} 
      </KeyboardAvoidingView>
    </Modal>
  );
} 
// parent terminé signifie que tout les enfants sont finis donc lavancement = total
// le mode "done" indique a todoItem que nous sommes dans la vue terminé (pas de + et pas d'edition)
