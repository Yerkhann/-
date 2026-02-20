import { StyleSheet, Text, View, TextInput, Button, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { Card } from 'react-native-paper';

export default function App() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [sum, setSum] = useState(null);

  const calculateSum = () => {
    const result = Number(a) + Number(b) + Number(c);
    setSum(result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Екі санның қосындысы</Text>

      <Card style={[styles.card, isLandscape && styles.cardLandscape]}>
        <View style={[styles.inputsContainer, isLandscape && styles.inputsLandscape]}>
          <TextInput
            style={[styles.input, isLandscape && styles.inputLandscape]}
            placeholder="Бірінші сан"
            keyboardType="numeric"
            value={a}
            onChangeText={setA}
          />

          <TextInput
            style={[styles.input, isLandscape && styles.inputLandscape]}
            placeholder="Екінші сан"
            keyboardType="numeric"
            value={b}
            onChangeText={setB}
          />
          <TextInput
            style={[styles.input, isLandscape && styles.inputLandscape]}
            placeholder="Үшінші сан"
            keyboardType="numeric"
            value={c}
            onChangeText={setC}
          />
        </View>

        <Button title="Қосу" onPress={calculateSum} />

        {sum !== null && (
          <Text style={styles.result}>Нәтиже: {sum}</Text>
        )}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 16,
  },
  paragraph: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    padding: 16,
  },
  cardLandscape: {
    alignSelf: 'center',
    width: '80%',
  },
  inputsContainer: {
    marginBottom: 10,
  },
  inputsLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  inputLandscape: {
    width: '48%',
    marginBottom: 0,
  },
  result: {
    marginTop: 12,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
