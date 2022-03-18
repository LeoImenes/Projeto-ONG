import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import global from "../../Global/Style"
import { Ionicons } from '@expo/vector-icons';

export default function Assistido({navigation}){
    return(
        <View style={global.body}>
            <Ionicons name="return-down-back-sharp" size={24} color="black" />
            <Image style={global.image} source={require("../../assets/logo.png")}/>
            <TouchableOpacity style={global.card} onPress={() => {navigation.navigate("ListarAssistidos")}}>
                <Text style={css.title}>Mostrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={global.card} onPress={() => {navigation.navigate("CadastrarAssistido")}}>
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