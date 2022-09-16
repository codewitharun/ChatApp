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
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import OTPTextView from 'react-native-otp-textinput';
import {COLOR} from './Src/Components/Colors';
const {height, width} = Dimensions.get('screen');
const App = () => {
  const [confirm, setConfirm] = useState(null);
  const [phone, setPhone] = useState(0);
  const [code, setCode] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber() {
    const confirmation = await auth().signInWithPhoneNumber('+91' + phone);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      const res = await confirm.confirm(code);
      console.log('Code successfully Verified.', res.user.phoneNumber);
      Alert.alert(
        'Successfully signed in with phone number:',
        res.user.phoneNumber,
        res.user.displayName,
      );
    } catch (error) {
      console.log('Invalid code.');
    }
  }
  return (
    <View>
      {!confirm ? (
        <SafeAreaView>
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
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: height * 0.7,
                  width: width * 0.9,
                  borderRadius: 10,
                  backgroundColor: COLOR.TEXTINPUT,
                  // justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    height: height * 0.13,
                    width: width * 0.9,

                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('./Src/Images/LOGO/LOGO.png')}
                    style={{width: 300, height: height * 0.1}}
                  />
                </View>
                <View style={{height: height * 0.12}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 30,
                      color: COLOR.BTEXT,
                    }}>
                    LOGIN
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: COLOR.BACKGROUND_COLOR,
                    height: height * 0.25,
                    width: width * 0.75,
                    borderBottomLeftRadius: 22,
                    borderTopLeftRadius: 22,
                    alignSelf: 'flex-end',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: COLOR.BUTTON,
                      height: height * 0.13,
                      width: width * 0.75,
                      justifyContent: 'center',
                      // alignSelf: 'center',
                      // alignItems: 'center',
                    }}>
                    <View>
                      <View style={{height: 30}}>
                        <Text
                          style={{
                            color: COLOR.BTEXT,
                            fontWeight: '500',
                            fontSize: 20,
                          }}>
                          Phone :
                        </Text>
                      </View>
                      <View
                        style={{
                          paddingHorizontal: 15,
                          height: 40,
                          borderTopLeftRadius: 10,
                          borderBottomLeftRadius: 10,
                          backgroundColor: 'white',
                          justifyContent: 'center',
                        }}>
                        <TextInput
                          placeholder="enter 10 digit phone number here"
                          onChangeText={txt => setPhone(txt)}
                          maxLength={10}
                          style={{color: COLOR.BTEXT}}
                          keyboardType="number-pad"
                          placeholderTextColor={'grey'}></TextInput>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => signInWithPhoneNumber()}>
                    <View
                      style={{
                        height: 40,
                        width: width * 0.5,
                        alignSelf: 'center',
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        marginTop: 20,
                        justifyContent: 'center',
                        backgroundColor: COLOR.BUTTON,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 20,
                          color: COLOR.BTEXT,
                        }}>
                        Submit
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView>
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
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: height * 0.7,
                  width: width * 0.9,
                  borderRadius: 10,
                  backgroundColor: COLOR.TEXTINPUT,
                  // justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    height: height * 0.13,
                    width: width * 0.9,

                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('./Src/Images/LOGO/LOGO.png')}
                    style={{width: 300, height: height * 0.1}}
                  />
                </View>
                <View style={{height: height * 0.12}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 30,
                      color: COLOR.BTEXT,
                    }}>
                    LOGIN
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: COLOR.BACKGROUND_COLOR,
                    height: height * 0.25,
                    width: width * 0.75,
                    borderBottomLeftRadius: 22,
                    borderTopLeftRadius: 22,
                    alignSelf: 'flex-end',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: COLOR.BUTTON,
                      height: height * 0.13,
                      width: width * 0.75,
                      justifyContent: 'center',
                      // alignSelf: 'center',
                      // alignItems: 'center',
                    }}>
                    <View>
                      <View style={{height: 30}}>
                        <Text
                          style={{
                            color: COLOR.BTEXT,
                            fontWeight: '500',
                            fontSize: 20,
                          }}>
                          OTP :
                        </Text>
                      </View>
                      <View
                        style={{
                          paddingHorizontal: 15,
                          height: 40,
                          borderTopLeftRadius: 10,
                          borderBottomLeftRadius: 10,
                          backgroundColor: 'white',
                          justifyContent: 'center',
                        }}>
                        <OTPTextView
                          handleTextChange={text => setCode(text)}
                          inputCount={6}
                          keyboardType="numeric"
                          style={{width: width * 0.1, color: COLOR.BTEXT}}
                        />
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => confirmCode()}>
                    <View
                      style={{
                        height: 40,
                        width: width * 0.5,
                        alignSelf: 'center',
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        marginTop: 20,
                        justifyContent: 'center',
                        backgroundColor: COLOR.BUTTON,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 20,
                          color: COLOR.BTEXT,
                        }}>
                        Submit
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
