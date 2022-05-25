import {StyleSheet} from 'react-native';

const stylesCard = StyleSheet.create({
    contenedor: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignContent: 'stretch'

    },
    estiloTarjeta: {
        backgroundColor: 'darkgrey',
        alignSelf: 'center',
        width: '90%',
        margin: 10,
        borderWidth: 5,
        borderColor: 'grey',
        borderRadius: 10,   
        padding: 10     
    },
    estiloTexto: {
        color: 'white',
        fontSize: 25,
        alignSelf: 'center'
    },
    estiloButton: {
        color: 'white',
        padding: 5,
        fontSize: 15
    },
    estiloTouchable: {
        borderStyle:'solid', 
        borderWidth:2, 
        borderColor:'white', 
        borderRadius: 10
    },
    estiloImagen: {
        width: 300, 
        height: 300, 
        alignSelf: 'center',
        borderRadius:10, 
        marginBottom:5,
        marginTop: 5
    },
    viewButtons: {
        display:'flex',
        flexDirection: 'row', 
        justifyContent:'flex-start', 
        marginTop: 15,
        flexWrap: 'wrap'
    },
    estiloTextInput: {
        backgroundColor:'white', marginTop: 15, height:25, borderStyle: 'solid', borderRadius: 10, borderColor: 'grey', borderWidth:2, width: 300, alignSelf: 'center'
    },
    viewButtons2: {
        display: 'flex', flexDirection: 'row', justifyContent:'space-between', marginTop: 15, flexWrap:'wrap'
    }
    
})

const stylesMenu = StyleSheet.create({
    estiloMenu: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignSelf: 'center'

    },
    estiloTexto: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        borderStyle: 'solid',
        width: 200,
        padding: 5
    }
})

const stylesModal = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    estiloModal: {
        height: 300,
        width: 400,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        elevation: 60,
        shadowColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black'   
    },
    estiloTexto: {
        fontSize: 20
    },
    closeButtonModal: {
        fontSize: 35
    },
    positionCloseButton: {
    }
})

export {stylesCard, stylesMenu, stylesModal}