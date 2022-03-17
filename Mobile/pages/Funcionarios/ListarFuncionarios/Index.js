import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

import global from "../../Global/Style"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListarFuncionario({navigation}){
    const[lista, setLista] = useState([]);

    useEffect(() => {
        Listar();
     }, []);

    const Listar = () => {
      fetch(`http://10.87.207.27:3000/funcionarios`)
    .then(resp => {return resp.json()})
    .then(data => {
        setLista(data);
    })
    .catch(err => { console.log(err) });
  }

    return(
        <View style={global.body}>
            <Image style={global.image} source={require("../../assets/logo.png")}/>
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
    scrollView: {
        width: "100%",
        height: 580
    },
    cardTxt: {
        width: "70%",
        alignItems: "center",
    }
})