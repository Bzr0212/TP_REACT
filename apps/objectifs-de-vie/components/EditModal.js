import React from "react";
import { Modal, View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
//KeyboardAvoidingView permet que le clavier couvre la modale quand on ecrit
//PLatform permet de faire de switch de comportement qu'on soit sur iphone ou androit



export default function EditModal({ visible, texte, setTexte, onCancel, onSave, styles }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView style={styles.editBackdrop} behavior={Platform.OS === "ios" ? "padding" : undefined}> 
        {/*Pousse le contenu de la page en haut quand le clavier s'active */}
        <View style={styles.editCard}>
          <Text style={styles.editTitle}>Modifier</Text>
          <TextInput value={texte} onChangeText={setTexte} style={styles.editInput} autoFocus />
          <View style={styles.editActions}>
            <Pressable onPress={onCancel} style={styles.editCancel}><Text style={styles.editCancelText}>Annuler</Text></Pressable>
            <Pressable onPress={onSave} style={styles.editSave}><Text style={styles.editSaveText}>Enregistrer</Text></Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
