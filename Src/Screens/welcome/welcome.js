import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import React, {useState, useEffect} from 'react';
import {COLOR} from '../../Components/Colors';
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
  const [align, setAlign] = useState('center');
  const [alignsecond, setAlignsecond] = useState(false);

  setTimeout(() => {
    setAlign('flex-start'), setAlignsecond(true);
  }, 3000);

  return (
    <View style={[styles.container, {justifyContent: align}]}>
      <Image
        source={{
          uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/react_logo.png',
        }}
        style={{width: 100, height: 100}}
      />
      {/* <View style={{}}>
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
      </View> */}
      {!alignsecond ? null : (
        <View style={{margin: 20}}>
          <Text style={{color: COLOR.WTEXT, fontSize: 30, fontWeight: 'bold'}}>
            Welcome to the App
          </Text>
        </View>
      )}
    </View>
  );
};
export default Welcome;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    // marginHorizontal: 40,
    // marginLeft: 20,
    backgroundColor: COLOR.BACKGROUND_COLOR,
  },
});
