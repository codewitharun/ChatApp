import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StatusBar,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
import React, {useState, useEffect} from 'react';
import {COLOR} from '../../Components/Colors';
import {TabRouter} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
const {height, width} = Dimensions.get('screen');

const Profile = ({navigation}) => {
  // const [ftoken, setFtoken] = useState(token);
  const [name, setName] = useState('');
  const [uemail, setUemail] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState('');
  const [fuser, setFuser] = useState(null);
  const [fcmtoken, setFCMtoken] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      // changeColor('green');

      console.log('onrefress done');
      setRefreshing(false);
    }, 2000);
  };
  async function displayData() {
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);

      setFuser(parsed);
    } catch (error) {
      alert(error);
    }
  }
  const update = {
    displayName: user.displayName == null ? name : user.displayName,
    fcmToken: fcmtoken,
    userPhone: user.phoneNumber == null ? phone : user.phoneNumber,
  };

  useEffect(() => {
    fcmToken();
  }, []);
  async function fcmToken() {
    try {
      const fcmToken = await messaging().getToken();
      console.log(fcmToken, 'is the fcmtoken');
      setFCMtoken(fcmToken);
    } catch (error) {
      console.log('could not get fcm token ');
    }
  }
  async function Update() {
    await firebase.auth().currentUser.updateProfile(update);
    saveData();
    await firestore()
      .collection('Users')
      .doc(user.uid)
      .set({
        update,
      })
      .then(() => {
        console.log('User added!');

        navigation.reset({
          index: 0,
          routes: [{name: 'Drawer'}],
        });
        // navigation.navigate('Home');
      });
  }
  // console.log(fuser);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // console.log('USER data get ', user); // It shows the Firebase user
      setUser(user);

      // console.log('profile user', user); // It is still undefined
      user.getIdToken().then(function (idToken) {
        // <------ Check this line
        // console.log(idToken); // It shows the Firebase token now
      });
    }
  });

  function saveData() {
    try {
      AsyncStorage.setItem('user', JSON.stringify(update));
      console.log('data saved ');
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    displayData();
  }, []);

  return (
    <View>
      {user ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor={'green'}
              title={'refressing'}
            />
          }
          style={styles.container}>
          <StatusBar
            animated={true}
            backgroundColor="#61dafb"
            barStyle={'dark-content'}

            // showHideTransition={statusBarTransition}
            // hidden={hidden}
          />
          {refreshing ? <ActivityIndicator color={'red'} size={40} /> : null}
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
                    fontSize: 70,
                    opacity: 0.4,
                    color: COLOR.WTEXT,
                  }}>
                  Profile
                </Text>
              </View>
              <View
                style={{
                  height: height * 0.13,
                  justifyContent: 'center',
                  width: width * 0.95,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    color: COLOR.WTEXT,
                    fontWeight: '400',
                    fontSize: 20,
                    lineHeight: 20,
                  }}>
                  User's Phone Number :- {'   '} {user.phoneNumber}
                </Text>
              </View>
              <View
                style={{
                  height: height * 0.17,
                  width: width * 0.9,
                  alignSelf: 'center',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}>
                <TextInput
                  onChangeText={text => setName(text)}
                  value={user?.displayName}
                  style={{color: COLOR.WTEXT}}
                  editable={user?.displayName == null ? true : false}
                  placeholder={'Name'}
                />

                <TextInput
                  onChangeText={text => setPhone(text)}
                  style={{color: COLOR.WTEXT}}
                  editable={user.phoneNumber == null ? true : false}
                  value={user.phoneNumber}
                />
              </View>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity onPress={() => Update()}>
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
                      Proceed
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
