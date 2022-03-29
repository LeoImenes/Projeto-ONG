import React from 'react';
import { StyleSheet, View, ScrollView, Image, TextInput, Text, TouchableOpacity} from 'react-native';

import global from "../../Global/Style"
import { Ionicons, Feather} from '@expo/vector-icons';

export default function CadastrarFuncionario({navigation}){
    return(
        <View style={global.body}>
            <View style={global.header}>
                <Ionicons name="arrow-back-circle-outline" style={{marginLeft: 5}} size={35} color="#166B8A" onPress={() => {navigation.navigate('Funcionario')}} />
                <View style={global.cardTitle}>
                    <Text style={global.textTitle}>Casa Acolhedora</Text>
                    <Text style={global.textTitle}>Irmã Antônia</Text>
                </View>
            </View>
            <View style={global.scroll}>
                <ScrollView>
                    <TextInput placeholder="Nome..." place style={global.info}></TextInput>
                    <TextInput placeholder="RG..." style={global.info}></TextInput>
                    <TextInput placeholder="CPF..." style={global.info}></TextInput>
                    <TextInput placeholder="Nascimento..." style={global.info}></TextInput>
                    <TextInput placeholder="Cargo..." style={global.info}></TextInput>
                    <TextInput placeholder="Sexo..." style={global.info}></TextInput>
                    <TextInput placeholder="Data admissão..." style={global.info}></TextInput>
                    <View style={{flexDirection: "row", alignSelf: "center", marginTop: "5%"}}>
                        <Image source={require("../../assets/user.png")} style={global.imageUser}/>
                        <View style={css.imageAlign}>
                            <Feather name="camera" size={24} color="blue" />
                            <Text style={{color: "blue"}}>Adicionar foto</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={global.cardButton1} onPress={() => {cadastrar()}}>
                        <Text style={global.buttonText1}>SALVAR</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

const css = StyleSheet.create({
    imageAlign:{
        width: 110,
        height: 100,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
})