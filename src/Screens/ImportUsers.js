import React, { Component } from 'react';
import { getCardsInfo } from '../api/RandomUsers';
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import {stylesCard} from '../Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import DetalleModal from '../Components/DetalleModal';


export default class ImportUsers extends Component {
  constructor (props){
    super(props);
      this.state={
        users: [],
        importedUsers: [],
        seleccion: [],
        showModal: false,
        selectedItem: null,
        numberContacts: 3,
      }
  }

  componentDidMount(){
    this.getContactsObject();
  }

  fetchApi(number){
    console.log(number)
    getCardsInfo(number)
    .then((cardsInfo)=>{
      this.setState({users: cardsInfo})
    })
  }
 
  async storeContactsObject(cardsImportadas){
    try{
      const jsonContacts = JSON.stringify(cardsImportadas)
      await AsyncStorage.setItem('@ContactsInfo', jsonContacts)
    }catch(error){
      console.log(error)
    }
  }

  async getContactsObject(){
    try{
      const jsonContacts = await AsyncStorage.getItem('@ContactsInfo')
      if (jsonContacts !== null){
        this.setState({importedUsers: JSON.parse(jsonContacts)})
      }
    }catch (error){
      console.log(error)
    }
  }

async importCard(key){
  var nuevoArrayUsuariosImportados=[]
    await this.getContactsObject() 
    var cardImportada=this.state.users.filter((card)=>{
      return card.login.uuid === key;
    })
    var nuevoArrayUsuariosImportados = [...this.state.importedUsers, ... cardImportada]
    await this.storeContactsObject(nuevoArrayUsuariosImportados)
    let cardsRestantes=this.state.users.filter((card)=>{
      return card.login.uuid !== key;
    })
    this.setState({users: cardsRestantes }) 
}

onClose(){
  this.setState({showModal: !this.state.showModal})
 }

 showModal(item){
   this.setState({selectedItem: item, showModal: true})
 }

   renderItem = ({item}) => {
      return (
         
        <View style={stylesCard.estiloTarjeta}>
            <Image source={{uri: item.picture.large}} style={stylesCard.estiloImagen} />
            <Text style={stylesCard.estiloTexto}>{item.name.first} {item.name.last}</Text>   
            <Text style={stylesCard.estiloTexto}>{item.email}</Text>
            <Text style={stylesCard.estiloTexto}>{item.dob.date.substr(0,10) } - ({item.dob.age})</Text>
            <View style={stylesCard.viewButtons2}>
            <TouchableOpacity onPress={() => this.showModal(item)}
              style={stylesCard.estiloTouchable}>
              <Text style={stylesCard.estiloButton}>Ver detalle</Text>
            </TouchableOpacity>
            <DetalleModal showModal={this.state.showModal} 
              onClose={this.onClose.bind(this)}
              value={this.state.selectedItem} />

            <TouchableOpacity onPress={()=> this.importCard(item.login.uuid)}
              style={stylesCard.estiloTouchable}>
              <Text style={stylesCard.estiloButton}>Importar</Text>
            </TouchableOpacity>
            </View>
        </View>
      

      
      )
    }

    keyExtractor = (item) => item.login.uuid.toString()

  render(){
    return (

      <View>
        <View>
          <Text style={{fontSize: 25, alignSelf: 'center'}}>Cantidad tarjetas </Text>
          <TextInput style={stylesCard.estiloTextInput}
            keyboardType='numeric'
            onChangeText={(number)=>{this.setState({numberContacts: number})}}></TextInput>
          <View style={{alignContent:'center'}}>
            <TouchableOpacity style={{borderStyle:'solid', borderWidth:2, borderColor:'black', borderRadius: 10, margin:5}}
              onPress={()=> this.fetchApi(this.state.numberContacts)}>
              <Text style={{padding: 5, fontSize: 15, alignSelf:'center'}}>Fetch</Text>
            </TouchableOpacity>
          </View>
        </View>
          <FlatList 
            data={this.state.users}
            keyExtractor= {this.keyExtractor}
            renderItem = {this.renderItem}
          />
        </View>  

    );
  }

}