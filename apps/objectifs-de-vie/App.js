import React, { useState } from "react";
import {Text,StyleSheet,ImageBackground,View,Pressable, } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import des geste pour la function de supression d'objectif
import TodoList from "./components/TodoList";
import GuideModal from "./components/GuideModal";

export default function App() {
  const [guideVisible, setGuideVisible] = useState(false); // c'est que le guide pzs les objectif

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground
        source={require("./assets/background.jpg")} //icone de l'app
        style={styles.container}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Objectifs de vie</Text>

            <Pressable
              onPress={() => setGuideVisible(true)}
              style={({ pressed }) => [
                styles.guideBtn,
                pressed && { opacity: 0.7 },
              ]} // quand le bouton "guide" est appuyer -> baisse de l'opacité
            >
              <Text style={styles.guideBtnText}>Guide</Text>
            </Pressable>
          </View>

          <Text style={styles.subtitle}>
            Les objectifs parents se valident automatiquement quand tous les sous-objectifs
            sont terminés.
          </Text>

          <TodoList />

          <GuideModal
            visible={guideVisible}
            onClose={() => setGuideVisible(false)}
          />
        </View>
      </ImageBackground>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.33)",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  guideBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.75)",
  },
  guideBtnText: {
    fontSize: 13,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.8,
    marginTop: 8,
    marginBottom: 12,
  },
});
