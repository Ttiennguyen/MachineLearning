import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView, Alert } from 'react-native';

export default function App() {
  const [area, setArea] = useState('15140');
  const [perimeter, setPerimeter] = useState('502.553009');
  const [majorAxisLength, setMajorAxisLength] = useState('213.895615');
  const [minorAxisLength, setMinorAxisLength] = useState('90.897377');
  const [eccentricity, setEccentricity] = useState('0.905212');
  const [convexArea, setConvexArea] = useState('15491');
  const [extent, setExtent] = useState('0.758213');
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    const data = {
      "Area": [parseFloat(area)],
      "Perimeter": [parseFloat(perimeter)],
      "Major_Axis_Length": [parseFloat(majorAxisLength)],
      "Minor_Axis_Length": [parseFloat(minorAxisLength)],
      "Eccentricity": [parseFloat(eccentricity)],
      "Convex_Area": [parseFloat(convexArea)],
      "Extent": [parseFloat(extent)]
    };

    fetch('http://TiennguyenTran.pythonanywhere.com/Vector/Rice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => setResult(result))
    .catch(error => {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please check the console for details.');
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Rice Data API Test</Text>

      <Text style={styles.label}>Area:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={area}
        onChangeText={setArea}
      />

      <Text style={styles.label}>Perimeter:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={perimeter}
        onChangeText={setPerimeter}
      />

      <Text style={styles.label}>Major Axis Length:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={majorAxisLength}
        onChangeText={setMajorAxisLength}
      />

      <Text style={styles.label}>Minor Axis Length:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={minorAxisLength}
        onChangeText={setMinorAxisLength}
      />

      <Text style={styles.label}>Eccentricity:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={eccentricity}
        onChangeText={setEccentricity}
      />

      <Text style={styles.label}>Convex Area:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={convexArea}
        onChangeText={setConvexArea}
      />

      <Text style={styles.label}>Extent:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={extent}
        onChangeText={setExtent}
      />

      <Button title="Submit" onPress={handleSubmit} />

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Result:</Text>
          <Text style={styles.resultText}>{JSON.stringify(result, null, 2)}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  input: {
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#f8f9fa'
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  resultText: {
    fontSize: 14,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  }
});
