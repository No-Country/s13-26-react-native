import { Tabs } from 'expo-router/tabs';
import { Octicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { Image } from 'react-native';

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleStyle: {
          fontFamily: 'montserrat_semibold',
          fontSize: 16,
        },
        headerStyle: { backgroundColor: '#D9D9D9' },
        tabBarStyle: { borderTopWidth: 1, borderTopColor: 'rgba(146, 153, 157, .3)' },
      }}
    >
      <Tabs.Screen
        name="homeScreen"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ focused }) => (
            <Feather name="home" size={26} color={focused ? 'black' : '#6F6E6E'} />
          ),
        }}
      />
      <Tabs.Screen
        name="statsScreen"
        options={{
          title: 'Historial',
          tabBarIcon: ({ focused }) => (
            <Feather name="award" size={25} color={focused ? 'black' : '#6F6E6E'} />
          ),
        }}
      />
      <Tabs.Screen
        name="settingsScreen"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ focused }) => (
            <Octicons name="gear" size={26} color={focused ? 'black' : '#6F6E6E'} />
          ),
        }}
      />
      <Tabs.Screen
        name="profileScreen"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => (
            <FontAwesome5 name="user" size={25} color={focused ? 'black' : '#6F6E6E'} />
          ),
        }}
      />
    </Tabs>
  );
}
