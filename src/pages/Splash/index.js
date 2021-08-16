import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  PermissionsAndroid,
  Image,
  Animated,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {color} from 'react-native-reanimated';
import {getData} from '../../utils/localStorage';
import LottieView from 'lottie-react-native';

export default function Splash({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const scaleLogo = new Animated.Value(0.2);
  const scaleText = new Animated.Value(100);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Izinkan Untuk Membaca Lokasi',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Sekarang kamu bisa pakai palikasi');
      } else {
        console.log('Lokasi Wajib di izinakn');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  Animated.timing(scaleLogo, {
    toValue: 1,
    duration: 1200,
  }).start();

  Animated.timing(scaleText, {
    toValue: 1,
    duration: 1000,
  }).start();

  useEffect(() => {
    requestCameraPermission();
    const unsubscribe = getData('user').then(res => {
      // console.log(res);
      if (!res) {
        // console.log('beum login');

        setTimeout(() => {
          navigation.replace('GetStarted');
        }, 1500);
      } else {
        console.log('sudah login logon');

        setTimeout(() => {
          navigation.replace('MainApp');
        }, 1500);
      }
    });
  }, []);
  return (
    <SafeAreaView style={styles.page}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // paddingBottom: windowHeight / 4,
        }}>
        <Animated.Image
          source={require('../../assets/logo.png')}
          style={{
            resizeMode: 'contain',
            aspectRatio: scaleLogo,
          }}
        />
        <Animated.View
          style={{
            top: scaleText,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginTop: 10,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 10,
              color: colors.white,
            }}>
            MySpemma
          </Text>
          <Text
            style={{
              marginTop: 10,
              textAlign: 'center',
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 25,
              color: colors.secondary,
            }}>
            Mobile App by
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 25,
              color: colors.secondary,
            }}>
            SMP Muhammadiyah 5 Surabaya
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    aspectRatio: 1,
    width: 250,
    height: 250,
  },
});
