import React, {useState, useEffect, version} from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Linking,
  TouchableHighlight,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {getData} from '../../utils/localStorage';
import {Icon} from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import MyNews from '../../components/MyNews';
import MyKategori from '../../components/MyKategori';
import axios from 'axios';
import MyCarouser2 from '../../components/MyCarouser2';
import {MyButton, MyGap} from '../../components';

export default function Home({navigation}) {
  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const Today = new Date();
  const hari = String(days[Today.getDay()]);
  const dd = String(Today.getDate()).padStart(2, '0');
  const mm = String(monthNames[Today.getMonth()]); //January is 0!
  const yyyy = Today.getFullYear();
  const jam = Today.getHours();
  const menit = Today.getMinutes();
  const detik = Today.getUTCSeconds();
  const today = `${hari}, ${dd} ${mm} ${yyyy}`;

  const [user, setUser] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      console.log(res);
      setUser(res);
      getData('token').then(res => {
        console.log('data token,', res);
        setToken(res.token);
      });
    });
    axios
      .post('https://zavalabs.com/mylaundry/api/update_token.php', {
        id_member: user.id,
        token: token,
      })
      .then(res => {
        console.log('update token', res);
      });
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;
  const _renderItem = ({item, index}) => {
    return (
      <Image
        resizeMode="contain"
        source={{uri: item.image}}
        style={{
          width: windowWidth,
          height: Math.round((windowWidth * 9) / 16),
        }}
      />
    );
  };
  return (
    <ImageBackground
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <ScrollView>
        <View
          style={{
            padding: 10,
            backgroundColor: colors.white,
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                <Image
                  source={{
                    uri:
                      user.foto == ''
                        ? 'https://zavalabs.com/nogambar.jpg'
                        : user.foto,
                  }}
                  style={{width: 70, height: 70, borderRadius: 35}}
                />
              </TouchableOpacity>
              <View>
                <Text
                  style={{
                    left: 10,
                    fontSize: windowWidth / 25,
                    color: colors.black,
                    fontFamily: fonts.secondary[400],
                  }}>
                  Selamat datang,
                </Text>
                <Text
                  style={{
                    left: 10,
                    fontSize: windowWidth / 22,
                    color: colors.black,
                    fontFamily: fonts.secondary[600],
                  }}>
                  {user.nama_lengkap}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Icon
                type="ionicon"
                name="calendar-outline"
                color={colors.black}
              />
              <Text
                style={{
                  left: 10,
                  fontSize: windowWidth / 22,
                  fontFamily: fonts.secondary[600],
                  color: colors.primary,
                }}>
                {today}
              </Text>
            </View>
          </View>

          <View>
            <Image
              source={require('../../assets/logo.png')}
              style={{
                height: 80,
                width: 60,
                resizeMode: 'stretch',
              }}
            />
          </View>
        </View>
        <View style={{flex: 1, padding: 10}}>
          <View
            style={{
              flex: 1,
              marginTop: windowHeight / 30,
            }}>
            {user.jenis_tendik == 'Guru' || user.jenis_tendik == 'Karyawan' ? (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Absen', user)}
                  style={{
                    padding: 10,
                    backgroundColor: '#25DBDB',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/presensi.png')}
                    style={{
                      width: '100%',
                      resizeMode: 'contain',
                      height: 70,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 15,
                      color: colors.white,
                    }}>
                    PRESENSI GURU
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                      fontSize: windowWidth / 25,
                      color: colors.white,
                    }}>
                    PRESENSI
                  </Text>
                </TouchableOpacity>
                <MyGap jarak={15} />
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://play.google.com/store/apps/details?id=com.microsoft.teams&hl=in&gl=US',
                    )
                  }
                  style={{
                    padding: 10,
                    backgroundColor: colors.white,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/team.png')}
                    style={{
                      width: '100%',
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 15,
                      color: colors.secondary,
                    }}>
                    TEAMS
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                      fontSize: windowWidth / 25,
                      color: colors.secondary,
                    }}>
                    Silahkan masuk ke Teams
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Aik', user)}
                  style={{
                    padding: 10,
                    backgroundColor: '#25DBDB',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/aik.png')}
                    style={{
                      width: '100%',
                      resizeMode: 'contain',
                      height: 70,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 15,
                      color: colors.white,
                    }}>
                    AIK
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                      fontSize: windowWidth / 25,
                      color: colors.white,
                    }}>
                    Input Data AIK
                  </Text>
                </TouchableOpacity>
                <MyGap jarak={15} />
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://play.google.com/store/apps/details?id=com.microsoft.teams&hl=in&gl=US',
                    )
                  }
                  style={{
                    padding: 10,
                    backgroundColor: colors.white,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/team.png')}
                    style={{
                      width: '100%',
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 15,
                      color: colors.secondary,
                    }}>
                    TEAMS
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                      fontSize: windowWidth / 25,
                      color: colors.secondary,
                    }}>
                    Silahkan masuk ke Teams
                  </Text>
                </TouchableOpacity>
                <MyGap jarak={15} />
                <TouchableOpacity
                  onPress={() => navigation.navigate('Nilai', user)}
                  style={{
                    padding: 10,
                    backgroundColor: colors.secondary,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/penilaian.png')}
                    style={{
                      width: '100%',
                      height: 80,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 15,
                      color: colors.white,
                    }}>
                    PENILAIAN DIRI
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                      fontSize: windowWidth / 25,
                      color: colors.white,
                    }}>
                    Laporan Penilaian
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
