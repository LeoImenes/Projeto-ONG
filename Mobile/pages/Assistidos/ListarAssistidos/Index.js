import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';

import global from "../../Global/Style"
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function ListarAssistidos({navigation}){
    const[lista, setLista] = useState([]);
    const[searchText, setSearchText] = useState("");
    const [dados, setDados] = useState([]);

    const Listar = () => {
        // fetch(`http://10.87.207.27:3000/assistidos`)
        fetch(`http://192.168.0.103:3000/assistidos`)
        .then(resp => {return resp.json()})
        .then(data => {
            console.log(data);
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
        <View style={global.bodyAlternative}>
            <View style={global.filter}>
                <Ionicons name="arrow-back-circle-outline" size={34} color="white" onPress={() => {navigation.navigate("Assistido")}} />
                <TextInput placeholder="Pesquise uma pessoa" placeholderTextColor= "gray" style={global.search} value={searchText} onChangeText={(t) => setSearchText(t)}></TextInput>
                <TouchableOpacity onPress={() => {ordenar()}}>
                    <MaterialCommunityIcons name="order-alphabetical-ascending" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={global.scrollAlternative}>
                <ScrollView>
                    {
                        lista.map((item, index) =>{
                            return (
                                <TouchableOpacity style={global.cardInfo} key={index} onPress={() => {navigation.navigate("VerAssistido", {item})}}>
                                    <Image source={(item.foto_antes !== null) ? {uri: item.foto_antes} : require("../../assets/user.png")} style={global.imageUser}/>
                                    <View style={global.cardTxt}>
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
    
})