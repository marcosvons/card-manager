import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import {stylesCard} from '../Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import DetalleModal from '../Components/DetalleModal';

export default class ImportedUsers extends Component {
  constructor (props){
    super(props);
      this.state={
          importedUser:[],
          showModal: false,
          selectedItem: null,
          cardsPapelera: []
      }
  }

  async getContactsObject(){
    try{
      const jsonContacts = await AsyncStorage.getItem('@ContactsInfo')
      this.setState({importedUser: JSON.parse(jsonContacts)})
    }catch (error){
      console.log(error)
    }
  }
 
  componentDidMount(){
      this.getContactsObject()
      .then(()=>{
        console.log(this.state.importedUser)
      })
  }

  async getRecycleBin(){
    try{
      const jsonContacts = await AsyncStorage.getItem('RecycleBin')
      if (jsonContacts !== null){
      this.setState({cardsPapelera: JSON.parse(jsonContacts)})
      }
    }catch (error){
      console.log(error)
    }
  }

  
  async deleteImportedCard(key){
    let cardsRestantes=this.state.importedUser.filter((card)=>{
      return card.login.uuid !== key;
    })
    await this.storeContactsObject(cardsRestantes)
    await this.getRecycleBin()
    let cardPapelera=this.state.importedUser.filter((card)=>{
      return card.login.uuid === key;
    })
    var nuevoArrayUsuariosEliminados = [...this.state.cardsPapelera, ... cardPapelera]
    this.storeRecycleBin(nuevoArrayUsuariosEliminados)
    this.getContactsObject() 
   }

   async storeRecycleBin(cardPapelera){
    try{
      const jsonContacts = JSON.stringify(cardPapelera)
      await AsyncStorage.setItem('RecycleBin', jsonContacts)
    }catch(error){
      console.log(error)
    }
  }

   async storeContactsObject(cardImportada){
    try{
      const jsonContacts = JSON.stringify(cardImportada)
      await AsyncStorage.setItem('@ContactsInfo', jsonContacts)
    }catch(error){
      console.log(error)
    }
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
        <View style={{display:'flex', flexDirection: 'row', justifyContent:'flex-end', marginBottom: 5}}>
          <TouchableOpacity  onPress={() => this.deleteImportedCard(item.login.uuid)} style={stylesCard.estiloTouchable}>
            <Text style={{color: 'white', fontSize: 20, padding: 5}}>X</Text>
          </TouchableOpacity>
        </View>
        <Image source={{uri: item.picture.large}} style={stylesCard.estiloImagen} />
        <Text style={stylesCard.estiloTexto}>{item.name.first} {item.name.last}</Text> 
        <Text style={stylesCard.estiloTexto}>{item.email}</Text>
        <Text style={stylesCard.estiloTexto}>{item.dob.date.substr(0,10)} - ({item.dob.age})</Text>
        <View style={{display:'flex', flexDirection: 'row', justifyContent:'flex-start', marginTop: 15}}>
        <TouchableOpacity onPress={() => this.showModal(item)}
          style={stylesCard.estiloTouchable}>
          <Text style={stylesCard.estiloButton}>Ver detalle</Text>
        </TouchableOpacity>
        </View>
        
        <DetalleModal showModal={this.state.showModal} 
          onClose={this.onClose.bind(this)}
          value={this.state.selectedItem} />

      </View>
     )
   }

  keyExtractor = (item) => item.login.uuid.toString()

  render(){
    return (

        <View>
          <FlatList 
            data={this.state.importedUser}
            keyExtractor= {this.keyExtractor}
            renderItem = {this.renderItem}
          />
        </View>  
    );
  }

}