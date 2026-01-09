import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Swipeable } from "react-native-gesture-handler"; // permet le geste swipe pour l'action supprimer

export default function TodoItem({ item, type, mode = "actif", progress, aDesEnfants = false, onToggle, onAddChild, onEdit, onDelete, desactiveEdit = false }) {
  //desactiveEdit desactive l'edit dans la modale terminé
  const estParent = type === "parent";
  const termine = !!item.termine; //force en bouleen
  const peutEdit = !desactiveEdit && mode === "actif"; //autorise l'edition seulement si on est en mode actif

  const parentNonCliquable = estParent && mode === "actif" && aDesEnfants; //si un parent estd actif avec des enfants on le rend non cliquable
  const afficherBarre = parentNonCliquable && !termine; // sert a dessiner la bar dans la checkbox tant qu'il n'est pas accompli

  const Check = () => (
    <Pressable
      onPress={() => (!parentNonCliquable || !aDesEnfants) && onToggle(item.id)}
      style={[styles.check, termine && styles.checkOn, parentNonCliquable && styles.checkDisabled]}
      hitSlop={8}
    >
      {termine ? <Text style={styles.checkMark}>✓</Text> : null}
      {afficherBarre ? <View style={styles.slash} /> : null}
    </Pressable>
  ); //si le parent est verouillé on bloque le toggle sinon on apelle la function onToggle, et ça met lemoji 

    // renderRightActions affiche le bouton supprimer quand on swipe
    return (
      <Swipeable
        renderRightActions={() => (
          <Pressable onPress={() => onDelete(item.id)} style={styles.swipeDelete}>
            <Text style={styles.swipeDeleteText}>Supprimer</Text>
          </Pressable>
        )}
        overshootRight={false}
      >

      <View style={[styles.row, estParent ? styles.parentRow : styles.childRow]}>
        <View style={styles.left}>
          <Pressable onLongPress={() => peutEdit && onEdit(item)} delayLongPress={220}> 
            <Text style={[styles.text, estParent && styles.parentText, termine && styles.doneText]} numberOfLines={2}>
              {item.texte} 
            </Text> 
            {/*onLongPress ouvre lediteur 
             delayLongPress pour rendre la dection rapide mais pas instantané et eviter les erreurs ou les missclicks*/ }

            {estParent ? ( 
              <View style={styles.metaRow}>
                <View style={[styles.badge, termine ? styles.badgeDone : styles.badgeActive]}>
                  <Text style={[styles.badgeText, termine ? styles.badgeTextDone : styles.badgeTextActive]}>
                    {termine ? "Terminé" : `Avancement ${progress ?? "0/0"}`}
                  </Text>
                </View> 
                {/* si terminé on met le badge terminé sinon on affiche l'avancement
                */}

                {afficherBarre ? <Text style={styles.lockText}>À valider via les sous-objectifs</Text> : null}
              </View>
            ) : null}
          </Pressable>
        </View>

        <View style={styles.right}>
          <Check />
          {estParent && mode === "actif" ? (
            <Pressable style={styles.addBtn} onPress={() => onAddChild(item.id)} hitSlop={8}>
              <Text style={styles.addText}>+</Text>
            </Pressable>
          ) : null}
        </View> 
      </View>
    </Swipeable>
  ); 
}
// Montre le bouton + que si c'est un parent et qu'il est en mode actif pour eviter d'ajouter un enfant a un enfant ou dans la modale des objectif terminé

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12, paddingVertical: 14, paddingHorizontal: 14, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.78)", borderWidth: 1, borderColor: "rgba(0,0,0,0.08)" },
  parentRow: { backgroundColor: "rgba(255,255,255,0.88)" },
  childRow: { marginLeft: 18, backgroundColor: "rgba(255,255,255,0.72)" },

  left: { flex: 1 },
  right: { flexDirection: "row", alignItems: "center", gap: 10 },

  text: { fontSize: 16, fontWeight: "600", color: "#111827" },
  parentText: { fontSize: 17, fontWeight: "800" },
  doneText: { textDecorationLine: "line-through", opacity: 0.55 },

  metaRow: { marginTop: 8, gap: 6 },

  badge: { alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, borderWidth: 1 },
  badgeActive: { backgroundColor: "rgba(59,130,246,0.10)", borderColor: "rgba(59,130,246,0.22)" },
  badgeDone: { backgroundColor: "rgba(34,197,94,0.14)", borderColor: "rgba(34,197,94,0.26)" },
  badgeText: { fontWeight: "800", fontSize: 12 },
  badgeTextActive: { color: "#1d4ed8" },
  badgeTextDone: { color: "#166534" },

  lockText: { fontSize: 12, fontWeight: "700", opacity: 0.55 },

  check: { width: 32, height: 32, borderRadius: 999, borderWidth: 2, borderColor: "rgba(17,24,39,0.22)", backgroundColor: "rgba(255,255,255,0.90)", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  checkOn: { backgroundColor: "#22c55e", borderColor: "#22c55e" },
  checkDisabled: { opacity: 0.45 },
  checkMark: { color: "white", fontSize: 18, fontWeight: "900", lineHeight: 18 },

  slash: { position: "absolute", width: 44, height: 2, backgroundColor: "rgba(17,24,39,0.35)", transform: [{ rotate: "-45deg" }] },

  addBtn: { width: 32, height: 32, borderRadius: 999, borderWidth: 2, borderColor: "rgba(99,102,241,0.25)", backgroundColor: "rgba(99,102,241,0.10)", alignItems: "center", justifyContent: "center" },
  addText: { fontSize: 18, fontWeight: "900", color: "#3730a3", lineHeight: 18 },

  swipeDelete: { width: 110, backgroundColor: "#ef4444", justifyContent: "center", alignItems: "center", borderRadius: 16, marginVertical: 6, marginRight: 6 },
  swipeDeleteText: { color: "white", fontWeight: "800" },
});
