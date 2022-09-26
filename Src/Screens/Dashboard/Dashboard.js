import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import ImagePicker from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';

import {COLOR} from '../../Components/Colors';

import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const {height, width} = Dimensions.get('screen');

const Dashboard = ({navigation, route}) => {
  const [user, setUser] = useState('');

  // console.log(authh.displayName);
  useEffect(() => {
    arun();
    displayData();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        JSON.stringify(remoteMessage.notification.title),
        JSON.stringify(remoteMessage.notification.body),
      );
    });                   

    return unsubscribe;
  }, []);

  const authh = firebase.auth().currentUser;
  async function arun() {
    if (authh.uid) {
      //   firebase.auth().currentUser;
      const res = await firestore()
        .collection('Users')
        .doc(authh.uid)
        .get()
        .then(documentSnapshot => {
          let userDetails = {};

          userDetails = documentSnapshot.data();

          userDetails['uid'] = documentSnapshot.id;
          // console.log(userDetails);

          // setUser(userDetails);
          console.log(`User data is jg===> `, user);
        });
    }
  }
  // const jData = JSON.stringify(user);
  async function displayData() {
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);
      setUser(parsed);
    } catch (error) {
      alert(error);
    }
  }
  async function removeData() {
    try {
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.log(error);
    }
  }

  async function Logout() {
    try {
      await auth()
        .signOut()

        .then(() => {
          console.log('Logged out.');
        });
      navigation.reset({
        index: 0,
        routes: [{name: 'Splash'}],
      });
      // navigation.navigate('Splash');
      removeData();
    } catch (error) {
      console.log('No user Logged In ');
    }
  }

  return (
    <View style={{height: height * 1, width: width * 1}}>
      {user == '' ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <View>
          <View
            style={{
              backgroundColor: COLOR.BACKGROUND_COLOR,
              height: height * 1,
              width: width * 1,
            }}>
            <View style={{height: height * 0.2, justifyContent: 'center'}}>
              <Text
                style={{
                  fontFamily: 'Comfortaa-Bold',
                  fontSize: 50,
                  opacity: 0.4,
                  color: COLOR.WTEXT,
                }}>
                Dashboard
              </Text>
            </View>
            <View
              style={{
                height: height * 0.13,
                justifyContent: 'center',
                width: width * 0.95,
                alignSelf: 'center',
              }}>
              <Text style={{color: COLOR.WTEXT}}>{user?.userPhone}</Text>
              <Text style={{color: COLOR.WTEXT}}>{user?.displayName}</Text>
              <Text style={{color: COLOR.WTEXT}}>{user?.email}</Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={() => Logout()}>
                <View
                  style={{
                    height: height * 0.06,
                    width: width * 0.9,
                    backgroundColor: COLOR.BUTTON,
                    borderRadius: 7,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 15,
                      color: COLOR.WTEXT,
                    }}>
                    Log out
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
