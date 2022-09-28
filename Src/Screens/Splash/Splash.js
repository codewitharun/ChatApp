import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {COLOR} from '../../Components/Colors';

import Userlogin from '../Login/Login';
import Welcome from '../welcome/welcome';
import messaging from '@react-native-firebase/messaging';
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../Login/Profile';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const Splash = ({navigation, route}) => {
  // console.log('Splash data =====>', route);
  const [isVisible, setIsVisible] = useState(false);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState('');
  const [fuser, setFuser] = useState('');
  const [token, setToken] = useState();
  console.log('firebase user changed', fuser);
  // Handle user state changes
  async function onAuthStateChanged(user) {
    console.log('User state changed', user);
    setUser(user);
    const fcmToken = await messaging().getToken();
    setToken(fcmToken);
    console.log('Device FcmToken: ========>>>>>', fcmToken);
    if (initializing);

    setInitializing(false);
  }

  useEffect(() => {
    setTimeout(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

      console.log(subscriber);
      return subscriber; // unsubsc
    }, 4000);
  }, []);

  if (initializing) return <Welcome />;

  if (!user) {
    return (
      <View>
        <Userlogin navigation={navigation} />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <Profile navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};
export default Splash;

const styles = StyleSheet.create({});
