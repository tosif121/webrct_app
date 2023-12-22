import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const Dail = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../images/logo.png')} />
      <TextInput
        placeholder="Dial"
        style={styles.input}
        placeholderTextColor="#565869"
      />

      <TouchableOpacity
        // onPress={() => {
        //   handleLogin('');
        // }}
        style={styles.dialButton}>
        <Text style={styles.dialButtonText}>Dial</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
  },
  input: {
    height: 50,
    borderColor: '#333',
    borderWidth: 1,
    width: 300,
    marginVertical: 10,
    paddingHorizontal: 10,
    color: '#333',
    borderRadius: 10,
  },
  dialButton: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 10,
    elevation: 15,
  },
  dialButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    width: 100,
  },
});

export default Dail;
