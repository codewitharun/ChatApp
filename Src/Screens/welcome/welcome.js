import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import React, {useState, useEffect} from 'react';
async function Logout() {
  try {
    await auth()
      .signOut()
      .then(() => {
        console.log('Logged out.');
      });
  } catch (error) {
    console.log('No user Logged In ');
  }
}



const Welcome = ({navigation}) => {
  useEffect(() => {
  

  
  }, [])
  return (
    <View style={{height: '100%', width: '100%'}}>
      <View
        style={{
          justifyContent: 'space-around',
          alignSelf: 'flex-start',
          flexDirection: 'row',

          height: '70%',
          width: '100%',
        }}>
        <Text
          style={{
            fontSize: 390,
            color: '#0D5417',
            left: 40,
            fontFamily: 'Comfortaa-Bold',
          }}>
          A
        </Text>
        <Text
          style={{
            fontSize: 390,
            color: '#FEA502',
            right: 40,
            fontFamily: 'Comfortaa-Bold',
          }}>
          S
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: '#0D5417',
            fontFamily: 'Comfortaa-Bold',
            alignSelf: 'center',
            fontSize: 25,
            // transform: [({rotateX: '45deg'}, {rotateZ: '0.785398rad'})],
          }}>
          Welcome To the Chat App!
        </Text>
      </View>

      <View>
        <ActivityIndicator size={40} color={'red'} />
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => Logout()}
          style={{
            backgroundColor: 'black',
            height: '26%',
            width: '70%',
            borderRadius: 17,
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
