import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';

export default function App() {
  const [equation, setEquation] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const solveEquation = () => {
    try {
      setError('');
      // Бос орындарды алып тастап, кіші әріпке айналдыру
      let cleanEq = equation.replace(/\s+/g, '').toLowerCase();
      
      if (!cleanEq.includes('=') || !cleanEq.includes('x')) {
        setError('Қате: "x" және "=" белгілері болуы керек');
        return;
      }

      // Теңдеуді сол және оң жаққа бөлу
      const [left, right] = cleanEq.split('=');
      const rightNum = parseFloat(right);

      let xValue;

      // Логика: x + a = b, x - a = b, a * x = b, x / a = b
      if (left.includes('+')) {
        const parts = left.split('+');
        const num = parseFloat(parts.find(p => p !== 'x'));
        xValue = rightNum - num;
      } else if (left.includes('-')) {
        const parts = left.split('-');
        if (parts[0] === 'x') {
          xValue = rightNum + parseFloat(parts[1]);
        } else {
          xValue = parseFloat(parts[0]) - rightNum;
        }
      } else if (left.includes('*')) {
        const parts = left.split('*');
        const num = parseFloat(parts.find(p => p !== 'x'));
        xValue = rightNum / num;
      } else if (left.includes('/')) {
        const parts = left.split('/');
        if (parts[0] === 'x') {
          xValue = rightNum * parseFloat(parts[1]);
        } else {
          xValue = parseFloat(parts[0]) / rightNum;
        }
      } else {
        // Егер тек "2x = 10" түрінде болса
        const num = parseFloat(left.replace('x', '')) || 1;
        xValue = rightNum / num;
      }

      setResult(xValue);
      Keyboard.dismiss();
    } catch (e) {
      setError('Теңдеуді дұрыс форматта жазыңыз (мысалы: x + 5 = 10)');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Әмбебап теңдеу шешкіш</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Мысалы: x + 12 = 30"
          value={equation}
          onChangeText={setEquation}
        />

        <TouchableOpacity style={styles.button} onPress={solveEquation}>
          <Text style={styles.buttonText}>Шешуін табу</Text>
        </TouchableOpacity>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {result !== null && !error && (
          <View style={styles.resultBox}>
            <Text style={styles.resultLabel}>Нәтиже:</Text>
            <Text style={styles.resultText}>x = {result}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff1',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#263238',
  },
  input: {
    borderWidth: 2,
    borderColor: '#cfd8dc',
    borderRadius: 12,
    padding: 15,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultBox: {
    marginTop: 30,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
  },
  resultLabel: {
    fontSize: 16,
    color: '#757575',
  },
  resultText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  errorText: {
    color: '#d32f2f',
    marginTop: 15,
    textAlign: 'center',
  },
});
