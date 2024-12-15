import React, {useState} from "react";
import { Text, View, StyleSheet,TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from "../../contexts/ThemeContext";

const profile = {
  name:"Augusto Cedro",
  email:"augusto.rajao@al.infnet.edu.br",
  password:"12345",
}

export default function Profile() {
  const {selectedTheme} = useTheme();
  const [isVisible,setIsVisible] = useState(false);
  const hidePassword = (password) => {
    if(!isVisible){
      let hiddenPassword = "";
      for(var i = 0; i < password.length; i++){
        hiddenPassword += "*"
      }
      return hiddenPassword
    }
    return password;
  }
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  }

  return (
    <View style={[styles.container,{backgroundColor:selectedTheme.backgroundColor}]}>
      <View style={[styles.card,{backgroundColor:selectedTheme.backgroundColor}]}>
        <Ionicons name={"person"} size={80} color="orange" style={{alignSelf:"center"}} />
        <Text style={[styles.text,{color:selectedTheme.color}]}>Nome: {profile.name}</Text>
        <Text style={[styles.text,{color:selectedTheme.color}]}>Email: {profile.email}</Text>
        <View style={{alignItems:"center",flexDirection:"row"}}>
          <Text style={[styles.text,{color:selectedTheme.color}]}>Senha: {hidePassword(profile.password)} </Text>
          <TouchableOpacity onPress={toggleVisibility}>
                    {!isVisible ? (<Ionicons name={"eye-off-outline"} size={25} color={selectedTheme.color} />) : (<Ionicons name={"eye-outline"} size={25} color={selectedTheme.color} />)}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );          
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    alignItems:"center",
    justifyContent:"center",
  },
  text:{
    fontSize:22,
    alignSelf:"flex-start",
    padding:5
  },
  card:{
    width:"70%"
  }
});






