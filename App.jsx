import React, {useEffect, useRef} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import JsSIP from 'jssip';
import {RTCView} from 'react-native-webrtc';

const App = () => {
  const remoteStream = useRef();
  const ua = useRef(null);

  useEffect(() => {
    const configuration = {
      uri: 'sip:webrtc_client@webrtc.iotcom.io',
      password: 'password',
      sockets: [new JsSIP.WebSocketInterface('wss://webrtc.iotcom.io:8089/ws')],
    };

    ua.current = new JsSIP.UA(configuration);

    ua.current.start();

    ua.current.on('connected', e => {
      console.log('Connected', e);
    });

    ua.current.on('newMessage', e => {
      console.log('New Message', e);
    });

    ua.current.on('newRTCSession', data => {
      const session = data.session;

      if (session.direction === 'incoming') {
        // Answer the incoming call
        session.answer();

        // Attach remote stream when it becomes available
        session.connection.addEventListener('addstream', event => {
          remoteStream.current.srcObject = event.stream;
        });
      }
    });

    ua.current.on('failed', e => {
      console.error('Call failed:', e);
      Alert.alert('Call failed', e.cause || 'Unknown error');
    });

    // Handle other events as needed

    return () => {
      // Cleanup or disconnect when the component unmounts
      ua.current.stop();
    };
  }, []);

  const makeCall = () => {
    // Make an outgoing call
    const options = {
      mediaConstraints: {audio: true, video: true},
    };

    const session = ua.current.call('sip:600@webrtc.iotcom.io', options);

    session.on('failed', e => {
      console.error('Call failed:', e);
      Alert.alert('Call failed', e.cause || 'Unknown error');
    });

    // Attach remote stream when it becomes available
    session.connection.addEventListener('addstream', event => {
      remoteStream.current.srcObject = event.stream;
    });
  };

  return (
    <View>
      <Text>Your React Native App</Text>
      <RTCView
        streamURL={remoteStream.current ? remoteStream.current.toURL() : null}
        style={{flex: 1}}
      />
      <Button title="Make Call" onPress={makeCall} />
    </View>
  );
};

export default App;
