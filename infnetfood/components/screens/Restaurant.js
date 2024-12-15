import React, {useState,useEffect,useRef} from "react";
import { Text, View,StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
import MapView, {Marker}from 'react-native-maps';
import * as Location from "expo-location";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from "../../contexts/ThemeContext";

import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject
} from 'expo-location'

const restaurants = [
  { name:"Mané Centro",
    type:"Bar",
    description:"Serve ótimos coquetéis · Tem música ao vivo · Serve comida no bar",
    address:"R. Buenos Aires, 2 - Centro, Rio de Janeiro - RJ, 20070-022",
    coords:{
      latitude:-22.9022386,
      longitude:-43.177804
    }
  },
   { 
    name:"Porto Carioca Restaurante",
    type:"Restaurante brasileiro",
    description:"Buffet de saladas, pratos brasileiros e carnes, além de bebidas, em casinha antiga com mesas ao ar livre.",
    address:"R. do Rosário, 36 - Centro, Rio de Janeiro - RJ, 20041-000",
    coords:{
      latitude:-22.9014568,
      longitude:-43.1751741
    }
  },
   { 
    name:"Restaurante Santo Scenarium",
    type:"Restaurante",
    description:"Casarão reformado com decoração religiosa que serve caipirinhas e entradas com samba e choro ao vivo à noite.",
    address:"R. do Lavradio, 36 - Centro, Rio de Janeiro - RJ, 20230-070",
    coords:{
      latitude:-22.9099134,
      longitude:-43.183146
    }
  },
   { 
    name:"Cais do Oriente",
    type:"Restaurante brasileiro",
    description:"Restaurante com cardápio variado e sofisticado em antigo armazém com decoração simples e vigas expostas.",
    address:"R. Visc. de Itaboraí, 8 - Centro, Rio de Janeiro - RJ, 20010-060",
    coords:{
      latitude:-22.8990289,
      longitude:-43.1767639
    }
  },
   { 
     name:"Hachiko",
     type:"Restaurante japonês",
    description:"Uma fusão da culinária japonesa tradicional e sabores ocidentais modernos em charmoso sobrado estilo colonial.",
    address:"Tv. do Paço, 10 - Centro, Rio de Janeiro - RJ, 20010-170",
    coords:{
      latitude:-22.9042238,
      longitude:-43.1734756
    }
  },
   { name:"Lilia",
   type:"Restaurante",
    description:"Pratos criativos da culinária internacional em espaço rústico-contemporâneo com clima tranquilo e acolhedor.",
    address:"R. do Senado, 45 - Centro, Rio de Janeiro - RJ, 20231-005",
    coords:{
      latitude:-22.9092008,
      longitude:-43.184044
    }
  },
   { name:"Bistrô Ouvidor",
   type:"Bistrô",
    description:"Bistrô elegante que combina a culinária francesa com sabores brasileiros em opções gastronômicas exclusivas.",
    address:"R. do Ouvidor, 52 - Centro, Rio de Janeiro - RJ, 20040-030",
    coords:{
      latitude:-22.9030696,
      longitude:-43.1771215
    }
  },
   { name:"Galeto 183",
    type:"Restaurante brasileiro",
    description:"Bar tradicional da boemia carioca com grandes porções de carne grelhada acompanhadas de farofa e feijão.",
    address:"R. Santana, 183 - Centro, Rio de Janeiro - RJ, 20230-260",
    coords:{
      latitude:-22.9093949,
      longitude:-43.193513
    }
  },
   { name:"Giuseppe Italiano",
    type:"Restaurante italiano",
    description:"Restaurante italiano renomado com jardim e grande seleção de vinhos em uma praça característica do Rio.",
    address:"R. Sete de Setembro, 65 - Centro, Rio de Janeiro - RJ, 20050-005",
    coords:{
      latitude:-22.9049341,
      longitude:-43.1777668
    }
  },
   { name:"Restaurante Rio Minho",
   type:"Restaurante de frutos do mar",
    description:"Gastronomia consagrada de pescados à la carte, em ambiente familiar tradicional com mesas boêmias ao ar livre.",
    address:"R. do Ouvidor, 10 - Centro, Rio de Janeiro - RJ, 20010-150",
    coords:{
      latitude:-22.9016724,
      longitude:-43.1745305
    }
  },

]


