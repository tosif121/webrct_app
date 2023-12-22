import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

const Home = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'webrtc_client' && password === 'password') {
      navigation.navigate('Dail');
    } else {
      setError('Please Enter Username and Password');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../images/logo.png')} />
      <TextInput
        placeholder="Enter Username"
        value={username}
        onChangeText={text => setUsername(text)}
        placeholderTextColor="#565869"
        style={styles.input}
      />
      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        placeholderTextColor="#565869"
        style={styles.input}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        onPress={() => {
          handleLogin('');
        }}
        style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 10,
    elevation: 15,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    width: 100,
  },
});

export default Home;
