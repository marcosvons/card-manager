import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class AboutUs extends Component{
    render(){
        return(
            <View style={{display:'flex', flexWrap:'wrap', flexDirection: 'column', justifyContent: 'space-around', alignContent: 'center', alignItems:'center', }}>
                <Text style={{fontSize: 25,alignSelf: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: 'black', borderRadius: 10, alignSelf: 'center', width: 300, marginVertical:10, padding: 5}}>Marcos von Stremayr</Text>
                <Text style={{fontSize: 25,alignSelf: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: 'black', borderRadius: 10, alignSelf: 'center', width: 300,  marginVertical:10, padding: 5}}>Michael Dunn</Text>
                <Text style={{fontSize: 25,alignSelf: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: 'black', borderRadius: 10, alignSelf: 'center', width: 300,  marginVertical:10, padding: 5}}>Timoteo Karl</Text>
            </View>
        )
    }
}