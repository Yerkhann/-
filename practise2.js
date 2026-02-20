import { useState } from 'react';
import { View, Text, Button, Switch, StyleSheet } from 'react-native';

export default function App() {
  const [step, setStep] = useState(1);
  const [checked, setChecked] = useState(false);

  /* -------- ОКНО 1 -------- */
  if (step === 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Терезе 1</Text>
        <Text>Нажми OK</Text>
        <Button title="OK" onPress={() => setStep(2)} />
      </View>
    );
  }

  /* -------- ОКНО 2 -------- */
  if (step === 2) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Терезе 2</Text>
        <Text>Поставь галочку</Text>

        <Switch value={checked} onValueChange={setChecked} />

        <Button title="Далее" onPress={() => setStep(3)} />
      </View>
    );
  }

  /* -------- ОКНО 3 -------- */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Терезе 3</Text>
      <Text>
        Галочка: {checked ? 'Поставлена ✅' : 'Не поставлена ❌'}
      </Text>

      <Button title="Сначала" onPress={() => setStep(1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
