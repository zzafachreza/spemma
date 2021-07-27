import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {tan} from 'react-native-reanimated';
import {colors} from '../../utils/colors';
import {fonts, windowWidth} from '../../utils/fonts';
import axios from 'axios';
import {getData} from '../../utils/localStorage';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MyButton} from '../../components';
import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

export default function ListData({navigation}) {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    const json = JSON.stringify(remoteMessage);
    const obj = JSON.parse(json);
    // alert(obj.notification);
    // console.log('list transaksi', obj.notification);
    getData('user').then(res => {
      setUser(res);
      // console.log(res);

      axios
        .post('https://zavalabs.com/spemma/api/transaksi.php', {
          id_member: res.id,
        })
        .then(res => {
          // console.log(res.data);
          setData(res.data);
        });
    });
  });

  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        setUser(res);
        // console.log(res);

        axios
          .post('https://zavalabs.com/spemma/api/transaksi.php', {
            id_member: res.id,
          })
          .then(res => {
            console.log(res.data);
            setData(res.data);
          });
      });
    }
  }, [isFocused]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{
          padding: 10,
          flex: 1,
        }}>
        {data.map(item => {
          const MyStatus = () => {
            if (item.kondisi_material == 'RETURN') {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      // borderBottomRightRadius: 10,
                      backgroundColor: colors.black,
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 30,
                      color: colors.white,
                      padding: 10,
                    }}>
                    {item.kondisi_material}
                  </Text>
                  <View
                    style={{
                      justifyContent: 'center',
                      flex: 1,
                      paddingLeft: 5,
                    }}>
                    <Text
                      style={{
                        color: colors.black,
                        fontFamily: fonts.secondary[400],
                      }}>
                      ( {item.alasan_return} )
                    </Text>
                  </View>
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      // borderBottomRightRadius: 10,
                      backgroundColor: colors.black,
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 30,
                      color: colors.white,
                      padding: 10,
                    }}>
                    {item.kondisi_material}
                  </Text>
                </View>
              );
            }
          };

          return (
            <View
              key={item.id}
              style={{
                margin: 5,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderColor: colors.primary,
                borderWidth: 1,
                backgroundColor: colors.white,
              }}>
              <TouchableOpacity>
                <View style={{flex: 1, padding: 10}}>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 30,
                      color: colors.black,
                    }}>
                    Nama Penerima :{' '}
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        color: colors.primary,
                      }}>
                      {item.nama_penerima}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 30,
                      color: colors.black,
                    }}>
                    Nama Pengirim :{' '}
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        color: colors.primary,
                      }}>
                      {item.nama_pengirim}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                      fontSize: windowWidth / 30,
                      color: colors.black,
                    }}>
                    {item.nama_material}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 30,
                      color: colors.primary,
                    }}>
                    {item.kode_material} -{' '}
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        color: colors.black,
                      }}>
                      {item.jenis_material}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                    }}>
                    {item.tanggal}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                      fontSize: windowWidth / 30,
                    }}>
                    Jumlah :{' '}
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        color: colors.primary,
                      }}>
                      {item.jumlah_material}
                    </Text>
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <MyStatus />
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        axios
                          .post(
                            'https://zavalabs.com/spemma/api/transaksi_hapus.php',
                            {
                              id: item.id,
                            },
                          )
                          .then(res => {
                            axios
                              .post(
                                'https://zavalabs.com/spemma/api/transaksi.php',
                              )
                              .then(res => {
                                console.log(res.data);
                                setData(res.data);
                              });
                          });
                      }}
                      style={{
                        padding: 10,
                        backgroundColor: colors.danger,
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: fonts.secondary[600],
                          color: colors.white,
                          marginLeft: 5,
                        }}>
                        Hapus
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>

              {item.status === 'SELESAI' && (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      backgroundColor: colors.primary,
                      color: colors.white,
                      padding: 10,
                      fontFamily: fonts.secondary[600],
                      textAlign: 'center',
                    }}>
                    SELESAI
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
