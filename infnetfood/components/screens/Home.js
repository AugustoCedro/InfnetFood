import React, {useState,useEffect} from "react";
import { Text, View, StyleSheet,TouchableOpacity,FlatList,ScrollView} from 'react-native';
import {useTheme} from "../../contexts/ThemeContext";


import Ionicons from 'react-native-vector-icons/Ionicons';
import Products from "./Products";

const categories = [
  {
    id:0,
    name:"Bebidas"
  },
  {
    id:1,
    name:"Lanches"
  },
  {
    id:2,
    name:"Sobremesas"
  }
]

export default function Home({navigation}) {
  const {selectedTheme} = useTheme();
  const[selectedCategory,setSelectedCategory] = useState(0);
  const [cart,setCart] = useState([]);

  const addToCart = (product) => {
    if(cart.includes(product)){
     
    }else{
      setCart((prevCart) => [...prevCart,product]);
    }
  }

  const handleCategory = (category) => {
    setSelectedCategory(category.id);
  }


  return (
    <View style={{backgroundColor:selectedTheme.backgroundColor}}>
      <ScrollView  style={{marginTop:50}}>
      <View>
        <FlatList
          data={categories}
          renderItem={({item}) => 
          (
            <TouchableOpacity 
            style={[styles.categoryButton,selectedCategory === item.id && styles.isActive]} 
            onPress={() => handleCategory(item)}>
              <Text style={styles.categoryText}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          horizontal={true} 
          contentContainerStyle={styles.flatListContent}
        />
      </View>
      <Products category={selectedCategory} addToCart={addToCart}/>
      </ScrollView>
        <TouchableOpacity  onPress={() => navigation.navigate('Cart',{ cart })} style={styles.cart}>
          <Ionicons name={"cart"} size={50} color="white"  style={{alignSelf:"center"}}/>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#404040"
  },
  flatListContent:{
    width: '100%',
    justifyContent:"center",
    gap:5,
  },
  categoryButton:{
    borderWidth:1,
    borderColor:"orange",
    padding:10,
    borderRadius:30,
    backgroundColor:"orange",
    marginLeft:30
  },
  categoryText:{
    fontSize:16,
    color:"white",
    fontWeight:"bold"  
    },
  isActive:{
    backgroundColor:"#FF6D00",
    borderColor:"#FF6D00"
  },
  cart:{
    position: 'absolute',
    bottom: 20, 
    right: 20,  
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 40,
    alignItems:"center",
    justifyContent:"center"
  }
});






