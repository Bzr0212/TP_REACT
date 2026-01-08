import React, { useState } from "react";
import { View, Text, TextInput, Pressable, FlatList } from "react-native";
import useTaches from "../hooks/useTaches";
import ParentBlock from "./ParentBlock";
import DoneModal from "./DoneModal";
import EditModal from "./EditModal";
import { styles } from "../styles/todoStyles";

export default function TodoList() {
  const { objectifsActifs, objectifsTermines, enfants, ajouterObjectif, ajouterSousObjectif, supprimer, modifier, basculerTermine } = useTaches();

  const [texte, setTexte] = useState(""); 
  const [afficherTermines, setAfficherTermines] = useState(false);

  const [editVisible, setEditVisible] = useState(false); //affiche la modale
  const [editId, setEditId] = useState(null); //id de lelement qu'on modifie
  const [editTexte, setEditTexte] = useState(""); // texte en cours d'edition dans la modale

  const [draftParentId, setDraftParentId] = useState(null);
  const [texteEnfant, setTexteEnfant] = useState("");

  const ouvrirEdit = item => {
    setEditId(item.id);
    setEditTexte(item.texte);
    setEditVisible(true);
  }; // ouvre la modale d'edition stock l'id et le texte

  const validerEdit = () => {
    if (editId == null) return;
    modifier(editId, editTexte);
    setEditVisible(false);
  }; // vois si "editID" est null apelle la function modifier et ferme la modale

  const demarrerAjoutEnfant = parentId => {
    setDraftParentId(parentId);
    setTexteEnfant("");
  }; //Active la modale "ajouter un enfant" pour le parent

  const confirmerAjoutEnfant = () => {
    if (draftParentId == null) return;
    ajouterSousObjectif(draftParentId, texteEnfant);
    setTexteEnfant("");
    setDraftParentId(null);
  }; //appel la fonction 'ajouterSousObjectif' et reset le draft

  const annulerAjoutEnfant = () => {
    setTexteEnfant("");
    setDraftParentId(null);
  }; //reset simple

  const ajouter = () => {
    ajouterObjectif(texte);
    setTexte("");
  }; //envoie au hook et vide l'input

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Objectifs</Text>
        <Pressable onPress={() => setAfficherTermines(true)} style={styles.doneTag}>
          <Text style={styles.doneTagText}>Terminés ({objectifsTermines.length})</Text>
        </Pressable>
      </View>

      <View style={styles.inputRow}>
        <TextInput style={styles.input} value={texte} onChangeText={setTexte} placeholder="Ajouter un objectif..." />
        <Pressable onPress={ajouter} style={styles.addBtn}><Text style={styles.addBtnText}>+</Text></Pressable>
      </View>

      {objectifsActifs.length === 0 ? (
        <View style={styles.emptyBox}><Text style={styles.emptyTitle}>Aucun objectif en cours</Text></View>
      ) : (
        <FlatList
          data={objectifsActifs}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ParentBlock
              parent={item}
              enfants={enfants}
              draftParentId={draftParentId}
              texteEnfant={texteEnfant}
              setTexteEnfant={setTexteEnfant}
              demarrerAjoutEnfant={demarrerAjoutEnfant}
              confirmerAjoutEnfant={confirmerAjoutEnfant}
              annulerAjoutEnfant={annulerAjoutEnfant}
              onToggle={basculerTermine}
              onEdit={ouvrirEdit}
              onDelete={supprimer}
              styles={styles}
            />
          )}
        />
      )}

      <DoneModal
        visible={afficherTermines}
        onClose={() => setAfficherTermines(false)}
        objectifsTermines={objectifsTermines}
        enfants={enfants}
        onToggle={basculerTermine}
        onDelete={supprimer}
        styles={styles}
      /> {/*affiche les parents terminé et leurs enfante et permet de supprimer/toggle depuis la modale */}

      <EditModal
        visible={editVisible}
        texte={editTexte}
        setTexte={setEditTexte}
        onCancel={() => setEditVisible(false)}
        onSave={validerEdit}
        styles={styles}
      />{/*modale pour modifier une tache sans etre obstruer par le clavier*/}
    </View>
  );
}
