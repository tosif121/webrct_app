import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import JsSIP from 'react-native-jssip';
import {RTCView} from 'react-native-webrtc';
import PermissionsAndroid, { PERMISSIONS } from 'react-native-permissions';

const App = () => {
  const remoteStream = useRef(null);
  const ua = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  
  useEffect(() => {
    const config = {
      uri: 'sip:webrtc_client@webrtc.iotcom.io', // Replace with your details
      password: 'password',
      sockets: [new JsSIP.WebSocketInterface('wss://webrtc.iotcom.io:8089/ws')],
    };

    ua.current = new JsSIP.UA(config);

    ua.current.on('connected', () => {
      console.log('Connected to SIP server');
    });

    ua.current.on('failed', error => {
      console.error('Connection failed:', error);
      Alert.alert('Connection error', error.cause || 'Unknown error');
    });

    ua.current.on('newRTCSession', data => {
      const session = data.session;

      if (session.direction === 'incoming') {
        session.answer();

        session.connection.addEventListener('addstream', event => {
          remoteStream.current.srcObject = event.stream;
        });
      }
    });

    return () => {
      ua.current.stop();
    };
  }, []);

  const makeCall = () => {
    const options = {
      mediaConstraints: {audio: true, video: true},
    };

    const session = ua.current.call(
      'sip:webrtc_client1@webrtc.iotcom.io',
      options,
    );

    session.on('failed', error => {
      console.error('Call failed:', error);
      Alert.alert('Call error', error.cause || 'Unknown error');
    });

    session.connection.addEventListener('addstream', event => {
      remoteStream.current.srcObject = event.stream;
    });
  };


  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasPermission(true);
      } else {
        console.warn('Camera permission denied');
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <View>
      <Text>Your React Native App</Text>
      {!hasPermission && (
        <Button
          title="Request Camera Permission"
          onPress={requestCameraPermission}
        />
      )}
      {hasPermission && <Text>Camera is ready to use!</Text>}

      <RTCView streamURL={remoteStream.current?.toURL()} style={{flex: 1}} />
      <Button title="Make Call" onPress={makeCall} />
    </View>
  );
};

export default App;
