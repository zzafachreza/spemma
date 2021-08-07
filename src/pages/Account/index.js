import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import {windowWidth, fonts} from '../../utils/fonts';
import {getData, storeData} from '../../utils/localStorage';
import {colors} from '../../utils/colors';
import {MyButton, MyGap} from '../../components';

export default function Account({navigation, route}) {
  const [user, setUser] = useState({});

  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      // console.log(user);
    });
  }, []);

  const btnKeluar = () => {
    storeData('user', null);

    navigation.replace('GetStarted');
  };

  return (
    <SafeAreaView>
      <View style={{padding: 10}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <View
            style={{
              borderRadius: 20,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri:
                  user.foto == ''
                    ? 'https://zavalabs.com/nogambar.jpg'
                    : user.foto,
              }}
              resizeMode="contain"
              style={{width: windowWidth / 2.5, aspectRatio: 1}}
            />
          </View>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20,
            }}>
            {user.nis}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 20,
            }}>
            {user.nama_lengkap}
          </Text>
        </View>
        {/* data detail */}
        <View style={{padding: 10}}>
          {user.jenis_tendik == 'Guru' || user.jenis_tendik == 'Karyawan' ? (
            <MyButton
              onPress={() => navigation.navigate('EditProfile2', user)}
              title="Edit Profile"
              colorText={colors.white}
              iconColor={colors.white}
              warna={colors.primary}
              Icons="create-outline"
            />
          ) : (
            <MyButton
              onPress={() => navigation.navigate('EditProfile', user)}
              title="Edit Profile"
              colorText={colors.white}
              iconColor={colors.white}
              warna={colors.primary}
              Icons="create-outline"
            />
          )}

          <MyGap jarak={10} />
          <View>
            {user.jenis_tendik == 'Guru' || user.jenis_tendik == 'Karyawan' ? (
              <>
                <View
                  style={{
                    marginVertical: 5,
                    padding: 10,
                    backgroundColor: colors.white,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                    }}>
                    NMB
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                    }}>
                    {user.nmb}
                  </Text>
                </View>
                <View
                  style={{
                    marginVertical: 5,
                    padding: 10,
                    backgroundColor: colors.white,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                    }}>
                    Jenis Tendik
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                    }}>
                    {user.jenis_tendik}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View
                  style={{
                    marginVertical: 5,
                    padding: 10,
                    backgroundColor: colors.white,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                    }}>
                    NIS
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                    }}>
                    {user.nis}
                  </Text>
                </View>
                <View
                  style={{
                    marginVertical: 5,
                    padding: 10,
                    backgroundColor: colors.white,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                    }}>
                    Kelas
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                    }}>
                    {user.kelas}
                  </Text>
                </View>
              </>
            )}
            <View
              style={{
                marginVertical: 5,
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                }}>
                E-mail
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                }}>
                {user.email}
              </Text>
            </View>
            <View
              style={{
                marginVertical: 5,
                padding: 10,
                borderRadius: 10,
                backgroundColor: colors.white,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                }}>
                Alamat
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                }}>
                {user.alamat}
              </Text>
            </View>
          </View>
        </View>

        {/* button */}
        <View style={{padding: 10}}>
          <MyButton
            onPress={btnKeluar}
            title="Keluar"
            warna={colors.secondary}
            Icons="log-out-outline"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
