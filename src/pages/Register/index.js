import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Switch,
  SafeAreaView,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import LottieView from 'lottie-react-native';

export default function Register({navigation}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    nama_lengkap: null,
    nis: null,
    email: null,
    password: null,
    telepon: null,
    alamat: null,
  });

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const simpan = () => {
    setLoading(true);
    console.log(data);
    axios
      .post('https://zavalabs.com/spemma/api/register.php', data)
      .then(res => {
        console.log(res);
        let err = res.data.split('#');

        // console.log(err[0]);
        if (err[0] == 50) {
          setTimeout(() => {
            setLoading(false);
            showMessage({
              message: err[1],
              type: 'danger',
            });
          }, 1200);
        } else {
          setTimeout(() => {
            navigation.replace('Success', {
              messege: res.data,
            });
          }, 1200);
        }
      });
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: isEnabled ? colors.black : colors.primary,
        flex: 1,
        padding: 10,
      }}>
      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        {/* <Image
        source={require('../../assets/logooren.png')}
        style={styles.image}
      /> */}
        <Switch
          trackColor={{false: colors.border, true: colors.secondary}}
          thumbColor={isEnabled ? colors.primary : colors.border}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text
          style={{
            marginTop: 20,
            fontFamily: fonts.secondary[400],
            fontSize: 16,
            color: colors.white,
            // maxWidth: 230,
          }}>
          Silahkan melakukan pendaftaran terlebih dahulu, sebelum login ke
          Aplikasi
        </Text>

        <MyGap jarak={20} />
        <MyInput
          styleInput={{
            color: isEnabled ? colors.white : colors.black,
          }}
          colorIcon={colors.white}
          borderColor={colors.white}
          labelColor={colors.white}
          label="Nama Lengkap"
          iconname="person-outline"
          value={data.nama_lengkap}
          onChangeText={value =>
            setData({
              ...data,
              nama_lengkap: value,
            })
          }
        />
        <MyGap jarak={5} />
        <MyInput
          styleInput={{
            color: isEnabled ? colors.white : colors.black,
          }}
          colorIcon={colors.white}
          borderColor={colors.white}
          labelColor={colors.white}
          label="NIS"
          iconname="card-outline"
          value={data.nis}
          onChangeText={value =>
            setData({
              ...data,
              nis: value,
            })
          }
        />
        <MyGap jarak={5} />
        <MyInput
          styleInput={{
            color: isEnabled ? colors.white : colors.black,
          }}
          colorIcon={colors.white}
          borderColor={colors.white}
          labelColor={colors.white}
          label="Email"
          iconname="mail-outline"
          value={data.email}
          onChangeText={value =>
            setData({
              ...data,
              email: value,
            })
          }
        />
        <MyGap jarak={5} />
        <MyInput
          styleInput={{
            color: isEnabled ? colors.white : colors.black,
          }}
          colorIcon={colors.white}
          borderColor={colors.white}
          labelColor={colors.white}
          label="Alamat"
          iconname="map-outline"
          value={data.alamat}
          onChangeText={value =>
            setData({
              ...data,
              alamat: value,
            })
          }
        />

        <MyGap jarak={5} />
        <MyInput
          styleInput={{
            color: isEnabled ? colors.white : colors.black,
          }}
          colorIcon={colors.white}
          borderColor={colors.white}
          labelColor={colors.white}
          label="Telepon / Whastapp"
          iconname="logo-whatsapp"
          value={data.telepon}
          onChangeText={value =>
            setData({
              ...data,
              telepon: value,
            })
          }
        />

        <MyGap jarak={5} />
        <MyInput
          styleInput={{
            color: isEnabled ? colors.white : colors.black,
          }}
          colorIcon={colors.white}
          borderColor={colors.white}
          labelColor={colors.white}
          label="Password"
          iconname="key-outline"
          secureTextEntry
          value={data.password}
          onChangeText={value =>
            setData({
              ...data,
              password: value,
            })
          }
        />
        <MyGap jarak={20} />
        <MyButton
          warna={colors.secondary}
          title="REGISTER"
          Icons="log-in"
          onPress={simpan}
        />
        <MyGap jarak={20} />
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{
            flex: 1,
            backgroundColor: colors.primary,
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 620 / 4,
    height: 160 / 4,
  },
});
