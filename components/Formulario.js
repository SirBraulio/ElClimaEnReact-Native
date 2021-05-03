import React, { useState } from 'react'
import {Alert,Text, View, TextInput,StyleSheet, TouchableWithoutFeedback, Animated} from 'react-native';
import { Picker } from '@react-native-community/picker';
const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {

    const {pais, ciudad} = busqueda;

    const [ animacionboton ] = useState(new Animated.Value(1));
    
    const consultarClima = () => {
        if(pais.trim() === '' || ciudad.trim() === ''){
            mostrarAlerta();
            return;
        }
        guardarConsultar(true)
    }
    
    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Agrega una ciudad y pais para la busqueda',
            [{ text: 'OK' }]
        )
    }

    const animacionEntrada = () =>{
        Animated.spring( animacionboton,{
            toValue: .75
        }).start();
    }
    const animacionSalida = () =>{
        Animated.spring( animacionboton,{
            toValue: 1,
            friction: 3,
            tension: 30
        }).start();
    }

    const estiloAnimacion = {
        transform: [{ scale: animacionboton }]
    }
    return (
        <>
            <View style={StyleSheet.formulario}>
                <View>
                    <TextInput
                        value={ciudad}
                        style={styles.input}
                        onChangeText={ ciudad => guardarBusqueda({...busqueda, ciudad})}
                        placeholder="Ciudad"
                        placeholderTextColor ="#666"
                    />
                </View>
                <View>
                    <Picker
                        selectedValue={pais}
                        itemStyle={{height:150, backgroundColor:'#FFF'}}
                        onValueChange={ pais => guardarBusqueda({...busqueda,pais})}
                    >
                        <Picker.Item label = "-- Seleccione un pais --" value=""/>
                        <Picker.Item label = "Estados Unidos " value="US"/>
                        <Picker.Item label = "Mexico" value="MX"/>
                        <Picker.Item label = "Argentina" value="AR"/>
                        <Picker.Item label = "Colombia" value="CL"/>
                        <Picker.Item label = "Costa Rica" value="CR"/>
                        <Picker.Item label = "España" value="ES"/>
                        <Picker.Item label = "Chile" value="CL"/>
                    </Picker>
                </View>
                <TouchableWithoutFeedback
                    onPressIn={()=> animacionEntrada() }
                    onPressOut={()=> animacionSalida() }
                    onPress={() => consultarClima()}
                >
                    <Animated.View
                        style={[styles.btnBuscar, estiloAnimacion]}
                    >
                            <Text style={styles.txtBuscar}>Buscar clima </Text>
                    </Animated.View>
                </TouchableWithoutFeedback>

            </View>
        </>
    );

}

const styles = StyleSheet.create({
    formulario:{
        marginTop: 100
    },
    input:{
        padding: 10,
        height: 50,
        backgroundColor: '#FFF', 
        fontSize: 20,
        marginBottom:20,
        textAlign: 'center'
    },
    btnBuscar:{
        marginTop:50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center',
    },
    txtBuscar:{
        color:'#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign:'center',
        fontSize: 14
    }
});

export default Formulario;