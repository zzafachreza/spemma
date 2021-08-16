import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Switch,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MyInput, MyGap, MyButton, MyPicker} from '../../components';
import {colors} from '../../utils/colors';
import DatePicker from 'react-native-date-picker';
import {Icon} from 'react-native-elements';
import {fonts, windowWidth} from '../../utils/fonts';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import LottieView from 'lottie-react-native';
import Geolocation from '@react-native-community/geolocation';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function Absen({navigation, route}) {
  const [foto, setfoto] = useState('https://zavalabs.com/nogambar.jpg');

  const options = {
    includeBase64: true,
    quality: 0.2,
  };

  const getCamera = xyz => {
    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        switch (xyz) {
          case 1:
            setKirim({
              ...kirim,
              foto: `data:${response.type};base64, ${response.base64}`,
            });
            break;
        }
      }
    });
  };

  const getGallery = xyz => {
    launchImageLibrary(options, response => {
      console.log('All Response = ', response);

      console.log('Ukuran = ', response.fileSize);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        if (response.fileSize <= 200000) {
          let source = {uri: response.uri};
          switch (xyz) {
            case 1:
              setKirim({
                ...kirim,
                foto: `data:${response.type};base64, ${response.base64}`,
              });
              break;
          }
        } else {
          showMessage({
            message: 'Ukuran Foto Terlalu Besar Max 500 KB',
            type: 'danger',
          });
        }
      }
    });
  };

  const addZero = i => {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  };

  const Today = new Date();
  const dd = String(Today.getDate()).padStart(2, '0');
  const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = Today.getFullYear();
  const today = `${yyyy}-${mm}-${dd}`;
  const jam = addZero(Today.getHours());
  const menit = addZero(Today.getMinutes());
  const detik = addZero(Today.getSeconds());
  const waktu = `${jam}:${menit}:${detik}`;

  const [date, setDate] = useState(Today);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(route.params);
  const [show, setShow] = useState(true);

  const [kirim, setKirim] = useState({
    id_member: user.id,
    nmb: user.nmb,
    tanggal: today,
    jam: waktu,
    tipe: 'MASUK',
    // latitude: null,
    // longitude: null,
    jurnal: null,
  });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const Today = new Date(currentDate);
    const jam = addZero(Today.getHours());
    const menit = addZero(Today.getMinutes());
    const detik = addZero(Today.getSeconds());
    const waktu = `${jam}:${menit}:${detik}`;
    setKirim({
      ...kirim,
      jam: waktu,
    });
    setShow(false);
  };

  const sendServer = () => {
    Geolocation.getCurrentPosition(position => {
      console.log(JSON.stringify(position));

      axios
        .post('https://zavalabs.com/spemma/api/absen_add.php', {
          ...kirim,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        .then(res => {
          console.log(res);
          if (res.data == 200) {
            setTimeout(() => {
              setLoading(false);
              navigation.replace('MainApp');
              showMessage({
                type: 'success',
                message: 'Absen Berhasil !',
              });
            }, 1000);
          } else {
            showMessage({
              type: 'danger',
              message: res.data,
            });
          }
        });

      console.log('get lokasi', position.coords);
    });
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const UploadFoto = ({onPress1, onPress2, label, foto}) => {
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: colors.white,
          marginVertical: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.border,
          elevation: 2,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.black,
          }}>
          {label}
        </Text>
        <Image
          source={{
            uri: kirim.foto,
          }}
          style={{
            width: '100%',
            aspectRatio: 2,
          }}
          resizeMode="center"
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              paddingRight: 5,
            }}>
            <MyButton
              onPress={onPress1}
              colorText={colors.black}
              title="KAMERA"
              warna={colors.border}
            />
          </View>
          <View
            style={{
              flex: 1,
              paddingLeft: 5,
            }}>
            <MyButton
              onPress={onPress2}
              title="GALLERY"
              warna={colors.secondary}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: isEnabled ? colors.black : colors.white,
      }}>
      <ScrollView>
        <View style={{padding: 10, flex: 1}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Icon
                type="ionicon"
                name="alarm-outline"
                color={colors.primary}
                size={16}
              />
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.primary,
                  left: 10,
                  fontSize: 16,
                }}>
                Jam
              </Text>
            </View>
            <View
              style={{
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                  left: 10,
                  fontSize: windowWidth / 6,
                }}>
                {kirim.jam}
              </Text>
            </View>
            {show && (
              <DateTimePicker
                value={date}
                mode={'time'}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            {/* <DatePicker
              style={{
                backgroundColor: isEnabled ? colors.white : colors.white,
              }}
              mode="time"
              display="clock"
              is24Hour={true}
              date={date}
              onDateChange={val => {
                const Today = val;
                const dd = String(Today.getDate()).padStart(2, '0');
                const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
                const yyyy = Today.getFullYear();
                const today = `${yyyy}-${mm}-${dd}`;
                const jam = addZero(Today.getHours());
                const menit = addZero(Today.getMinutes());
                const detik = addZero(Today.getSgeteconds());
                const waktu = `${jam}:${menit}:${detik}`;

                setKirim({
                  ...kirim,
                  jam: waktu,
                });
              }}
            /> */}
          </View>

          <MyGap jarak={10} />

          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: 10,
            }}>
            <MyPicker
              value={kirim.tipe}
              onValueChange={val => {
                setKirim({
                  ...kirim,
                  tipe: val,
                });
                setShow(false);
              }}
              iconname="grid-outline"
              label="Tipe Absen"
              data={[
                {
                  label: 'MASUK',
                  value: 'MASUK',
                },
                {
                  label: 'PULANG',
                  value: 'PULANG',
                },
              ]}
            />
          </View>

          <MyGap jarak={10} />
          {kirim.tipe == 'PULANG' && (
            <MyInput
              styleInput={{
                color: isEnabled ? colors.white : colors.black,
              }}
              label="Jurnal Guru / Karyawan "
              iconname="book-outline"
              value={kirim.jurnal}
              onChangeText={val =>
                setKirim({
                  ...kirim,
                  jurnal: val,
                })
              }
            />
          )}

          <MyGap jarak={10} />
          <MyButton
            title="SIMPAN"
            warna={colors.primary}
            colorText={colors.white}
            onPress={sendServer}
          />
        </View>
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

const styles = StyleSheet.create({});
