import React, { useState } from 'react'
import { View, Text, StatusBar, ScrollView, TextInput, TouchableOpacity } from "react-native"

import global from "../../Global/Style"

import Checkbox from 'expo-checkbox';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export default function NovaAssistencia({ navigation }) {
    const [roupas, setRoupas] = useState(false);
    const [dataCriacao, setDataCriacao] = useState("");
    const [lista, setLista] = useState([]);
    const [selecionados, setSelecionados] = useState([]);
    const [itens, setItens] = useState("")
    console.log(itens)

    useFocusEffect(
        React.useCallback(() => {
            const data = new Date();
            setDataCriacao(data)

            fetch(`http://10.87.207.20:3000/assistidos`)
                .then(resp => { return resp.json() })
                .then(data => {
                    setLista(data);
                })
                .catch(err => { console.log(err) });

        }, [])
    );

    return (
        <View style={global.body}>
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor="transparent"
                translucent={true} />
            <View style={global.header}>
                <Ionicons name="arrow-back-circle-outline" style={{ marginLeft: 5 }} size={35} color="#166B8A" onPress={() => { navigation.navigate('Home'), limpar() }} />
                <View style={global.cardTitle}>
                    <Text style={global.textTitle}>Casa Acolhedora</Text>
                    <Text style={global.textTitle}>Irmã Antônia</Text>
                </View>
            </View>
            <View style={{ width: "100%", height: "84%" }}>
                <ScrollView>
                    <Text style={{ fontSize: 20, fontWeight: "bold", alignSelf: "center", marginTop: "2%" }}>Nova Assistência</Text>
                    {
                        lista.map((item, index) => {
                            return (
                                <TouchableOpacity style={(itens != "") ? {width: "100%", height: 100, marginBottom: 10, justifyContent: "center", alignSelf: "center",backgroundColor: "whitesmoke", display: "flex"} : {backgroundColor: "red"}} key={index} onPress={() => {setItens(item.id_assistido)}}>
                                    <Text style={{fontSize: 18, fontWeight: "bold", alignSelf: "center", marginTop: "2%"}}>{item.nome_completo}</Text>
                                </TouchableOpacity>
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