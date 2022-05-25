import React, {Component} from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import {stylesMenu} from '../Styles'

export default class Menu extends Component{
    constructor (){
        super();
            this.state={

            }
    }

    render(){
        return(
            <View style={stylesMenu.estiloMenu}>
                <TouchableOpacity style={stylesMenu.estiloTexto} onPress={() => this.props.navigation.navigate('ImportUsers')}><Text>Importar tarjetas</Text></TouchableOpacity>
                <TouchableOpacity style={stylesMenu.estiloTexto} onPress={() => this.props.navigation.navigate('ImportedUsers')}><Text>Tarjetas importadas</Text></TouchableOpacity>
                <TouchableOpacity style={stylesMenu.estiloTexto} onPress={() => this.props.navigation.navigate('EditCards')} ><Text>Buscar / Editar tarjetas</Text></TouchableOpacity>
                <TouchableOpacity style={stylesMenu.estiloTexto} onPress={() => this.props.navigation.navigate('RecycleBin')} ><Text>Papelera de Reciclaje</Text></TouchableOpacity>
                <TouchableOpacity style={stylesMenu.estiloTexto} onPress={() => this.props.navigation.navigate('AboutUs')}><Text>Acerca de</Text></TouchableOpacity>
            </View>
        );
    }
}