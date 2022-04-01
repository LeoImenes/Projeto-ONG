import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';

import global from "../../Global/Style"
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function ListarAssistidos({navigation}){
    const[lista, setLista] = useState([]);
    const[searchText, setSearchText] = useState("");
    const [dados, setDados] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
<<<<<<< HEAD
            // fetch(`http://10.87.207.27:3000/assistidos`)
            fetch(`http://192.168.137.1:3000/assistidos`)
=======
            fetch(`http://10.87.207.27:3000/assistidos`)
            // fetch(`http://192.168.0.103:3000/assistidos`)
>>>>>>> d78b52a0c2292ec7eb8dbf34690c716b2c21f77c
            .then(resp => {return resp.json()})
            .then(data => {
                setLista(data);
                setDados(data);
            })
            .catch(err => { console.log(err) });
        }, [])
      );
    
    useEffect(() => {
        if (searchText === ''){
            setLista(dados);
        } else {
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

    return(
        <View style={global.bodyAlternative}>
            <View style={global.filter}>
                <Ionicons name="arrow-back-circle-outline" size={34} color="white" onPress={() => {navigation.navigate("Home")}} />
                <TextInput placeholder="Pesquise uma pessoa" placeholderTextColor= "gray" style={global.search} value={searchText} onChangeText={(t) => setSearchText(t)}></TextInput>
                <TouchableOpacity onPress={() => {listar()}}>
                    <MaterialCommunityIcons name="order-alphabetical-ascending" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={global.scrollAlternative}>
                <ScrollView>
                    {
                        lista.map((item, index) =>{
                            return (
                                <TouchableOpacity style={global.cardInfo} key={index} onPress={async () => {
                                    await AsyncStorage.setItem("assistido", JSON.stringify(item));
                                    navigation.navigate("VerAssistido")
                                    }}>
                                    <Image source={(item.foto_antes === null || item.foto_antes === "" || item.foto_antes === undefined) ? require("../../assets/user.png") : {uri: item.foto_antes}} style={global.imageUser}/>
                                    <View style={global.cardTxt}>
                                        <Text style={global.textInfoAlternative}>{item.nome_completo}</Text>
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