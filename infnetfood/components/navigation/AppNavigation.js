import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from "../screens/Login";
import Cart from "../screens/Cart";
import Products from "../screens/Products";
import BottomNavigation from "./BottomNavigation";
import Checkout from "../screens/Checkout";
import Orders from "../screens/Orders";


const Stack = createStackNavigator();


export default function AppNavigator() {
 
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
      >
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ title: 'Login' },{headerShown: false}} 
        />
         <Stack.Screen 
          name="Voltar" 
          component={BottomNavigation} 
          options={{ title: 'Voltar' },{headerShown: false}} 
        />
        <Stack.Screen 
          name="Cart" 
          component={Cart} 
          options={{ title: 'Cart' }} 
        />
        <Stack.Screen 
          name="Products" 
          component={Products} 
          options={{ title: 'Products' }} 
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout} 
          options={{ title: 'Checkout' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
