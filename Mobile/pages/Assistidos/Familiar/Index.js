import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, TextInput, Text,} from 'react-native';

import global from "../../Global/Style"
import { Ionicons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastrarFamiliar({navigation}){
    const[idAss, setIdAss]= useState();
    const[nome, setNome] = useState("");
    const[rg, setRg] = useState("");
    const[parentesco, setParentesco] = useState("");
    const[email, setEmail] = useState("");
    const[telefone, setTelefone] = useState("");
    const[endereco, setEndereco] = useState("");

    const getFunc =  async() => {
        let value = await AsyncStorage.getItem('userdata');
        let id = JSON.parse(value)
        setIdFunc(id.id_assistido)
    }

    const cadastrar = () => {
        let familiar = {
            id_assistido: idAss,
            nome_completo: nome,
            rg: rg,
            telefone: telefone,
            email: email,
            parentesco: parentesco,
        }
    
        fetch(`http://10.87.207.27:3000/assistido/familiar`, {
          "method": "POST",
          "headers": {
              "Content-Type": "application/json"
          },
          "body": JSON.stringify(familiar),
        })
        .then(resp => {return resp.json()})
        .then(async data => {
          console.log(data)
        })
        .catch(err => { console.log(err) });
      }

    return(
        <View style={css.body} onLoad={getFunc()}>
            <View style={css.alignHeader}>
                <Ionicons name="arrow-back-circle-outline" style={{marginLeft: 5}} size={35} color="#166B8A" onPress={() => {navigation.navigate('Assistido')}} />
                <View style={css.logo}>
                    <Text style={css.text}>Casa Acolhedora</Text>
                    <Text style={css.text}>Irmã Antônia</Text>
                </View>
            </View>
            <View style={css.scrollView}>
                <ScrollView>
                    <Text style={css.title1}>Novo Familiar</Text>
                    <TextInput value={nome} onChangeText={setNome} placeholder="Nome..." place style={global.info}></TextInput>
                    <TextInput value={rg} onChangeText={setRg} placeholder="RG..." style={global.info}></TextInput>
                    <TextInput value={parentesco} onChangeText={setParentesco} placeholder="Parentesco..." style={global.info}></TextInput>
                    <TextInput value={telefone} onChangeText={setTelefone} placeholder="Telefone..." style={global.info}></TextInput>
                    <TextInput value={email} onChangeText={setEmail} placeholder="E-mail..." style={global.info}></TextInput>
                    <TextInput value={endereco} onChangeText={setEndereco} placeholder="Endereço..." style={global.info}></TextInput>
                    <Text style={css.buttonText} onPress={() => {cadastrar()}}>Salvar</Text>
                </ScrollView>
            </View>
        </View>
    )
}

const css = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: "white",
    },
    title1:{
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginTop: "5%"
    },
    scrollView: {
        width: "100%",
        height: "80%"
    },
    alignHeader:{
        width: "100%",
        height: "20%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    logo:{
        width: '60%',
        height: '100%',
        backgroundColor: "#166B8A",
        borderBottomLeftRadius: 112.5,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 20,
        color: "white"
    },
    buttonText: {
        fontSize: 20,
        color: "#166B8A",
        alignSelf: "center",
        fontWeight: "bold",
        marginTop: "5%"
    }
})