import { useState } from 'react';
import {
  View, Text, Switch, StyleSheet, FlatList,Image,ImageBackground
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { logo } from '@/assets/icons/index';

function Notifications() {
  const [isAllEnabled, setIsAllEnabled] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => ( setIsEnabled(previousState => !previousState));

  const toggleAllSwitch = () => (toggleSwitch(), setIsAllEnabled(previousState => !previousState));
  
  const notifications = ["Permitir notificaciones flotantes", "Permitir sonido de reproducción", "Permitir vibración", "Recordatorio de beber agua", "Sugerencias snack saludable"]
  return (
    <View>
      <View
        style={style.allNotifications}
      >
        <Text style={style.textAllNotifications}> Mostrar notificaciones</Text>

        <Switch
          trackColor={{ false: '#767577', true: '#09A4B7' }}
          thumbColor={isEnabled ? '#E1F4EF' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleAllSwitch}
          value={isAllEnabled}
        />
      </View>
      <  FlatList
        keyExtractor={item => item}
        data={notifications}
        style={style.container}
        renderItem={({ item }) => (
          <View style={style.notificationsContainer}>
            <Text
            style={style.textNotifications}
            > {item}</Text>
            <Switch
             trackColor={{ false: '#767577', true: '#09A4B7' }}
             thumbColor={isEnabled ? '#E1F4EF' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isAllEnabled==false?isEnabled:isAllEnabled}
            />
          </View>
        )}
      />
                
      <View style={style.containerTextLogo} >
        <Text style={style.text}> ¡Es muy importante que actives las notificaciones! De esta manera recibirás recordatorios cuando sea necesario
          tomar un Paréntesis.</Text>
          <Image style={style.logo} source={logo} resizeMode="contain" />
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  allNotifications: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginHorizontal: 8,
    paddingBottom: 15
  
  },
  textAllNotifications:{
    fontSize: 16, 
    fontWeight:"500",  
  },
  textNotifications:{
    fontSize: 14,   
    fontWeight:"500",  

  },
  container: {
    width: "100%",    
    //backgroundColor: 'red',

  },
  notificationsContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
    margin: 5
  },
  containerTextLogo:{
    flexDirection: "column",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginTop: 20
  },
  text:{
    textAlign: 'center',
    fontSize: 14,   
    fontWeight:"500",  
    backgroundColor:"#E1F4EF",
    paddingVertical:10,
    paddingHorizontal:25,
    borderRadius:10,
    borderColor:"#09A4B7",
    borderWidth:1
  } ,
  logo: {
    width: 100,
    height: 60,
    marginTop: 20,
alignSelf: "flex-end",
  },
 

});

export default Notifications;