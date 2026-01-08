import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: { flex: 1 },

  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
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
  input: { flex: 1, borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 10, backgroundColor: "#fff" },
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

  hint: { marginLeft: 8, fontSize: 12, fontWeight: "700", opacity: 0.65 },

  childComposer: { flexDirection: "row", gap: 8, alignItems: "center", marginLeft: 18 },
  childInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
  },

  smallBtn: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: "#ddd", backgroundColor: "#f3f3f3" },
  smallBtnPrimary: { backgroundColor: "rgba(99,102,241,0.14)", borderColor: "rgba(99,102,241,0.28)" },
  smallBtnGhost: { backgroundColor: "rgba(100,116,139,0.10)", borderColor: "rgba(100,116,139,0.22)" },
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
  emptyTitle: { fontSize: 16, fontWeight: "900", color: "#111827", textAlign: "center" },

  modal: { flex: 1, paddingTop: 60, paddingHorizontal: 16, backgroundColor: "#fff" },
  modalHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  modalTitle: { fontSize: 22, fontWeight: "900" },
  modalEmpty: { fontSize: 14, fontWeight: "700", opacity: 0.7 },

  closeBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: "#ddd", backgroundColor: "#f3f3f3" },
  closeText: { fontWeight: "900" },

  editBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)", justifyContent: "center", padding: 16 },
  editCard: { borderRadius: 16, padding: 16, backgroundColor: "#fff", borderWidth: 1, borderColor: "rgba(0,0,0,0.08)" },
  editTitle: { fontSize: 16, fontWeight: "900", marginBottom: 10 },
  editInput: { borderWidth: 1, borderColor: "#ddd", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: "#fff" },
  editActions: { flexDirection: "row", justifyContent: "flex-end", gap: 10, marginTop: 12 },
  editCancel: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: "#ddd", backgroundColor: "#f3f3f3" },
  editCancelText: { fontWeight: "900" },
  editSave: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, backgroundColor: "rgba(59,130,246,0.18)", borderWidth: 1, borderColor: "rgba(59,130,246,0.25)" },
  editSaveText: { fontWeight: "900", color: "#1d4ed8" },
});
