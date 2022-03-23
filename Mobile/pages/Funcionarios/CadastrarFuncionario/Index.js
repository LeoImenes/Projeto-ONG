import React from 'react';
import { StyleSheet, View, ScrollView, Image, TextInput, Text} from 'react-native';

import global from "../../Global/Style"
import { Ionicons, Feather} from '@expo/vector-icons';

export default function CadastrarFuncionario({navigation}){
    return(
        <View style={global.body}>
            <View style={css.alignHeader}>
                <Ionicons name="arrow-back-circle-outline" style={{marginLeft: 5}} size={35} color="#166B8A" onPress={() => {navigation.navigate('Assistido')}} />
                <View style={css.logo}>
                    <Text style={css.text}>Casa Acolhedora</Text>
                    <Text style={css.text}>Irmã Antônia</Text>
                </View>
            </View>
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
    },
    alignHeader:{
        width: "100%",
        height: "20%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
})