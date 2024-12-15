import React,{useState} from "react";
import { Text,View, StyleSheet,Switch,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {useTheme} from "../../contexts/ThemeContext";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Config (){
  const [isEnabled, setIsEnabled] = useState(false);
  const { theme, toggleTheme,selectedTheme } = useTheme();
  const [isVisible,setIsVisible] = useState(false);

  const toggleSwitch = () => {
    toggleTheme();
    setIsEnabled(!isEnabled)
  }
  
  const toggleVisibility = () =>{
    if(isVisible){
      setIsVisible(false)
    }else{
      setIsVisible(true)
    }
  }

  return(
      <ScrollView style={[styles.container,{backgroundColor: selectedTheme.backgroundColor}]}>
        <View style={{justifyContent:"center",alignItems:"center"}}>  
          <View style={{flexDirection:"row",gap:10,paddingTop: 25}}>  
            <Ionicons name={theme === "light" ? "sunny-outline" : "sunny-sharp" } size={30} color={theme === "light" ? "black" : "white"} />
            <Switch
              trackColor={{false: 'gray', true: 'white'}}
              thumbColor={isEnabled ? 'black' : '#FCFCFC'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Ionicons name={theme === "light" ? "moon-outline" : "moon-sharp" } size={30} color={theme === "light" ? "black" : "white"} />
          </View>
        </View>       
      </ScrollView>  
 )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    marginTop:50

  },
});
