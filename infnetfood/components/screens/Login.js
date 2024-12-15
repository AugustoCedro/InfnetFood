import React, {useState,useEffect} from "react";
import { Text, View,TextInput,StyleSheet,TouchableOpacity,Button} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [email,setEmail] = useState("");
  const [emailError,setEmailError] = useState(false);
  const [emailIsValid,setEmailIsValid] = useState(false);
  const [passwordIsValid,setPasswordIsValid] = useState(false);
  const [passwordError,setPasswordError] = useState(false);
  const [password,setPassword] = useState("");
  const [isVisible,setIsVisible] = useState(false);

  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    }catch (error) {
      alert("Erro ao salvar dados:", error);
    }
  };

  useEffect(() => {
    const emailLocation = email.indexOf("@");
    if(emailLocation == -1 && email != ""){
      setEmailError(true);
    }
    else if(email == ""){
      setEmailError(false);
    }
    else{
      setEmailError(false);
      setEmailIsValid(true);
    }

    if(password.length < 3){
      setPasswordError(true);
    }
    else{
      setPasswordError(false);
      setPasswordIsValid(true);
    }
    if(password == ""){
      setPasswordError(false);
    }
  },[email,password])



  const handleValidation = () => {
    if(email == ""){
      setEmailError(true);
    }
    if(password == ""){
      setPasswordError(true);
    } 

    if(emailIsValid && passwordIsValid){
      saveData("user",{email:email,password:password})
      navigation.navigate('Voltar')
    }

  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerCard}>
        <View style={styles.field}>
          <Text style={styles.fieldText}>Email :</Text>
          <TextInput 
            keyboardType={"email-address"}
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
        </View>
        {emailError && (<Text style={styles.errorMsg}>Formato de Email Inválido</Text>)}
        <View style={styles.field}>
          <Text style={styles.fieldText}>Senha :</Text>
          <TextInput 
            secureTextEntry = {!isVisible}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
          />
          <TouchableOpacity onPress={toggleVisibility}>
            {!isVisible ? (<Ionicons name={"eye-off-outline"} size={25} color="black" />) : (<Ionicons name={"eye-outline"} size={25} color="black" />)}
          </TouchableOpacity>
        </View>
        {passwordError && (<Text style={styles.errorMsg}>Senha dever conter 3 caracteres ou mais </Text>)}
        <TouchableOpacity style={styles.button} onPress={handleValidation}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
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
  containerCard:{
    width:"80%",
    height:250,
    borderWidth:1,
    borderRadius:10,
    justifyContent:"center",
    paddingLeft:15,
    paddingRight:15,
    gap:5,
   
  },
  field:{
    width:"80%",
    flexDirection:"row",
    alignItems:"center",
    alignSelf:"flex-start",
    gap:5
  },
  fieldText:{
    fontSize:18,
    width:60,
  },  
  input:{
    borderWidth:1,
    padding:3,
    width:"80%",
    fontSize:18,
  },
  errorMsg:{
    fontSize:14,
    color:"red",
    fontWeight:"bold",
    alignSelf:"center"
  },
  button:{
    marginTop:10,
    backgroundColor:"red",
    padding:10,
    borderRadius:5,
    alignSelf:"center",
  },
  buttonText:{
    color:"white",
    fontSize:18,
    
  }
});