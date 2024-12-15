import React,{useState,useEffect} from "react"
import { Text, View, StyleSheet,Image,ScrollView,TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from "../../contexts/ThemeContext";

export default function Cart({route}) {
  const {cart} = route.params;
  const [quantities,setQuantities] = useState(cart.map(() => 1));
  const [isConfirmed,setIsConfirmed] = useState(false);
  const {selectedTheme} = useTheme();

  const increaseQuantity = (index) => {
    setQuantities((prevList) => {
      const list =[...prevList];
      list[index] += 1;
      return list;
      }
    )
  }
  
  const decreaseQuantity = (index) => {
    if(quantities[index] > 1){
      setQuantities((prevList) => {
            const list =[...prevList];
            list[index] -= 1;
            return list;
        }
      )
    }
  }
 
  const calculateTotalPrice = () => {
    let total = 0;
    cart.forEach((product, index) => {
      total += quantities[index] * parseFloat(product.price);
    });
    return total.toFixed(2).replace(".", ",");
  };

  const handleSubmit = () => {
    setIsConfirmed(true);
  }

return (
    <View styles={[styles.container,{backgroundColor:selectedTheme.backgroundColor}]}>
        <View style={{width:"100%",height:"100%",alignItems:"center",backgroundColor:selectedTheme.backgroundColor}}>
          <ScrollView style={{width:"100vw",alignItems:"center",maxHeight:680,marginTop:15}} >
        {cart.length != 0 ? (
          cart.map((item,index)=>{
            return(
              <View key={index} 
              style={[styles.productCard,{backgroundColor:selectedTheme.card,borderColor:selectedTheme.cardBorder}]}>
                <View>
                  <Image
                    source={item.url}
                    style={styles.image}
                    resizeMode="contain" 
                  />
                </View>
                <View style={styles.productDetails}>
                    <Text style={[styles.productName,{color:selectedTheme.color}]}>{item.name} </Text>
                    <Text style={[styles.productPrice,{color:selectedTheme.price}]}>
                      R$ {item.price.replace('.',',')}</Text>
                  <View style={[styles.quantityButton,{borderColor:selectedTheme.cardBorder}]}>
                   <TouchableOpacity onPress={() => decreaseQuantity(index)}>
                     <Ionicons name={"remove-outline"} size={40} color="orange" />
                    </TouchableOpacity>
                    <Text style={{fontSize:18,color:selectedTheme.color}}>{quantities[index]}</Text>
                    <TouchableOpacity onPress={() => increaseQuantity(index)}>
                      <Ionicons name={"add-outline"} size={40} color="orange"/>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
          })
        ) : (<Text style={{color:selectedTheme.color}}>Seu carrinho está vazio</Text>)}
        </ScrollView>
        {cart.length != 0 ? (
          <View style={styles.totalPriceContainer}>
            <Text style={[styles.totalPriceText,{color:selectedTheme.color}]}>Preço total: {calculateTotalPrice()}</Text>
            {!isConfirmed ? (
              <TouchableOpacity style={styles.orderButton} onPress={handleSubmit}>
                <Text style={styles.orderButtonText}>Confirmar pedido</Text>
              </TouchableOpacity>
            ) : 
            (
              <TouchableOpacity style={styles.orderedButton} onPress={handleSubmit}>
                <Text style={styles.orderButtonText}>Confirmado</Text>
              </TouchableOpacity>
            )}
            
          </View>) 
          : 
          (<></>)}
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
  productCard:{
    borderWidth:1,
    width:"80%",
    flexDirection:"row",
    marginBottom:10
  },
  productDetails:{
    flexDirection:"column",
    justifyContent:"space-evenly",
    width:192,
  },
  productName:{
    fontSize:22,
  },
  productPrice:{
    fontSize:20,
    color:"green"
  },
  quantityButton:{
    borderWidth:1,
    flexDirection:"row",
    alignItems:"center",
    width:100,
    gap:3,
    alignSelf:"flex-start",
    borderRadius:10,
  }
  ,
  image:{
    width:150,
    height:150,
  },
  totalPriceContainer:{
    width:"80%",
    borderTopWidth:2,
    borderColor:"orange"
  },
  totalPriceText:{
    alignSelf:"flex-end",
    fontSize:24,
    marginTop:5,
  },
  orderButton:{
    backgroundColor:"orange",
    padding:10,
    width:200,
    alignSelf:"flex-end",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:30,
    marginTop:10,
  },
  orderButtonText:{
    fontSize:20,
    color:"white",
    textAlign:"center",
    fontWeight:"bold"
  },
    orderedButton:{
    backgroundColor:"green",
    padding:10,
    width:200,
    alignSelf:"flex-end",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:30,
    marginTop:10,
  },
});


