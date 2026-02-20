import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const snacks = [
    { name: "Choco Bar", description: "Chocolate bar", price: 150 },
    { name: "Fruit Snack", description: "Healthy fruit snack", price: 120 },
    { name: "Nut Mix", description: "Mixed nuts", price: 200 },
    { name: "Popcorn", description: "Salty popcorn", price: 100 }
  ];

  const searchSnack = () => {
    const filtered = snacks.filter(snack =>
      snack.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Snack Expo - Электрондық анықтама</Text>

      <TextInput
        style={styles.input}
        placeholder="Тауар атын енгізіңіз"
        value={query}
        onChangeText={setQuery}
      />

      <Button title="Табу" onPress={searchSnack} />

      <FlatList
        style={{ marginTop: 20 }}
        data={results.length > 0 ? results : [{ name: "Осындай тауар табылған жоқ", description: "", price: "" }]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.snackItem}>
            {item.name}{item.description ? : ${item.description} (Бағасы: ${item.price} тг) : ""}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 10 },
  snackItem: { paddingVertical: 5, fontSize: 16 }
});
