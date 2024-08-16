import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: '',
      weight: ''
    };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ marginTop: -200, marginBottom: 50, fontWeight: 'bold', fontSize: 20 }}>
          Linear-regression / Height-weight
        </Text>
        <TextInput
          style={{ borderBottomColor: 'gray', borderBottomWidth: 1, fontSize: 20 }}
          keyboardType={'numeric'}
          placeholder={'Enter your height'}
          value={String(this.state.height)}
          onChangeText={(text) => this.setState({ height: text })}
        />
        <View style={{ margin: 20 }}>
          <Button title='SUBMIT' onPress={() => this.onSubmit()} />
        </View>
        <TextInput
          style={{ borderBottomColor: 'gray', borderBottomWidth: 1, fontSize: 20 }}
          placeholder={'Predict your weight'}
          value={String(this.state.weight)}
          editable={false}
        />
      </View>
    );
  }

  onSubmit() {
    const URL = 'http://TiennguyenTran.pythonanywhere.com/linear-regression/height-weight';
    const input = { 'height': [this.state.height] };

    axios.post(URL, input)
      .then((response) => {
        const result = response.data;
        if (result) {
          this.setState({ weight: result });
        } else {
          alert('SORRY BABY!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}

export default App;
