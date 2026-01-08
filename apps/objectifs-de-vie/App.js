import React from "react";
import { Text, StyleSheet, ImageBackground, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground
        source={require("./assets/background.jpg")}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Objectifs de vie</Text>
          <TodoList />
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
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
});
