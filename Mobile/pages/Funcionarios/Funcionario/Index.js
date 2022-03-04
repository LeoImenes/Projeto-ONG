import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

import global from "../../Global/Style"

export default function Funcionario({navigation}){
    return(
        <View style={global.body}>
            <Image style={global.image} source={require("../../assets/logo.png")}/>
            <TouchableOpacity style={global.card} onPress={() => {navigation.navigate("MeuPerfil")}}>
                <Text style={css.title}>Meu perfil</Text>
            </TouchableOpacity>
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
    }
})