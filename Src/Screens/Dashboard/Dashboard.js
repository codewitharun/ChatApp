import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Button,
} from 'react-native';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';

import {COLOR} from '../../Components/Colors';

import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {FlatList} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('screen');
const colors = ['tomato', 'thistle', 'skyblue', 'teal'];
const Dashboard = ({navigation, route}) => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  // console.log(authh.displayName);
  useEffect(() => {
    arun();
    startLoading();
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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('8601279944');
  var axios = require('axios');
  var FormData = require('form-data');
  var data = new FormData();
  data.append('password', '1232fg2');
  data.append('email', 'jaswtttgft@gmail.com');
  data.append('mobile', '8765431164');
  data.append('name', 'jaswant kuma');

  var config = {
    method: 'post',
    url: 'https://pinthetrace.pythonanywhere.com/api/auth/register/',

    data: data,
  };
  function apiPost() {
    try {
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={{backgroundColor: COLOR.BACKGROUND_COLOR}}>
      <StatusBar
        animated={true}
        backgroundColor="#000"
        barStyle={Platform.OS === 'android' ? 'light-content' : 'light-content'}

        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      <View style={{height: height * 1, width: width * 1}}>
        {loading ? (
          <View
            style={{
              height: height * 1,
              width: width * 1,
              justifyContent: 'center',
              backgroundColor: COLOR.BACKGROUND_COLOR,
            }}>
            <ActivityIndicator
              //visibility of Overlay Loading Spinner
              visible={loading}
              //Text with the Spinner
              textContent={'Loading...'}
              //Text style of the Spinner Text
              textStyle={styles.spinnerTextStyle}
            />
          </View>
        ) : (
          <View>
            <View
              style={{
                backgroundColor: COLOR.BACKGROUND_COLOR,
                height: height * 1,
                width: width * 1,
              }}>
              <View style={{height: height * 0.1}}>
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
                  height: height * 0.1,
                  justifyContent: 'center',
                  width: width * 0.95,
                  alignSelf: 'center',
                }}>
                <Text style={{color: COLOR.WTEXT, fontSize: 20}}>
                  Welcome {'  :  '}
                  <Text style={{fontSize: 30}}> {user?.displayName}</Text>
                </Text>
                {/* <Text style={{color: COLOR.WTEXT}}> {user?.userPhone}</Text> */}
              </View>
              <View style={{height: height * 0.15}}>
                <SwiperFlatList
                  autoplay
                  autoplayDelay={2}
                  autoplayLoop
                  index={2}
                  showPagination
                  data={colors}
                  renderItem={({item}) => (
                    <View
                      style={[
                        styles.child,
                        {
                          backgroundColor: item,
                          borderRadius: 23,
                          marginLeft: 10,
                        },
                      ]}>
                      <Text style={styles.text}>{item}</Text>
                    </View>
                  )}
                />
              </View>
              <View>
                <Text>Data from here will be sent to api</Text>

                <View>
                  <TextInput
                    onChangeText={txt => {
                      setName(txt);
                    }}
                    placeholder="Name"
                  />
                  <TextInput
                    onChangeText={txt => {
                      setEmail(txt);
                    }}
                    placeholder="Email"
                  />
                  <TextInput
                    onChangeText={txt => {
                      setPassword(txt);
                    }}
                    placeholder="Password"
                  />

                  <Button title="press me" onPress={() => apiPost()} />
                </View>
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
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  child: {width: width * 0.9, height: height * 0.1, justifyContent: 'center'},
  text: {fontSize: 180, textAlign: 'center', color: COLOR.BTEXT},
  spinnerTextStyle: {
    color: '#FFF',
    fontSize: 20,
  },
});
