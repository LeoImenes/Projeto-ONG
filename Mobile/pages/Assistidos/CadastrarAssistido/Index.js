import React from 'react';
import { StyleSheet, View, ScrollView, Image, TextInput, Text} from 'react-native';

import global from "../../Global/Style"
import { Feather } from '@expo/vector-icons';

export default function CadastrarAssistido({navigation}){
    return(
        <View style={global.body}>
            <Image style={global.image} source={require("../../assets/logo.png")}/>
            <View style={css.scrollView}>
                <ScrollView>
                    <Text style={css.title}>Assistido</Text>
                    <TextInput placeholder="Nome..." place style={global.info}></TextInput>
                    <TextInput placeholder="Nome social..." place style={global.info}></TextInput>
                    <TextInput placeholder="RG..." style={global.info}></TextInput>
                    <TextInput placeholder="CPF..." style={global.info}></TextInput>
                    <TextInput placeholder="Sexo..." style={global.info}></TextInput>
                    <TextInput placeholder="Nascimento..." style={global.info}></TextInput>
                    <TextInput placeholder="Nome da mãe" place style={global.info}></TextInput>
                    <TextInput placeholder="Nome do pai..." place style={global.info}></TextInput>
                    <TextInput placeholder="Estado civil..." style={global.info}></TextInput>
                    <TextInput placeholder="Naturalidade..." style={global.info}></TextInput>
                    <TextInput placeholder="Filhos..." style={global.info}></TextInput>
                    <TextInput placeholder="Cartão cidadão..." style={global.info}></TextInput>
                    <TextInput placeholder="Cartão do SUS..." style={global.info}></TextInput>
                    <View style={css.align}>
                        <Image source={require("../../assets/user.png")} style={global.imageUser}/>
                        <View style={css.alignIcon}>
                            <Feather name="camera" size={24} color="blue" />
                            <Text style={{color: "blue"}}>Adicionar foto</Text>
                        </View>
                    </View>
                    <Text style={css.title}>Contato ou emergência</Text>
                    <TextInput placeholder="Parentesco..." style={global.info}></TextInput>
                    <TextInput placeholder="Telefone..." style={global.info}></TextInput>
                    <TextInput placeholder="Parentesco..." style={global.info}></TextInput>
                    <TextInput placeholder="Telefone..." style={global.info}></TextInput>
                    <Text style={global.buttonText}>Salvar</Text>
                </ScrollView>
            </View>
        </View>
    )
}

const css = StyleSheet.create({
    title:{
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginTop: "5%"
    },
    scrollView: {
        width: "100%",
        height: 583
    },
    align: {
        width: 150,
        height: 200,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        alignSelf: "center"
    },
    alignIcon: {
        alignItems: "center"
    }
})