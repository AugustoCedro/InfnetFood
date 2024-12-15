import React,{useState,useEffect} from "react";
import { Text, View,TouchableOpacity,StyleSheet,TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select'
import {useTheme} from "../../contexts/ThemeContext";

export default function Checkout({route}) {
  const {order} = route.params;
  const [address,setAddress] = useState("");
  const [addressError,setAddressError] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [methodError,setMethodError] = useState(false);
  const [isConfirmed,setIsConfirmed] = useState(false);
  const {selectedTheme} = useTheme();



  const submitButton = () => {
    let addressErrorL = false;
    let methodErrorL = false;
    
    if(address === ""){
        addressErrorL = true;
    }
    if(selectedMethod ===  null){
      methodErrorL = true
     
    }
     setAddressError(addressErrorL);
     setMethodError(methodErrorL);
    if(!addressErrorL && !methodErrorL){
      setIsConfirmed(true);
    }
  }


  const formatPrice = (item) => {
    let itemTotalPrice = item.price * item.quantity;
    let formattedPrice = itemTotalPrice.toFixed(2).replace('.', ',');

    return formattedPrice;
  }

  const formattedName = (name) => {
      if(name.length >= 20){
        newName = name.slice(0,20);
        newName += "...";
        return newName;
      }
      return name;
  }
  const calculateTotalPrice = (products) => {
    let total = 0;
    products.forEach((product) => {
      total += product.quantity * parseFloat(product.price);
    })
    return total.toFixed(2).replace(".",",");
};

  return (
    <View style={{backgroundColor:selectedTheme.backgroundColor,height:"100%"}}>
        <View style={[styles.orderCard,{backgroundColor:selectedTheme.card}]} key={order.id}>
      <Text style={[styles.orderText, { fontWeight: "bold", marginTop: 8,color:selectedTheme.color }]}>
        Pedido #{order.id}
      </Text>
      <View style={styles.orderCardDetails}>
        <Text style={[styles.orderText,{color:selectedTheme.color}]}>
          {order.products.length} Produto(s)
        </Text>
      </View>
      <View style={styles.orderProducts}>
        {order.products.map((item, index) => (
          <View key={index} style={{ flexDirection: "row", marginTop: 3 }}>
            <Text 
            style={{ alignSelf: "flex-start", alignItems: "center", fontSize: 16,color:selectedTheme.color }
            }>
              <Ionicons name={"ellipse"} size={8} color="orange" /> {item.quantity} -
            </Text>
            <Text style={{ fontSize: 16, color:selectedTheme.price}}> R$ {formatPrice(item)} - </Text>
            <Text style={{ fontSize: 16,color:selectedTheme.color }}>{formattedName(item.name)}</Text>
          </View>
        ))}
      </View>
      <View style={styles.totalPriceContainer}>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => handleCheckout(order)}>
          <Text style={{ fontSize: 18,alignSelf:"center",color:"white",fontWeight:"bold"}}>Checkout</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18,marginLeft:10,color:selectedTheme.color}}>
          Preço Final: R$ {calculateTotalPrice(order.products)}
        </Text>
      </View>
      <View style={styles.orderDetailsContainer}>
        <Text style={{fontSize:18,alignSelf:"center",marginTop:5,color:selectedTheme.color}}>Dados da Entrega</Text>
        <View>
          <Text style={{fontSize:16,color:selectedTheme.color}}>Endereço: </Text>
          <TextInput
            style={[styles.input,{color:selectedTheme.color}]}
            value={address}
            onChangeText={setAddress}
          />
          {addressError &&
            (
              <Text style={styles.errorMsg}>Endereço Inválido</Text>
            )

          }
          <Text style={{fontSize:16,marginTop:10,color:selectedTheme.color}}>Método de pagamento: </Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedMethod(value)}
            items={[
              { label: 'Débito', value: 'Débito' },
              { label: 'Crédito', value: 'Crédito' },
              { label: 'Pix', value: 'Pix' },
            ]}
            style={{
              inputAndroid: {
                borderColor: 'orange',
              },
              inputIOS: styles.input,
            }}
          />
          {methodError &&
            (
              <Text style={styles.errorMsg}>Método de pagamento inválido</Text>
            )

          }
        </View>
      </View>
      {
        !isConfirmed ? (
          <TouchableOpacity style={styles.confirmButton} onPress={submitButton}>
            <Text style={{alignSelf:"center",color:"white",fontSize:18,fontWeight:"bold"}}>Confirmar Pedido</Text>
          </TouchableOpacity>
        ) : 
        (
          <TouchableOpacity style={styles.confirmedButton} onPress={submitButton}>
            <Text style={{alignSelf:"center",color:"white",fontSize:18,fontWeight:"bold"}}>Confirmado</Text>
          </TouchableOpacity>
        )
      }
      
    </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    alignItems:"center",

  },
  orderCard:{
    borderWidth:1,
    width:"80%",
    borderColor:"orange",
    borderRadius:5,
    marginTop:15,
    alignSelf:"center"
  },
  orderText:{
    fontSize:20,
    alignSelf:"center",
    
  },
  orderCardDetails:{
    flexDirection:"row",
    justifyContent:"center"
  },
  orderProducts:{
    width:"90%",
    alignSelf:"center"
  },
  totalPriceContainer:{
    width:"90%",
    borderTopWidth:2,
    borderColor:"orange",
    alignSelf:"center",
    marginTop:10,
    padding:10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-end"
  },
  orderDetailsContainer:{
    width:"90%",
    borderTopWidth:2,
    borderColor:"orange",
    alignSelf:"center",
  },
  input:{
    borderWidth:1,
    padding:5,
    borderColor:"orange"
  },
  confirmButton:{
    backgroundColor:"orange",
    flexDirection:"row",
    width:"60%",
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"center",
    borderRadius:20,
    padding:10,
    marginTop:15,
    marginBottom:20
  },
  confirmedButton:{
    backgroundColor:"green",
    flexDirection:"row",
    width:"60%",
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"center",
    borderRadius:20,
    padding:10,
    marginTop:15,
    marginBottom:20
  },
    errorMsg:{
    fontSize:14,
    color:"red",
    fontWeight:"bold",
    alignSelf:"center"
  },
});


