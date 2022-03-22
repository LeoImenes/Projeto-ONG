import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';

import global from "../../Global/Style"
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function ListarAssistidos({navigation}){
    const[lista, setLista] = useState([]);
    const[searchText, setSearchText] = useState("");
    const [dados, setDados] = useState([]);

    const Listar = () => {
        fetch(`http://10.87.207.27:3000/assistidos`)
        .then(resp => {return resp.json()})
        .then(data => {
            setLista(data);
            setDados(data);
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
            setLista(
                dados.filter(item => (item.nome_completo.toLowerCase().indexOf(searchText.toLowerCase()) > -1))
            )
        }
    }, [searchText]);

    return(
        <View style={css.body}>
            <View style={css.filtro}>
                <Ionicons name="arrow-back-circle-outline" size={34} color="white" onPress={() => {navigation.navigate("Assistido")}} />
                <TextInput placeholder="Pesquise uma pessoa" placeholderTextColor= "gray" style={css.pesquisa} value={searchText} onChangeText={(t) => setSearchText(t)}></TextInput>
                <TouchableOpacity onPress={() => {ordenar()}}>
                    <MaterialCommunityIcons name="order-alphabetical-ascending" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={css.scrollView}>
                <ScrollView>
                    {
                        lista.map((item, index) =>{
                            return (
                                <TouchableOpacity style={global.cardInfo} key={index} onPress={() => {navigation.navigate("VerAssistido", {item})}}>
                                    <Image source={(item.foto_antes !== null) ? {uri: item.foto_antes} : require("../../assets/user.png")} style={global.imageUser}/>
                                    <View style={css.cardTxt}>
                                        <Text style={global.textInfo}>{item.nome_completo}</Text>
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
        backgroundColor: "#166B8A",
        alignItems: "center",
    },
    scrollView: {
        width: "100%",
        height: 500
    },
    cardTxt: {
        width: "70%",
        alignItems: "center",
    },
    filtro:{
        width: "100%",
        height: 70,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        alignSelf: "flex-end",
        marginTop: "5%",
    },
    pesquisa:{
        backgroundColor: "white",
        width: "70%",
        height: 40,
        borderRadius: 10,
        padding: 10,
        fontSize: 18
    }
})