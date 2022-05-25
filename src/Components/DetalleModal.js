import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Modal } from 'react-native';
import {stylesModal, stylesCard} from '../Styles'

export default class DetalleModal extends Component {
    
    render(){
        return(
            <Modal visible={this.props.showModal}
            transparent={true}
            animationType='fade'>
            <View style={stylesModal.modalContainer}>
                <View style={stylesModal.estiloModal}>
                    <TouchableOpacity style={stylesCard.estiloTouchable}
                        onPress={this.props.onClose.bind(this) }>
                            <Text style={stylesModal.closeButtonModal}>X</Text>
                    </TouchableOpacity>
                    {this.props.value && 
                    <>
                    <Text style={stylesModal.estiloTexto}>Street & Number: {this.props.value.location.street.name} {this.props.value.location.street.number}</Text>
                    <Text style={stylesModal.estiloTexto}>City & State: {this.props.value.location.city} {this.props.value.location.state}</Text>
                    <Text style={stylesModal.estiloTexto}>Country: {this.props.value.location.country}</Text>
                    <Text style={stylesModal.estiloTexto}>Postcode: {this.props.value.location.postcode}</Text>
                    <Text style={stylesModal.estiloTexto}>Registered: {this.props.value.registered.date.substr(0,10)}</Text>
                    <Text style={stylesModal.estiloTexto}>Phone: {this.props.value.phone}</Text>
                    <Text style={stylesModal.estiloTexto}>Informacion adicional: {this.props.value.comentario}</Text>
                    </>
                    }
                </View>

            </View>

        </Modal>
        )
    }
}
