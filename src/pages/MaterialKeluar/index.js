import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Switch} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MyInput, MyGap, MyButton, MyPicker} from '../../components';
import {colors} from '../../utils/colors';
import DatePicker from 'react-native-date-picker';
import {Icon} from 'react-native-elements';
import {fonts} from '../../utils/fonts';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import LottieView from 'lottie-react-native';

export default function MaterialKeluar({navigation}) {
  const Today = new Date();
  const dd = String(Today.getDate()).padStart(2, '0');
  const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = Today.getFullYear();
  const today = `${yyyy}-${mm}-${dd}`;

  const [date, setDate] = useState(Today);
  const [loading, setLoading] = useState(false);
  const [kirim, setKirim] = useState({
    tanggal: date,
    nama_penerima: null,
    jenis_material: 'CRITICAL',
    kode_material: null,
    kondisi_material: 'KELUAR',
    jumlah_material: null,
    nama_pengirim: null,
  });

  const sendServer = () => {
    console.log('krim', kirim);
    setLoading(true);

    console.log(kirim);
    axios
      .post('https://zavalabs.com/spemma/api/material_keluar.php', kirim)
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

  return (
    <SafeAreaView
      style={{
        backgroundColor: isEnabled ? colors.black : colors.white,
      }}>
      <ScrollView>
        <View style={{padding: 10, flex: 1}}>
          <Switch
            trackColor={{false: colors.border, true: colors.secondary}}
            thumbColor={isEnabled ? colors.primary : colors.border}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <MyInput
            styleInput={{
              color: isEnabled ? colors.white : colors.black,
            }}
            label="Nama Penerima"
            iconname="person-outline"
            value={kirim.nama_penerima}
            onChangeText={val =>
              setKirim({
                ...kirim,
                nama_penerima: val,
              })
            }
          />
          <MyGap jarak={10} />
          <MyInput
            styleInput={{
              color: isEnabled ? colors.white : colors.black,
            }}
            label="Nama Pengirim"
            iconname="cube-outline"
            value={kirim.nama_pengirim}
            onChangeText={val =>
              setKirim({
                ...kirim,
                nama_pengirim: val,
              })
            }
          />
          <MyGap jarak={10} />
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
          <MyInput
            label="Nama Material"
            iconname="cube-outline"
            value={kirim.nama_material}
            onChangeText={val =>
              setKirim({
                ...kirim,
                nama_material: val,
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
              value={kirim.jenis_material}
              onValueChange={val =>
                setKirim({
                  ...kirim,
                  jenis_material: val,
                })
              }
              iconname="grid-outline"
              label="Jenis Material"
              data={[
                {
                  label: 'CRITICAL',
                  value: 'CRITICAL',
                },
                {
                  label: 'NON CRITICAL',
                  value: 'NON CRITICAL',
                },
              ]}
            />
          </View>

          <MyGap jarak={10} />
          <MyInput
            styleInput={{
              color: isEnabled ? colors.white : colors.black,
            }}
            label="Kode Material"
            iconname="barcode-outline"
            value={kirim.kode_material}
            onChangeText={val =>
              setKirim({
                ...kirim,
                kode_material: val,
              })
            }
          />
          <MyGap jarak={10} />
          {/* <MyInput
            label="Kondisi Material"
            iconname="shield-checkmark-outline"
            value={kirim.kondisi_material}
            onChangeText={val =>
              setKirim({
                ...kirim,
                kondisi_material: val,
              })
            }
          /> */}
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: 10,
            }}>
            <MyPicker
              value={kirim.kondisi_material}
              onValueChange={val =>
                setKirim({
                  ...kirim,
                  kondisi_material: val,
                })
              }
              iconname="shield-checkmark-outline"
              label="Kondisi Material"
              data={[
                {
                  label: 'KELUAR',
                  value: 'KELUAR',
                },
                {
                  label: 'BARU',
                  value: 'BARU',
                },
                {
                  label: 'RETURN',
                  value: 'RETURN',
                },
              ]}
            />
          </View>

          <MyGap jarak={10} />
          <MyInput
            styleInput={{
              color: isEnabled ? colors.white : colors.black,
            }}
            keyboardType="number-pad"
            label="Jumlah Material"
            iconname="server-outline"
            value={kirim.jumlah_material}
            onChangeText={val =>
              setKirim({
                ...kirim,
                jumlah_material: val,
              })
            }
          />
          <MyGap jarak={10} />
          <MyButton
            title="INPUT"
            warna={colors.secondary}
            colorText={colors.black}
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
