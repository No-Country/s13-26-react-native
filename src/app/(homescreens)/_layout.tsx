import { Tabs } from 'expo-router/tabs';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { Image } from 'react-native';
import logo from '../../assets/icons/logo.png';
export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleStyle: {
          fontFamily: 'montserrat_semibold',
          fontSize: 16,
        },
        headerTitle: (props) => (
          <Image style={{ width: 200, height: 27 }} source={logo} resizeMode="contain" />
        ),
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: { backgroundColor: '#C4EADF' },
        tabBarStyle: { borderTopWidth: 1, borderTopColor: 'rgba(193, 236, 219, .4)' },
      }}
    >
      <Tabs.Screen
        name="homeScreen"
        options={{
          title: 'Paréntesis',
          tabBarIcon: ({ focused }) => (
            <Feather name="home" size={26} color={focused ? '#F78764' : '#67397E'} />
          ),
        }}
      />
      <Tabs.Screen
        name="statsscreen"
        options={{
          title: 'Historial',
          tabBarIcon: ({ focused }) => (
            <Feather name="award" size={25} color={focused ? '#F78764' : '#67397E'} />
          ),
        }}
      />
      <Tabs.Screen
        name="settingsScreen"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ focused }) => (
            <Feather name="sliders" size={26} color={focused ? '#F78764' : '#67397E'} />
          ),
        }}
      />
      <Tabs.Screen
        name="profilescreen"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => (
            <FontAwesome5 name="user" size={25} color={focused ? '#F78764' : '#67397E'} />
          ),
        }}
      />
    </Tabs>
  );
}
