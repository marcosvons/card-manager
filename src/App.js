import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ImportUsers from './Screens/ImportUsers'
import ImportedUsers from './Screens/ImportedUsers'
import Menu from './Components/Menu'
import SearchEditCards from './Screens/SearchEditCards';
import RecycleBin from './Screens/RecycleBin';
import AboutUs from './Screens/AboutUs'

const Stack = createStackNavigator();

export default class App extends Component {
  constructor (props){
    super(props);
      this.state={

      }
  }

  render(){
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Menu' component={Menu} options={{title: 'Menu'}} ></Stack.Screen>
        <Stack.Screen name='ImportUsers' component={ImportUsers} options={{title: 'Seleccione las tarjetas a importar'}} ></Stack.Screen>
        <Stack.Screen name='ImportedUsers' component={ImportedUsers} options={{title: 'Tarjetas importadas'}} ></Stack.Screen>
        <Stack.Screen name='EditCards' component={SearchEditCards} options={{title: 'Buscar / Editar tarjetas'}} ></Stack.Screen>
        <Stack.Screen name='RecycleBin' component={RecycleBin} options={{title: 'Papelera de Reciclaje'}} ></Stack.Screen>
        <Stack.Screen name='AboutUs' component={AboutUs} options={{title: 'AboutUs'}} ></Stack.Screen> 
      </Stack.Navigator>
      </NavigationContainer>
    );
  }

}

