import React, {useState} from 'react';
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
import {fonts} from '../../utils/fonts';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import LottieView from 'lottie-react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function Aik({navigation, route}) {
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

  const Today = new Date();
  const dd = String(Today.getDate()).padStart(2, '0');
  const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = Today.getFullYear();
  const today = `${yyyy}-${mm}-${dd}`;

  const [date, setDate] = useState(Today);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(route.params);

  const [kirim, setKirim] = useState({
    id_member: user.id,
    tanggal: date,
    nama_lengkap: user.nama_lengkap,
    shalat: 'SUBUH',
    quran: null,
    sunnah: 'TAHAJUD',
    foto: 'https://zavalabs.com/nogambar.jpg',
  });

  const sendServer = () => {
    console.log('krim', kirim);
    // setLoading(true);

    console.log('kirim server', kirim);
    axios
      .post('https://zavalabs.com/spemma/api/aik_add.php', kirim)
      .then(res => {
        console.log(res);
        setTimeout(() => {
          setLoading(false);
          navigation.replace('MainApp');
        }, 1000);
        showMessage({
          type: 'success',
          message: 'Data berhasil disimpan !',
        });
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
                name="calendar-outline"
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
                Tanggal
              </Text>
            </View>
            <DatePicker
              style={{
                backgroundColor: isEnabled ? colors.white : colors.white,
              }}
              mode="date"
              date={date}
              onDateChange={val => {
                const Today = val;
                const dd = String(Today.getDate()).padStart(2, '0');
                const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
                const yyyy = Today.getFullYear();
                const today = `${yyyy}-${mm}-${dd}`;

                setKirim({
                  ...kirim,
                  tanggal: today,
                });
              }}
            />
          </View>

          <MyGap jarak={10} />

          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: 10,
            }}>
            <MyPicker
              value={kirim.jenis_material}
              onValueChange={val =>
                setKirim({
                  ...kirim,
                  jenis_material: val,
                })
              }
              iconname="grid-outline"
              label="Shalat"
              data={[
                {
                  label: 'SUBUH',
                  value: 'SUBUH',
                },
                {
                  label: 'DUHUR',
                  value: 'DUHUR',
                },
                {
                  label: 'ASAR',
                  value: 'ASAR',
                },
                {
                  label: 'MAGRIB',
                  value: 'MAGRIB',
                },
                {
                  label: 'ISYAK',
                  value: 'ISYAK',
                },
              ]}
            />
          </View>

          <MyGap jarak={10} />
          <MyInput
            styleInput={{
              color: isEnabled ? colors.white : colors.black,
            }}
            label="Saya membaca al-qur'an "
            iconname="book-outline"
            value={kirim.quran}
            onChangeText={val =>
              setKirim({
                ...kirim,
                quran: val,
              })
            }
          />
          <MyGap jarak={10} />

          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: 10,
            }}>
            <MyPicker
              value={kirim.sunnah}
              onValueChange={val =>
                setKirim({
                  ...kirim,
                  sunnah: val,
                })
              }
              iconname="shield-checkmark-outline"
              label="Shalat Sunnah"
              data={[
                {
                  label: 'TAHAJUD',
                  value: 'TAHAJUD',
                },
                {
                  label: 'DHUHA',
                  value: 'DHUHA',
                },
                {
                  label: 'SUNNAH RAWATIB',
                  value: 'SUNNAH RAWATIB',
                },
              ]}
            />
          </View>

          <MyGap jarak={10} />
          <UploadFoto
            onPress1={() => getCamera(1)}
            onPress2={() => getGallery(1)}
            label="Upload Amal Baiku"
            foto={foto}
          />
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
