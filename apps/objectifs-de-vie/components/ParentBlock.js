import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import TodoItem from "./TodoItem";

export default function ParentBlock({ parent, enfants, draftParentId, texteEnfant, setTexteEnfant, demarrerAjoutEnfant, confirmerAjoutEnfant, annulerAjoutEnfant, onToggle, onEdit, onDelete, styles }) {
  const kids = enfants(parent.id); //liste des sous objectif du parent
  const done = kids.filter(k => k.termine).length; // nombre de sous objectif terminer
  const progress = `${done}/${kids.length}`; //affichage fais/total

  return (
    <View style={styles.block}>
      <TodoItem
        item={parent}
        type="parent"
        progress={progress}
        aDesEnfants={kids.length > 0} //permet de decidé si le parent doit etre verouillé
        onAddChild={demarrerAjoutEnfant} // declanche l'affichage du champs pour ajouter un enfant 
        onEdit={onEdit}
        onDelete={onDelete}
        onToggle={onToggle}
      />

      {draftParentId === parent.id ? (
        <View style={styles.childComposer}>
          <TextInput style={styles.childInput} value={texteEnfant} onChangeText={setTexteEnfant} placeholder="Ajouter un sous-objectif..." autoFocus />
          <Pressable onPress={confirmerAjoutEnfant} style={[styles.smallBtn, styles.smallBtnPrimary]}><Text style={styles.smallBtnText}>Ajouter</Text></Pressable>
          <Pressable onPress={annulerAjoutEnfant} style={[styles.smallBtn, styles.smallBtnGhost]}><Text style={styles.smallBtnTextGhost}>Annuler</Text></Pressable>
        </View>
      ) : null}

      {kids.length === 0 ? <Text style={styles.hint}>Aucun sous-objectif</Text> : (
        <View style={styles.children}>
          {kids.map(child => (
            <TodoItem key={child.id} item={child} type="child" onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} onAddChild={() => {}} />
          ))}
        </View> //si y a aucun enfant on affiche aucun sous objectif sinon on met la liste des enfants
      )}
    </View>
  );
}
