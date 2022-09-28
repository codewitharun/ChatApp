// In App.js in a new project

import * as React from 'react';
import {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer, NavigationActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import Dashboard from './Src/Screens/Dashboard/Dashboard';
import Userlogin from './Src/Screens/Login/Login';
import Splash from './Src/Screens/Splash/Splash';
import Profile from './Src/Screens/Login/Profile';
import Welcome from './Src/Screens/welcome/welcome';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
const CustomDrawerContentComponent = props => {
  return (
    <ScrollView>
      <SafeAreaView
        style={{flex: 1}}
        forceInset={{top: 'always', horizontal: 'never'}}>
        <Text>Hello USER_NAME_FROM_PROPS?</Text>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );
};

function MyDrawer() {
  const [user, setUser] = useState('');
  async function displayData() {
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);
      setUser(parsed);
    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    // arun();
    displayData();
  }, []);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: 'red',
        drawerPosition: 'left',
        drawerType: 'back',
        headerLabel: 'Drawer Type',
      }}>
      <Drawer.Screen name="Home" component={Dashboard} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Userlogin} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Drawer" component={MyDrawer} />
        <Stack.Screen name="Welcome" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
