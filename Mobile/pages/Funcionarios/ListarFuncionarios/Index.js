import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, TextInput, StatusBar } from 'react-native';

import global from "../../Global/Style"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function ListarFuncionario({navigation}){
    const[lista, setLista] = useState([]);
    const[searchText, setSearchText] = useState("");
    const [dados, setDados] = useState([]);

    const Listar = () => {
        fetch(`http://10.87.207.27:3000/funcionarios`)
        // fetch(`http://192.168.0.103:3000/funcionarios`)
        .then(resp => {return resp.json()})
        .then(data => {
            setLista(data);
        })
        .catch(err => { console.log(err) });
    }

    useEffect(() => {
        Listar();
    },[])

    useEffect(() => {
        if (searchText === ''){
            setLista(dados);
        } else {
            console.log("teste")
            setLista(
                dados.filter(item => (item.nome_completo.toLowerCase().indexOf(searchText.toLowerCase()) > -1))
            )
        }
    }, [searchText]);

    return(
        <View style={global.bodyAlternative}>
            <StatusBar
                barStyle = "dark-content"
                hidden = {false}
                backgroundColor="transparent"
                translucent={true}/>
            <View style={global.filter}>
            <Ionicons name="arrow-back-circle-outline" size={34} color="white" onPress={() => {navigation.navigate("Funcionario")}} />
                <TextInput placeholder="Pesquise uma pessoa" placeholderTextColor= "gray" style={global.search} value={searchText} onChangeText={(t) => setSearchText(t)}></TextInput>
                <TouchableOpacity onPress={() => {ordenar()}}>
                    <MaterialCommunityIcons name="order-alphabetical-ascending" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={global.scrollAlternative}>
                <ScrollView>
                    {
                        lista.map((item,index) => {
                            return(
                                <TouchableOpacity style={global.cardInfo} onPress={() => {navigation.navigate("VerFuncionario", {item})}} key={index}>
                                    <Image source={(item.foto === null || item.foto === "") ? require("../../assets/user.png") : {uri: item.foto}} style={global.imageUser}/>
                                    <View style={global.cardTxt}>
                                        <Text style={global.textInfoAlternative}>{item.nome_completo}</Text>
                                        <Text style={css.activity}>{(item.status ===0) ? "Inativo" : "Ativo"}</Text>
                                    </View>
                                </TouchableOpacity> 
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    )
}
const css = StyleSheet.create({
    activity: {
        fontSize: 18,
        fontWeight: "bold"
    }
})