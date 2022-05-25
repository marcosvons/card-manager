import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import {stylesCard} from '../Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import DetalleModal from '../Components/DetalleModal';

export default class RecycleBin extends Component {
    constructor (props){
      super(props);
        this.state={
            cardsPapelera:[],
            showModal: false,
            selectedItem: null,
            importedUsers: []
        }
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
     
      componentDidMount(){
          this.getRecycleBin()
          .then(()=>{
            console.log(this.state.cardsPapelera)
          })
      }
    
      
      deleteCardCompletely(key){
        let cardsRestantes=this.state.cardsPapelera.filter((card)=>{
          return card.login.uuid !== key;
        })
        this.storeRecycleBin(cardsRestantes)
        this.getRecycleBin()
    
       }
    
       async storeRecycleBin(cardPapelera){
        try{
          const jsonContacts = JSON.stringify(cardPapelera)
          await AsyncStorage.setItem('RecycleBin', jsonContacts)
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

      async storeContactsObject(cardsImportadas){
        try{
          const jsonContacts = JSON.stringify(cardsImportadas)
          await AsyncStorage.setItem('@ContactsInfo', jsonContacts)
        }catch(error){
          console.log(error)
        }
      }

      async restaurarTarjetas(){
        await this.getContactsObject()
        var nuevoArrayUsuariosRestaurados = [...this.state.importedUsers, ... this.state.cardsPapelera]
        this.storeContactsObject(nuevoArrayUsuariosRestaurados)
        this.setState({cardsPapelera: []})
        this.storeRecycleBin(this.state.cardsPapelera)
      }

    
       renderItem = ({item}) => {
         return (
          <View style={stylesCard.estiloTarjeta}>
            <View style={{display:'flex', flexDirection: 'row', justifyContent:'flex-end', marginBottom: 5}}>
              <TouchableOpacity  onPress={() => this.deleteCardCompletely(item.login.uuid)}
                style={stylesCard.estiloTouchable}>
                <Text style={{color: 'white', fontSize: 20, padding: 5}}>X</Text>
              </TouchableOpacity>
            </View>
            <Image source={{uri: item.picture.large}} style={stylesCard.estiloImagen} />
            <Text style={stylesCard.estiloTexto}>{item.name.first} {item.name.last}</Text>   
            <Text style={stylesCard.estiloTexto}>{item.email}</Text>
            <Text style={stylesCard.estiloTexto}>{item.dob.date.substr(0,10)} - ({item.dob.age})</Text>
            <View style={stylesCard.viewButtons}>
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
              <View>
                <TouchableOpacity onPress={()=>this.restaurarTarjetas()}
                  style={stylesCard.estiloTouchable}>
                  <Text style={{color: 'grey',fontSize: 25,alignSelf: 'center'}}>Restaurar todas las tarjetas</Text>
                </TouchableOpacity>
              </View>
              <FlatList 
                data={this.state.cardsPapelera}
                keyExtractor= {this.keyExtractor}
                renderItem = {this.renderItem}
              />
            </View>  
        );
      }
    
    }