export default function Restaurant() {
  const [location,setLocation] = useState(null)
  const [isClicked,setIsClicked] = useState(false);
  const scrollViewRef = useRef(null);
  const {selectedTheme} = useTheme();
  const [restaurantLocation, setRestaurantLocation] = useState({
    name: "",
    coords: {
      latitude: 0, 
      longitude: 0  
    }
  });

  async function mockLocation(){
    try{
      const mockLocation = {
        coords:{
          latitude: -22.907028,
          longitude: -43.181311
        }
      }
      setLocation(mockLocation);
    }catch(error){
      alert("Erro ao mockar localização")
    }
  }
  useEffect(() => {
      mockLocation();
    },[])

  const handleLocation = (restaurant) => {
    setIsClicked(true);
    if(restaurant.name != restaurantLocation.name){
      const selectedRestaurant = {
        name:restaurant.name,
        coords:{
          latitude:restaurant.coords.latitude,
          longitude:restaurant.coords.longitude
        }
      }
      setRestaurantLocation(selectedRestaurant)
    }
    scrollToElement();
  }
  const scrollToElement = () => {
    scrollViewRef.current.scrollTo({ y: 0}); 
  }

  useEffect(() => {
    if(restaurantLocation.name == ""){
      setIsClicked(false)
    }
  },[restaurantLocation])



  return (
      <View>
      <ScrollView  style={{marginTop:50,width:"100%",backgroundColor:selectedTheme.backgroundColor}} ref={scrollViewRef}>
      {
        location &&
        <MapView
          style={[styles.map,{borderColor:selectedTheme.cardBorder}]}
          initialRegion={{
            latitude:location.coords.latitude,
            longitude:location.coords.longitude,
            latitudeDelta:0.025,
            longitudeDelta:0.025
          }}
        >
        {!isClicked ? (
          restaurants.map((restaurant) => (
              <Marker
                coordinate={{
                  latitude: restaurant.coords.latitude,
                  longitude: restaurant.coords.longitude,
                }}
              />
            ))
          ) : (
            <Marker
              coordinate={{
                  latitude: restaurantLocation.coords.latitude,
                  longitude: restaurantLocation.coords.longitude,
                }}
            />
          )}
        </MapView>
      }
      {restaurants.map((restaurant) => {
        return(
          <View 
          style={[styles.restaurantCard,{backgroundColor:selectedTheme.card,borderColor:selectedTheme.cardBorder} ]}>
            <Text style={[styles.restaurantName,{color:selectedTheme.color}]}>{restaurant.name}</Text>
            <Text style={[styles.restaurantType,{color:selectedTheme.color}]}>{restaurant.type}{"\n"}</Text>
            <View style={[styles.restaurantDetails,{color:selectedTheme.color}]}>
              <Text style={[styles.restaurantDescription,{color:selectedTheme.color}]}>Descrição:{"\n"}{restaurant.description}</Text>
              <Text style={[styles.restaurantAddress,{color:selectedTheme.color}]}>Endereço:{"\n"}{restaurant.address}</Text>
              <TouchableOpacity style={styles.addressButton} onPress={() => handleLocation(restaurant)}>
                <Text style={styles.addressButtonText}>Ver localização no mapa </Text>
                <Ionicons name="flag-outline" size={25} color={"white"} />;
              </TouchableOpacity>
            </View>


          </View>
        )
      })}

      </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  map:{
    width:300,
    height:300,
    borderWidth:0.5,
    alignSelf:"center",
    marginTop:50

  },
  restaurantCard:{
    borderWidth:1,
    width:"90%",
    alignSelf:"center",
    marginTop:15
  },
  restaurantName:{
    alignSelf:"center",
    fontWeight:"bold",
    fontSize:20,
    marginTop:5
  },
  restaurantType:{
    fontSize:18,
    alignSelf:"center"

  },
  restaurantDetails:{
    alignSelf:"center",
    padding:10,
    gap:5
  },
   restaurantAddress:{
    fontSize:16,
  },
  restaurantDescription:{
    fontSize:16,
  },
  addressButton:{
    backgroundColor:"orange",
    flexDirection:"row",
    width:"80%",
    alignItems:"center",
    alignSelf:"center",
    borderRadius:20,
    padding:10
  },
  addressButtonText:{
    fontSize:16,
    color:"white",
    fontWeight:"bold"
  }
   
 
});



