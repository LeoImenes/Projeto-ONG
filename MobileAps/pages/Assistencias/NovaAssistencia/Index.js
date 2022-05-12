import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, StatusBar, ScrollView, TextInput, TouchableOpacity } from "react-native"

import global from "../../Global/Style"

import Checkbox from 'expo-checkbox';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import ToggleButton from '../../Components/ToggleButton/Index';

export default function NovaAssistencia({ navigation }) {
    const [roupas, setRoupas] = useState(false);
    const [dataCriacao, setDataCriacao] = useState("");
    const [lista, setLista] = useState([]);
    const [selecionados, setSelecionados] = useState([]);
    const [searchText, setSearchText] = useState("");

    useFocusEffect(
        React.useCallback(() => {
            const data = new Date();
            setDataCriacao(data)

            // fetch(`http://192.168.0.104:3000/assistidos`)
            fetch(`http://10.87.207.20:3000/assistidos`)
                .then(resp => { return resp.json() })
                .then(data => {
                    setLista(data);
                })
                .catch(err => { console.log(err) });

        }, [])
    );

    const add = (idAss, idCard) => {
        if(selecionados.includes(idAss)) selecionados.splice(selecionados.indexOf(idAss), 1)
        else selecionados.push(idAss)
    };

    return (
        <View style={global.body}>
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor="transparent"
                translucent={true} />
            <View style={{width: "100%", height: 150, backgroundColor: "#166B8A", borderBottomRightRadius: 40, borderBottomLeftRadius: 40}}>
                <View style={css.filter}>
                    <Ionicons name="arrow-back-circle-outline" size={34} color="white" onPress={() => {navigation.navigate("Home")}} />
                    <TextInput placeholder="Pesquisar..." placeholderTextColor= "white" style={{width: "80%", borderBottomWidth: 1, borderBottomColor: 'white', padding: "2%", color: 'white'}} value={searchText} onChangeText={(t) => setSearchText(t)}></TextInput>
                </View>
                <View style={{width: "90%", alignItems: "center", alignSelf: "center", height: "50%", justifyContent: "space-around",flexDirection: "row"}}>
                    <Text style={global.textTitle}>Nova Assistência</Text>
                </View>
            </View>
            <View style={{ width: "100%", height: "84%" }}>
                <ScrollView>
                    <Text style={{ fontSize: 20, fontWeight: "bold", alignSelf: "center", marginTop: "2%" }}>Nova Assistência</Text>
                    {
                        lista.map((item, index) => {
                            return (
                                <ToggleButton key={index} text={item.nome_completo} style={css.card} onPress={() => {add(item.id_assistido, index) }}/>
                            )
                        })
                    }
                    {/* <View style={{ display: "flex", flexDirection: "row", width: "70%", alignSelf: "center", justifyContent: "space-evenly", height: 40, alignItems: "center" }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Vc é idiota?</Text>
                        <Checkbox
                            style={{ borderRadius: 30, width: 25, height: 25 }}
                            value={roupas}
                            onValueChange={setRoupas}
                            color={roupas ? '#166B8A' : undefined}
                        />
                    </View> */}
                </ScrollView>
            </View>
        </View>
    );
}

const css = StyleSheet.create({
    card:{
        width: "100%",
        height: 100,
        marginBottom: 10,
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: "whitesmoke",
        display: "flex"
    }
});