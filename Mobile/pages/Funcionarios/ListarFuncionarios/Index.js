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
        <View style={css.body}>
            <StatusBar
                animated={true}
                backgroundColor="#166B8A"
                // barStyle={}
                hidden={false} />
            <View style={css.filtro}>
                <Ionicons name="return-down-back-sharp" size={24} color="black" onPress={() => { navigation.navigate("Funcionario")}}/>
                <TextInput placeholder="Pesquise uma pessoa" placeholderTextColor= "gray" style={css.pesquisa} value={searchText} onChangeText={(t) => setSearchText(t)}></TextInput>
                <TouchableOpacity onPress={() => {ordenar()}}>
                    <MaterialCommunityIcons name="order-alphabetical-ascending" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={css.scrollView}>
                <ScrollView>
                    {
                        lista.map((item,index) => {
                            return(
                                <TouchableOpacity style={global.cardInfo} onPress={() => {navigation.navigate("VerFuncionario", {item})}} key={index}>
                                    <Image source={(item.foto !== null) ? {uri: item.foto} : require("../../assets/user.png")} style={global.imageUser}/>
                                    <View style={css.cardTxt}>
                                        <Text style={global.textInfo}>{item.nome_completo}</Text>
                                        <Text style={(item.status === 0) ? {color: "red", fontSize: 18} : {color: "green", fontSize: 18}}>{(item.status ===0) ? "Inativo" : "Ativo"}</Text>
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
    body:{
        flex: 1,
        backgroundColor: "white",
        // backgroundColor: "#166B8A",
        alignItems: "center",
    },
    scrollView: {
        width: "100%",
        height: 650
    },
    cardTxt: {
        width: "70%",
        alignItems: "center",
    },
    filtro:{
        width: "100%",
        height: "10%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        alignSelf: "flex-end",
        // marginTop: "5%",
        backgroundColor: "#166B8A"
    },
    pesquisa:{
        backgroundColor: "white",
        width: "70%",
        height: "70%",
        borderRadius: 10,
        padding: 10,
        fontSize: 18
    }
})