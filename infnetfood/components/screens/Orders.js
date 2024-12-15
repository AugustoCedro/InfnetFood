import React, {useState,useEffect} from "react";
import { Text, View, StyleSheet,TouchableOpacity,Image,FlatList,ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {useTheme} from "../../contexts/ThemeContext";

export default function Orders() {
  const {selectedTheme} = useTheme();
  
  const navigation = useNavigation();
 
  const orders = [
    {
      id:1,
      products:[
        { name:"Coca-Cola",
          quantity:2,
          price:"5.00"
        },
         {name:"Água Mineral",
          quantity:6,
          price:"5.00"
        },
      ]

    },
    {
      id:2,
      products:[
         { name: "Cheeseburger", price: "12.99",  quantity:4 },
          { name: "Pizza Calabresa", price: "24.50",quantity:5  },
          { name: "Cachorro Quente", price: "8.90", quantity:3 },
          { name: "Batata Frita", price: "7.00", quantity:2 },
      ]

    },
    {
      id:3,
      products:[
        { name: "Brigadeiro", 
          price: "3.00", 
          quantity:2
        },
        { 
          name: "Mousse de Maracujá", 
          price: "10.00", 
          quantity:1
        },
        {
          name: "Gatorade Morango com Maracujá",
          price: "7.00",
          quantity:4
        },
      ]

    },
    {
      id:4,
      products:[
        { name: "Pastel", price: "6.50", quantity:2},
        { name: "Açaí na Tigela", price: "15.00", quantity:1 },
        { name: "Pão de Queijo", price: "3.50", quantity:10 }
      ]

    }
  ]


  const handleCheckout = (order) => {
    navigation.navigate('Checkout',{order})
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



const renderOrder = ({ item: order }) => {
  return (
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
    </View>
  );
};

 
  return (
    <View>
      <ScrollView style={{marginTop:50,backgroundColor:selectedTheme.backgroundColor}}>
      <View style={[styles.container,{backgroundColor:selectedTheme.backgroundColor}]}>
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={item => item.id}   
          style={{width:"100%"}}   
      />
      </View>

      </ScrollView>
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
    alignItems:"center"
  },
  checkoutButton:{
    backgroundColor:"orange",
    flexDirection:"row",
    width:"37%",
    alignItems:"center",
    alignSelf:"center",
    borderRadius:20,
    padding:10
  }
});






