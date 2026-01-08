import React from "react";
import { Modal, View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

export default function GuideModal({ visible, onClose }) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Guide d’utilisation</Text>

            <Pressable onPress={onClose} style={({ pressed }) => [styles.closeBtn, pressed && { opacity: 0.7 }]}>
              <Text style={styles.closeText}>Fermer</Text>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            <Section
              number="1"
              title="Ajouter un objectif"
              items={[
                "Écris ton objectif dans le champ de saisie.",
                "Appuie sur Add (ou le bouton +) pour l’ajouter à la liste.",
                "L’objectif apparaît dans la liste principale.",
              ]}
            />

            <Section
              number="2"
              title="Modifier un objectif"
              items={[
                "Appuie sur l’objectif longuement.",
                "Change le texte, puis valide.",
                "Le texte est mis à jour dans la liste.",
              ]}
            />

            <Section
              number="3"
              title="Terminer un sous-objectif"
              items={[
                "Coche la case d’un sous-objectif pour le marquer terminé.",
                "Tu peux le décocher si tu t’es trompé.",
              ]}
            />

            <Section
              number="4"
              title="Règle Parent / Enfants"
              items={[
                "Un objectif parent ne se coche pas manuellement.",
                "Il devient terminé automatiquement quand tous ses sous-objectifs sont cochés.",
                "Si tu décoches un sous-objectif, le parent redevient incomplet.",
              ]}
            />

            <Section
              number="5"
              title="Voir les objectifs terminés"
              items={[
                "Ouvre la section / modale Terminés.",
                "Tu y retrouves les objectifs finalisés (et leurs sous-objectifs).",
              ]}
            />

            <Section
              number="6"
              title="Supprimer un objectif"
              items={[
                "Swipe à droite.",
                "L’objectif est retiré de la liste.",
              ]}
            />

            <View style={styles.footerNote}>
              <Text style={styles.noteTitle}>Objectif de l’exercice</Text>
              <Text style={styles.noteText}>
                L’application applique une logique hiérarchique : les parents dépendent de l’état
                des enfants. La validation d’un parent est calculée automatiquement à partir des sous-objectifs.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function Section({ number, title, items }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {number}. {title}
      </Text>
      {items.map((t, i) => (
        <Text key={i} style={styles.item}>
          • {t}
        </Text>
      ))}
    </View> //function section qui affiche les titres, et les items
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  card: {
    maxHeight: "85%",
    backgroundColor: "white",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingBottom: 14,
  },
  header: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.08)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
  },
  closeBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.06)",
  },
  closeText: {
    fontSize: 13,
    fontWeight: "700",
  },
  content: {
    padding: 14,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 14,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 8,
  },
  item: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  footerNote: {
    marginTop: 6,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  noteTitle: {
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 6,
  },
  noteText: {
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.85,
  },
});
