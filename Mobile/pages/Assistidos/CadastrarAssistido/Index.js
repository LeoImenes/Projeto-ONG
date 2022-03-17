import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image, TextInput, Text} from 'react-native';

import global from "../../Global/Style"
import { Feather } from '@expo/vector-icons';
import SelectMultiple from 'react-native-select-multiple'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fruits = ['Apples', 'Oranges', 'Pears']

export default function CadastrarAssistido({navigation}){
    const[selectedFruits, setSelectedFruits] = useState([]);
    const[dorgas, setDorgas] = useState(["Lança", "Cocaina", "Oregano"])
    const[idFunc, setIdFunc] = useState();
    const[nome, setNome] = useState("");
    const[nomeSocial, setNomeSocial] = useState("");
    const[rg, setRg] = useState("");
    const[cpf, setCpf] = useState("");
    const[sexo,setSexo] = useState("");
    const[nascimento, setNascimento] = useState("");
    const[mae, setMae] = useState("");
    const[pai, setPai] = useState("");
    const[estdCivil, setEstdCivil] = useState("");
    const[naturalidade, setNaturalidade] = useState("");
    const[cartCid, setCartCid] = useState("");
    const[cartSus, setCartSus] = useState("");
    const[foto, setFoto] = useState("");

    onSelectionsChange = (selected) => {
        setSelectedFruits(selected);
    }

    const getFunc =  async() => {
        let value = await AsyncStorage.getItem('userdata');
        let id = JSON.parse(value)
        setIdFunc(id.id_funcionario)
    }

    const cadastrar = () => {
        let assistido = {
            id_funcionario: idFunc,
            nome_completo: nome,
            nome_social: nomeSocial,
            rg: rg,
            cpf: cpf,
            data_nascimento: nascimento,
            estado_civil: estdCivil,
            naturalidade: naturalidade,
            sexo: sexo,
            cartao_cidadao: cartCid,
            cartao_sus: cartSus,
            foto: foto
        }
    
        fetch(`http://10.87.207.27:3000/assistidos`, {
          "method": "POST",
          "headers": {
              "Content-Type": "application/json"
          },
          "body": JSON.stringify(assistido),
        })
        .then(resp => {return resp.json()})
        .then(async data => {
          console.log(data)
        })
        .catch(err => { console.log(err) });
      }

    return(
        <View style={global.body} onLoad={getFunc()}>
            
            <Image style={global.image} source={require("../../assets/logo.png")}/>
            <View style={css.scrollView}>
                <ScrollView>
                    <Text style={css.title}>Dados Pessoais</Text>
                    <TextInput value={nome} onChangeText={setNome} placeholder="Nome..." place style={global.info}></TextInput>
                    <TextInput value={nomeSocial} onChangeText={setNomeSocial} placeholder="Nome social..." place style={global.info}></TextInput>
                    <TextInput value={rg} onChangeText={setRg} placeholder="RG..." style={global.info}></TextInput>
                    <TextInput value={cpf} onChangeText={setCpf} placeholder="CPF..." style={global.info}></TextInput>
                    <TextInput value={sexo} onChangeText={setSexo} placeholder="Sexo..." style={global.info}></TextInput>
                    <TextInput value={nascimento} onChangeText={setNascimento} placeholder="Nascimento..." style={global.info}></TextInput>
                    {/* <TextInput value={mae} onChangeText={setMae} placeholder="Nome da mãe" place style={global.info}></TextInput>
                    <TextInput value={pai} onChangeText={setPai} placeholder="Nome do pai..." place style={global.info}></TextInput> */}
                    <TextInput value={estdCivil} onChangeText={setEstdCivil} placeholder="Estado civil..." style={global.info}></TextInput>
                    <TextInput value={naturalidade} onChangeText={setNaturalidade} placeholder="Naturalidade..." style={global.info}></TextInput>
                    <TextInput value={cartCid} onChangeText={setCartCid} placeholder="Cartão cidadão..." style={global.info}></TextInput>
                    <TextInput value={cartSus} onChangeText={setCartSus} placeholder="Cartão do SUS..." style={global.info}></TextInput>
                     {/* <SelectMultiple
                        items={dorgas}
                        selectedItems={selectedFruits}
                        onSelectionsChange={onSelectionsChange} /> */}
                    <View style={css.align}>
                        <Image source={require("../../assets/user.png")} style={global.imageUser}/>
                        <View style={css.alignIcon}>
                            <Feather name="camera" size={24} color="blue" />
                            <Text style={{color: "blue"}}>Adicionar foto</Text>
                        </View>
                    </View>
                {/* <Collapse>
                    <CollapseHeader>
                    <View style={{display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: "5%"}}>
                        <Text style={css.title}>Contato ou emergência</Text>
                        <AntDesign name="down" size={18} color="black" style={{marginLeft: 10}}/>
                    </View>
                    </CollapseHeader>
                    <CollapseBody>
                        <TextInput placeholder="Parentesco..." style={global.info}></TextInput>
                        <TextInput placeholder="Telefone..." style={global.info}></TextInput>
                        <TextInput placeholder="Parentesco..." style={global.info}></TextInput>
                        <TextInput placeholder="Telefone..." style={global.info}></TextInput>
                    </CollapseBody>
                </Collapse> */}
                    <Text style={global.buttonText} onPress={() => {cadastrar()}}>Salvar</Text>
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