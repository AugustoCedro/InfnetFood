import React, {useState,useEffect} from "react";
import { Text, View, StyleSheet,Image,TouchableOpacity,ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from "../../contexts/ThemeContext";


const products = [
  [
    {
      name: "Coca-Cola",
      price: "5.00",
      url:require('../../assets/products/drinks/coca-cola.png')
    },
    {
      name: "Água Mineral",
      price: "2.00",
      url:require('../../assets/products/drinks/agua-mineral.png')
    },
    {
      name: "Refrigerante Guaraná Antártica",
      price: "4.50",
      url:require('../../assets/products/drinks/refrigerante-guarana.png')
    },
    {
      name: "Suco de Laranja",
      price: "6.00",
      url:require('../../assets/products/drinks/suco-laranja.png')
    },
    {
      name: "Monster Energy",
      price: "10.00",
      url:require('../../assets/products/drinks/energetico-monster.png')
    },
    {
      name: "Água de Coco",
      price: "4.00",
      url:require('../../assets/products/drinks/agua-de-coco.png')
    },
    {
      name: "Ice tea Limão",
      price: "5.50",
      url:require('../../assets/products/drinks/ice-tea-limao.png')
    },
    {
      name: "Refrigerante Sprite",
      price: "4.00",
      url:require('../../assets/products/drinks/refrigerante-sprite.png')
    },
    {
      name: "Gatorade Morango com Maracujá",
      price: "7.00",
      url:require('../../assets/products/drinks/isotonico-gatorade.png')
    },
    {
      name: "Powerade Laranja",
      price: "8.00",
      url:require('../../assets/products/drinks/isotonico-powerade.png')
    }
  ],
  [
    { name: "Cheeseburger", price: "12.99", url:require('../../assets/products/snacks/Cheeseburger.png')  },
    { name: "Pizza Calabresa", price: "24.50", url:require('../../assets/products/snacks/pizza-calabresa.png') },
    { name: "Cachorro Quente", price: "8.90", url:require('../../assets/products/snacks/cachorro-quente.png') },
    { name: "Batata Frita", price: "7.00", url:require('../../assets/products/snacks/batata-frita.png') },
    { name: "Milkshake de Chocolate", price: "10.50", url:require('../../assets/products/snacks/milkshake-chocolate.png') },
    { name: "Coxinha", price: "5.00", url:require('../../assets/products/snacks/coxinha.png') },
    { name: "Sanduíche Natural", price: "9.50", url:require('../../assets/products/snacks/sanduiche-natural.png') },
    { name: "Pastel", price: "6.50", url:require('../../assets/products/snacks/pastel.png')},
    { name: "Açaí na Tigela", price: "15.00", url:require('../../assets/products/snacks/acai.png') },
    { name: "Pão de Queijo", price: "3.50", url:require('../../assets/products/snacks/pao-de-queijo.png') }
  ],
  [
    { 
      name: "Torta de Limão", 
      price: "12.00", 
      url:require('../../assets/products/desserts/torta-de-limao.png')
    },
    { 
      name: "Pudim", 
      price: "8.50", 
      url:require('../../assets/products/desserts/pudim.png')
    },
    { 
      name: "Brownie de Chocolate", 
      price: "15.00", 
      url:require('../../assets/products/desserts/brownie.png')
    },
    { 
      name: "Mousse de Maracujá", 
      price: "10.00", 
      url:require('../../assets/products/desserts/mousse.png')
    },
    { 
      name: "Gelatina de Morango", 
      price: "5.00", 
      url:require('../../assets/products/desserts/gelatina.png')
    },
    { 
      name: "Brigadeiro", 
      price: "3.00", 
      url:require('../../assets/products/desserts/brigadeiro.png')
    }
  ]
]
 
export default function Products({category,addToCart}) {
  const [tempCart,setTempCart] = useState([]);
  const {selectedTheme} = useTheme();


  const addToTempCart = (product) => {
    setTempCart((prevList) => [...prevList,product])

    addToCart(product);
  }

  return (
    <View style={styles.container}>
        <View style={styles.productsContainer}>
          {products[category].map((product,index)=>{
            return(
              <View key={index} 
              style={[styles.productCard,{backgroundColor:selectedTheme.card,borderColor:selectedTheme.cardBorder}]}>
                <TouchableOpacity>
                  <Image
                    source={product.url}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                {
                  !tempCart.includes(product) ?
                  (
                    <TouchableOpacity style={styles.purchaseButton} onPress={() => addToTempCart(product)} >
                      <Ionicons name={"cart"} size={30} color="white" />
                      <Text style={styles.purchaseButtonText}>Adicionar</Text>
                    </TouchableOpacity>
                  ) : 
                  (
                    <TouchableOpacity style={styles.purchasedButton}>
                      <Text style={styles.purchaseButtonText}>Adicionado</Text>
                      <Ionicons name={"checkmark-outline"} size={30} color="white" />
                    </TouchableOpacity>
                  )

                }
                <View style={[styles.productDetails,{borderTopColor:selectedTheme.cardBorder,borderTopWidth:1}]}>
                  <Text style={[styles.productName,{color:selectedTheme.color}]}>{product.name}</Text>
                  <Text style={[styles.productPrice,{color:selectedTheme.price}]}>R$ {product.price.replace('.',',')}</Text>
                </View>
              </View>
            )
          })}
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 25
  },
  productsContainer:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"center",
    gap:"10"
  },
  productCard:{
    width:"45%",
    alignItems:"center",
    borderWidth:1,
    borderRadius:15
  },
  image:{
    width:180,
    height:200,
  },
  purchaseButton:{
    backgroundColor:"orange",
    width:"95%",
    padding:2,
    borderRadius:25,
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
    marginBottom:10
  },
  purchaseButtonText:{
    color:"white",
    fontSize:22,
    padding:5
  },
  productDetails:{
    width:"100%",
  },
  productName:{
    fontSize:20,
    alignSelf:"left",
    height:50,
    marginTop:5,
    marginLeft:6
  },
  productPrice:{
    fontSize:24,
    alignSelf:"left",
    marginBottom:5,
    marginTop:5,
    marginLeft:6
  },
  purchasedButton:{
    backgroundColor:"green",
    width:"95%",
    padding:2,
    borderRadius:25,
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
    marginBottom:10
  }

});














