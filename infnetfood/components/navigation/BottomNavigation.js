import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Profile from "../screens/Profile";
import Home from "../screens/Home";
import Restaurant from "../screens/Restaurant";
import Orders from "../screens/Orders";
import Config from "../screens/Config"
import {useTheme} from "../../contexts/ThemeContext";

const Tab = createBottomTabNavigator();
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function BottomNavigation() {
  const {selectedTheme} = useTheme();

  return (
    <Tab.Navigator 
      initialRouteName="Produtos"
      screenOptions={({ route }) => ({
        tabBarIcon: ({size }) => {
          let iconName;
          if (route.name === 'Produtos') {
            iconName = 'fast-food-outline';
          }
            else if (route.name === 'Perfil') {
            iconName = 'person';
          } else if (route.name === 'Produtos') {
            iconName = 'fast-food-outline';
          } else if (route.name === 'Pedidos') {
            iconName = 'bag-outline';
          } else if (route.name === 'Restaurantes'){
            iconName = 'home-outline';
          }else if (route.name === 'Configurações'){
            iconName = 'cog-outline';
          }
          return <Ionicons name={iconName} size={size} color={"orange"} />;
        },
        tabBarActiveTintColor: 'orange', // Cor dos ícones e texto da aba ativa
        tabBarInactiveTintColor:selectedTheme.color,
        headerShown: false,
        tabBarStyle: {backgroundColor: selectedTheme.backgroundColor}
      })}
    >
      <Tab.Screen name="Perfil" component={Profile} />
      <Tab.Screen name="Produtos" component={Home} />
      <Tab.Screen name="Pedidos" component={Orders} />
      <Tab.Screen name="Restaurantes" component={Restaurant} />
      <Tab.Screen name="Configurações" component={Config} />

  
    </Tab.Navigator>
  );
}