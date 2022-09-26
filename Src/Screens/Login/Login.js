import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Button,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import OTPTextView from 'react-native-otp-textinput';
import {COLOR} from '../../Components/Colors';
const {height, width} = Dimensions.get('screen');

const Userlogin = ({navigation}) => {
  const [confirm, setConfirm] = useState(null);
  const [phone, setPhone] = useState(0);
  const [code, setCode] = useState('');
  const [ftoken, setFtoken] = useState('');
  useEffect(() => {
    requestUserPermission();
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber() {
    try {
      const confirmation = await auth().signInWithPhoneNumber('+91' + phone);

      setConfirm(confirmation);
    } catch (error) {
      console.log('Login Error Due to  =======>>>>>', error);
    }
  }

  async function confirmCode() {
    try {
      const res = await confirm.confirm(code);

      // Add user account information in Firestore to be retrieved later.

      console.log('Code successfully Verified.', res.user.displayName);

      const udata = res.user;

      Alert.alert(
        'Successfully signed in with phone number:',

        res.user.phoneNumber,
        res.user.displayName,
      );
      navigation.reset({
        index: 0,
        routes: [{name: 'Profile'}],
      });
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  async function requestUserPermission() {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      // console.log('manual auth status ======>', authStatus);
      // console.log('manual auth status ======>', enabled);
    } catch (error) {
      console.log('manual auth status error =====>>>> ', error);
    }
  }

  return (
    <View>
      {!confirm ? (
        <View
          style={{
            backgroundColor: COLOR.BACKGROUND_COLOR,
            height: height * 1,
            width: width * 1,
          }}>
          <View
            style={{
              backgroundColor: COLOR.BACKGROUND_COLOR,
              height: height * 1,
              width: width * 0.9,
              // borderWidth: 1,
              alignSelf: 'center',
              // justifyContent: 'center',
            }}>
            <View
              style={{
                height: height * 0.1,
                width: width * 0.9,
                marginTop: 30,
              }}>
              <View
                style={{
                  height: height * 0.3,
                  justifyContent: 'flex-end',
                  width: width * 0.9,
                }}>
                <Text
                  style={{
                    color: 'white',
                    opacity: 0.3,
                    fontFamily: 'Comfortaa-Bold',
                    fontSize: 60,
                  }}>
                  Welcome Back!
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: COLOR.BACKGROUND_COLOR,
                  height: height * 0.4,
                  width: width * 0.9,

                  justifyContent: 'center',
                }}>
                <View style={{height: height * 0.2}}>
                  <View
                    style={{height: height * 0.13, justifyContent: 'center'}}>
                    <Text style={{color: COLOR.WTEXT, fontWeight: '400'}}>
                      Phone
                    </Text>
                    <TextInput
                      placeholder="Enter 10 digit number here"
                      placeholderTextColor={'grey'}
                      maxLength={10}
                      style={{color: COLOR.WTEXT, height: 50}}
                      onChangeText={txt => setPhone(txt)}
                      keyboardType="number-pad"
                    />
                  </View>
                  <TouchableOpacity onPress={() => signInWithPhoneNumber()}>
                    <View
                      style={{
                        height: height * 0.06,
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
                        Sign In
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: COLOR.BACKGROUND_COLOR,
            height: height * 1,
            width: width * 1,
          }}>
          <View
            style={{
              backgroundColor: COLOR.BACKGROUND_COLOR,
              height: height * 1,
              width: width * 0.9,
              // borderWidth: 1,
              alignSelf: 'center',
              // justifyContent: 'center',
            }}>
            <View
              style={{
                height: height * 0.1,
                width: width * 0.9,
                marginTop: 30,
              }}>
              <View
                style={{
                  height: height * 0.3,
                  justifyContent: 'flex-end',
                  width: width * 0.9,
                }}>
                <Text
                  style={{
                    color: 'white',
                    opacity: 0.3,
                    fontFamily: 'Comfortaa-Bold',
                    fontSize: 60,
                  }}>
                  Welcome Back!
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: COLOR.BACKGROUND_COLOR,
                  height: height * 0.4,
                  // height: height * 0.4,
                  width: width * 0.9,

                  justifyContent: 'center',
                }}>
                <View style={{height: height * 0.2}}>
                  <View
                    style={{height: height * 0.13, justifyContent: 'center'}}>
                    <Text style={{color: COLOR.WTEXT, fontWeight: '400'}}>
                      OTP Code
                    </Text>
                    {/* <TextInput
                      placeholder="Enter 10 digit number here"
                      placeholderTextColor={'grey'}
                      maxLength={10}
                      selection={false}
                      onChangeText={txt => setPhone(txt)}
                      keyboardType="number-pad"
                    /> */}
                    <OTPTextView
                      handleTextChange={text => setCode(text)}
                      inputCount={6}
                      keyboardType="numeric"
                      style={{
                        width: width * 0.1,
                        color: COLOR.WTEXT,

                        height: 50,
                      }}
                    />
                    <Text style={{color: COLOR.WTEXT, fontSize: 15}}>
                      otp sent to {phone}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => confirmCode()}>
                    <View
                      style={{
                        height: height * 0.06,
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
                        Verify Code
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Userlogin;

const styles = StyleSheet.create({});
