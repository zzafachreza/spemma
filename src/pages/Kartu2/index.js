import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';
import WebView from 'react-native-webview';
import {colors} from '../../utils/colors';
import {getData} from '../../utils/localStorage';
import {windowWidth, fonts} from '../../utils/fonts';
import QRCode from 'react-native-qrcode-svg';

export default function Kartu2({route}) {
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(true);

  const hideSpinner = () => {
    setVisible(false);
  };

  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      console.log('data pelajar', res);
    });
  }, []);

  const myUrl = `https://zavalabs.com/spemma/api/kartu.php`;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 5,
        backgroundColor: colors.border,
      }}>
      <View
        style={{
          height: windowWidth / 1.5,
          backgroundColor: colors.white,
          borderRadius: 10,
          overflow: 'hidden',
          elevation: 3,
          // borderWidth: 2,
          // borderColor: colors.primary,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
            backgroundColor: colors.secondary,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 18,
              color: colors.white,
            }}>
            KARTU PEGAWAI
          </Text>
        </View>
        {/* nama */}

        <View style={{flex: 1, padding: 10}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  fontSize: windowWidth / 25,
                }}>
                {user.nama_lengkap}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  fontSize: windowWidth / 25,
                }}>
                {user.jenis_tendik}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  fontSize: windowWidth / 25,
                }}>
                {user.nmb}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: colors.primary,
              }}>
              <QRCode
                logo={require('../../assets/logo.png')}
                // logoSize={30}
                value={user.nis}
                size={60}
              />
            </View>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                width: 120,
                height: 120,
                backgroundColor: colors.border,
                elevation: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Image
                source={{
                  uri:
                    user.foto == ''
                      ? 'https://zavalabs.com/nogambar.jpg'
                      : user.foto,
                }}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 10,
                }}
              />
            </View>
          </View>
        </View>
        {/* footer */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
            backgroundColor: colors.secondary,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20,
              color: colors.white,
            }}>
            SMP Muhammadiyah 5 Surabaya
          </Text>
        </View>
        {/* footer */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
