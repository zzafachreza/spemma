import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  View,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Splash,
  GetStarted,
  Login,
  Register,
  Home,
  Account,
  Success,
  Berita,
  Tambah,
  Success2,
  ListDetail,
  Search,
  Kategori,
  ListData,
  Barang,
  Cart,
  Checkout,
  Bayar,
  Pemakaian,
  PemakaianTambah,
  BarangPemakaian,
  Akses,
  Bayar2,
  Search2,
  Laporan,
  Chat,
  Artikel,
  MaterialNew,
  MaterialReturn,
  MaterialKeluar,
  MaterialReport,
  MaterialReportDetail,
  Camera,
  Login2,
  Register2,
  Kartu,
  EditProfile,
  EditProfile2,
  Kartu2,
  Aik,
  Absen,
} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigator} from '../components';
import {colors} from '../utils/colors';
import {getData} from '../utils/localStorage';
import Nilai from '../pages/Nilai';
import {Icon} from 'react-native-elements';
import {fonts} from '../utils/fonts';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainApp = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
    });
  }, []);
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      {user.nis && <Tab.Screen name="Kartu" component={Kartu} />}
      {user.nmb && <Tab.Screen name="Kartu2" component={Kartu2} />}
      {/* <Tab.Screen name="Chat" component={Chat} /> */}
      {/* <Tab.Screen name="Notifikasi" component={Notifikasi} /> */}
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default function Router() {
  return (
    <Stack.Navigator initialRouteName={'Splash'}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ListData"
        component={ListData}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Pemakaian"
        component={Pemakaian}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PemakaianTambah"
        component={PemakaianTambah}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Success"
        component={Success}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Success2"
        component={Success2}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Laporan"
        component={Laporan}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: 'Login',
          headerShown: false,

          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTitle: 'Edit Profile',
          headerShown: false,

          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />

      <Stack.Screen
        name="EditProfile2"
        component={EditProfile2}
        options={{
          headerTitle: 'Edit Profile',
          headerShown: false,

          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />

      <Stack.Screen
        name="Login2"
        component={Login2}
        options={{
          headerTitle: 'Login Guru',
          headerShown: false,

          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerTitle: 'Register',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />

      <Stack.Screen
        name="Register2"
        component={Register2}
        options={{
          headerTitle: 'Register Guru',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />

      <Stack.Screen
        name="Kartu"
        component={Kartu}
        options={{
          headerTitle: 'Kartu',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />

      <Stack.Screen
        name="Kartu2"
        component={Kartu2}
        options={{
          headerTitle: 'Kartu',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />

      <Stack.Screen
        name="Nilai"
        component={Nilai}
        options={{
          headerTitle: 'Penilaian Diri',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />

      <Stack.Screen
        name="Aik"
        component={Aik}
        options={({route, navigation}) => ({
          title: 'Input Data AIK',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ListData')}
              style={{
                marginRight: 20,
              }}>
              <Icon type="ionicon" name="list" color={colors.white} />
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.white,
                }}>
                Data AIK
              </Text>
            </TouchableOpacity>
          ),
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Absen"
        component={Absen}
        options={{
          headerTitle: 'Absensi Guru / Karyawan',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />

      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MaterialNew"
        component={MaterialNew}
        options={({route, navigation}) => ({
          title: 'Form Material Masuk',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="MaterialReturn"
        component={MaterialReturn}
        options={({route, navigation}) => ({
          title: 'Form Material Return',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="MaterialKeluar"
        component={MaterialKeluar}
        options={({route, navigation}) => ({
          title: 'Form Material Keluar',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="MaterialReport"
        component={MaterialReport}
        options={({route, navigation}) => ({
          title: 'Report Data Material',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="MaterialReportDetail"
        component={MaterialReportDetail}
        options={({route, navigation}) => ({
          title: 'Report Data Material',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Search2"
        component={Search2}
        options={({route, navigation}) => ({
          title: 'Layanan',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Kategori"
        component={Kategori}
        options={({route, navigation}) => ({
          title: 'Detail Pembantu',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Cart"
        component={Cart}
        options={({route, navigation}) => ({
          title: 'Keranjang',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={({route, navigation}) => ({
          title: 'Checkout',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Bayar"
        component={Bayar}
        options={({route, navigation}) => ({
          title: 'PEMBAYARAN VIA TRANSFER',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Artikel"
        component={Artikel}
        options={({route, navigation}) => ({
          title: 'ARTIKEL',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Bayar2"
        component={Bayar2}
        options={({route, navigation}) => ({
          title: 'PEMBAYARAN VIA COD',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Barang"
        component={Barang}
        options={({route, navigation}) => ({
          title: 'Detail Barang',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="BarangPemakaian"
        component={BarangPemakaian}
        options={({route, navigation}) => ({
          title: 'Detail Barang',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Akses"
        component={Akses}
        options={({route, navigation}) => ({
          title: 'Masukan Kode Akses',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Tambah"
        component={Tambah}
        options={({route, navigation}) => ({
          title: 'TAMBAH',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="ListDetail"
        component={ListDetail}
        options={({route, navigation}) => ({
          title: 'LIST DETAIL',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
