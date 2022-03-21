import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

import global from "../../Global/Style"
import { Ionicons } from '@expo/vector-icons';

export default function Funcionario({navigation}){
    return(
        <View style={global.body}>
            <View style={css.header}>
                <Ionicons name="arrow-back-circle-outline" style={{marginLeft: 5}} size={35} color="#166B8A" onPress={() => {navigation.navigate('Home')}} />
                <View style={css.cardTitle}>
                        <Text style={css.textTitle}>CASA ACOLHEDORA</Text>
                        <Text style={css.textTitle}>IRMÃ ANTÔNIA</Text>
                </View>
            </View>
            <TouchableOpacity style={global.card} onPress={() => {navigation.navigate("ListarFuncionario")}}>
                <Text style={css.title}>Listar funcionários</Text>
            </TouchableOpacity>
            <TouchableOpacity style={global.card} onPress={() => {navigation.navigate("CadastrarFuncionario")}}>
                <Text style={css.title}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    )
}

const css = StyleSheet.create({
    title:{
        fontSize: 18
    },
    header:{
      width: "100%",
      height: "20%",
      display: "flex",
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    cardTitle: {
        backgroundColor: "#166B8A",
        width: "60%",
        height: "100%",
        borderBottomLeftRadius: 66,
        alignItems: "center",
        justifyContent: "center"
    },
    textTitle: {
        color: "white",
        fontSize: 18
    },
})