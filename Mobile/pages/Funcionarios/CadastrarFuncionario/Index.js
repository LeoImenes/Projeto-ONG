import React from 'react';
import { StyleSheet, View, ScrollView, Image, TextInput, Text} from 'react-native';

import global from "../../Global/Style"
import { Feather } from '@expo/vector-icons';

export default function CadastrarFuncionario({navigation}){
    return(
        <View style={global.body}>
            <Image style={global.image} source={require("../../assets/logo.png")}/>
            <View style={css.scrollView}>
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
                    <Text style={global.buttonText}>Salvar</Text>
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
    },
    scrollView: {
        width: "100%",
        height: 580
    }
})