import { Tabs } from 'expo-router/tabs';
import { Ionicons } from '@expo/vector-icons';

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="homeScreen"
        options={{
          title: 'Inicio',

          tabBarIcon: ({ focused }) => (
            <Ionicons name="home" size={24} color={focused ? 'black' : 'grey'} />
          ),
        }}
      />
      <Tabs.Screen
        name="statsScreen"
        options={{
          title: 'Metas',
          tabBarIcon: ({ focused }) => (
            <Ionicons name="golf" size={24} color={focused ? 'black' : 'grey'} />
          ),
        }}
      />
      <Tabs.Screen
        name="profilescreen"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => (
            <Ionicons name="person" size={24} color={focused ? 'black' : 'grey'} />
          ),
        }}
      />
    </Tabs>
  );
}