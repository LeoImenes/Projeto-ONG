import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, TextInput, StatusBar } from 'react-native';

import global from "../../Global/Style"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function ListarFuncionario({navigation}){
    const[lista, setLista] = useState([]);
    const[searchText, setSearchText] = useState("");
    const [dados, setDados] = useState([]);
    const[ativo, setAtivo] = useState(false)

    useEffect(() => {
        fetch(`http://10.87.207.27:3000/funcionarios`)
        // fetch(`http://192.168.0.103:3000/funcionarios`)
        .then(resp => {return resp.json()})
        .then(data => {
            setLista(data);
            setDados(data);
        })
        .catch(err => { console.log(err) });
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

    const listar = () => {
        let newDados = [...dados];

        newDados.sort((a, b) => (a.nome_completo > b.nome_completo) ? 1 : (b.nome_completo > a.nome_completo ? -1 : 0));

        setLista(newDados)
    }

    const ativos = () => {
        setAtivo(!ativo)
    }

    return(
        <View style={global.bodyAlternative}>
            <StatusBar
                barStyle = "dark-content"
                hidden = {false}
                backgroundColor="transparent"
                translucent={true}/>
            <View style={css.filter}>
                <Ionicons name="arrow-back-circle-outline" size={34} color="white" onPress={() => {navigation.navigate("Home")}} />
                <TextInput placeholder="Pesquise uma pessoa" placeholderTextColor= "gray" style={global.search} value={searchText} onChangeText={(t) => setSearchText(t)}></TextInput>
                <View style={{width: "10%", alignItems: "center", height: "90%", justifyContent: "space-evenly", marginTop: 10}}>
                    <TouchableOpacity style={{width: "100%", height: "50%"}} onPress={() => {listar()}}>
                        <MaterialCommunityIcons name="order-alphabetical-ascending" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: "100%", height: "50%", alignItems: "center"}} onPress={() => {ativos()}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Ativ</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={global.scrollAlternative}>
                <ScrollView>
                    {
                        lista.map((item,index) => {
                            return(
                                <View>
                                {
                                    (ativo === true && item.status === 0)
                                    ? 
                                    <TouchableOpacity style={{display: 'none'}}></TouchableOpacity> 
                                    :
                                    <TouchableOpacity style={global.cardInfo} onPress={() => {navigation.navigate("VerFuncionario", {item})}}>
                                        <Image source={(item.foto === null || item.foto === "") ? require("../../assets/user.png") : {uri: item.foto}} style={global.imageUser}/>
                                        <View style={global.cardTxt}>
                                            <Text style={global.textInfoAlternative}>{item.nome_completo}</Text>
                                            <Text style={css.activity}>{(item.status === 0) ? "Inativo" : "Ativo"}</Text>
                                        </View>
                                    </TouchableOpacity> 
                                }
                                </View>
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
    },
    filter: {
        width: "100%",
        height: 80,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        alignSelf: "flex-end",
        marginTop: "5%",
    }
})