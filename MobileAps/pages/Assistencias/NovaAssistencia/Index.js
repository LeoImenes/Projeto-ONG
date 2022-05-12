import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, StatusBar, ScrollView, TextInput, TouchableOpacity } from "react-native"

import global from "../../Global/Style"

import Checkbox from 'expo-checkbox';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import ToggleButton from '../../Components/ToggleButton/Index';

export default function NovaAssistencia({ navigation }) {
    const [dataCriacao, setDataCriacao] = useState("");
    const [lista, setLista] = useState([]);
    const [dados, setDados] = useState([]);
    const [selecionados, setSelecionados] = useState([]);
    const [ref, setRef] = useState([])
    const [ut, setUt] = useState([])
    const [est, setEst] = useState([])
    const [coiso, setCoiso] = useState([])
    const [valuePicker, setValuePicker] = useState();

    const listar = () => {
        let newDados = [...dados];

        newDados.sort((a, b) => (a.nome_completo > b.nome_completo) ? 1 : (b.nome_completo > a.nome_completo ? -1 : 0));

        setLista(newDados)
    }

    useFocusEffect(
        React.useCallback(() => {
            const data = new Date();
            setDataCriacao(data)

            // fetch(`http://192.168.0.104:3000/assistidos`)
            fetch(`http://10.87.207.20:3000/assistidos`)
                .then(resp => { return resp.json() })
                .then(data => {
                    setLista(data);
                    setDados(data);
                })
                .catch(err => { console.log(err) });

            fetch(`http://10.87.207.20:3000/itens`)
                .then(resp => { return resp.json() })
                .then(data => {

                    let tempA = [], tempB = [], tempC = [], tempD = [];

                    data.forEach(item => {
                        if (item.tipo == 1) {
                            tempA.push(item);
                        } else if(item.tipo == 2){
                            tempB.push(item);
                        } else if(item.tipo == 3){
                            tempC.push(item);
                        } else {
                            tempD.push(item);
                        }
                    })

                    setRef(tempA)
                    setUt(tempB)
                    setEst(tempC)
                    setCoiso(tempD)
                })
                .catch(err => { console.log(err) });
        }, [])
    );

    const add = (idAss, idCard) => {
        if (selecionados.includes(idAss)) selecionados.splice(selecionados.indexOf(idAss), 1)
        else selecionados.push(idAss)
    };

    return (
        <View style={global.body}>
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor="transparent"
                translucent={true} />
            <View style={{ width: "100%", height: 150, backgroundColor: "#166B8A", borderBottomRightRadius: 40, borderBottomLeftRadius: 40, alignItems: "center", justifyContent: "center" }}>
                <View style={css.filter}>
                    <Ionicons name="arrow-back-circle-outline" size={34} color="white" onPress={() => { navigation.navigate("Home") }} />
                    <TouchableOpacity style={{ width: "80%", height: "100%", justifyContent: "center" }} onPress={() => { listar() }}>
                        <Text style={{ fontSize: 20, color: 'white' }}>Ordem alfabética</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "90%", alignItems: "center", alignSelf: "center", height: "30%", justifyContent: "space-around", flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>Nova Assistência</Text>
                </View>
            </View>
            <View style={{ width: "100%", height: 450, borderBottomWidth: 3, borderBottomColor: "#166B8A", marginBottom: 20}}>
                <ScrollView>
                    {
                        lista.map((item, index) => {
                            return (
                                <ToggleButton key={index} text={item.nome_completo} style={css.card} onPress={() => { add(item.id_assistido, index) }} />
                            )
                        })
                    }
                </ScrollView>
            </View>
            <Text style={global.textInfo1}>Item solicitado:</Text>
            <View style={{ width: "90%", alignSelf: "center", borderBottomWidth: 2, marginTop: 10}}>
                <Picker selectedValue={valuePicker} onValueChange={(itemValue, itemIndex) => setValuePicker(itemValue)}>
                    {
                        ref.map((item, index) => {
                            return (
                                <Picker.Item label={item.item} value={item.id_item} key={index} />
                            )
                        })
                    }
                </Picker>
            </View>
            <View style={{ width: "90%", alignSelf: "center", borderBottomWidth: 2, marginTop: 10}}>
                <Picker selectedValue={valuePicker} onValueChange={(itemValue, itemIndex) => setValuePicker(itemValue)}>
                    {
                        ut.map((item, index) => {
                            return (
                                <Picker.Item label={item.item} value={item.id_item} key={index} />
                            )
                        })
                    }
                </Picker>
            </View>
            <View style={{ width: "90%", alignSelf: "center", borderBottomWidth: 2, marginTop: 10}}>
                <Picker selectedValue={valuePicker} onValueChange={(itemValue, itemIndex) => setValuePicker(itemValue)}>
                    {
                        est.map((item, index) => {
                            return (
                                <Picker.Item label={item.item} value={item.id_item} key={index} />
                            )
                        })
                    }
                </Picker>
            </View>
            <View style={{ width: "90%", alignSelf: "center", borderBottomWidth: 2, marginTop: 10}}>
                <Picker selectedValue={valuePicker} onValueChange={(itemValue, itemIndex) => setValuePicker(itemValue)}>
                    {
                        coiso.map((item, index) => {
                            return (
                                <Picker.Item label={item.item} value={item.id_item} key={index} />
                            )
                        })
                    }
                </Picker>
            </View>
        </View>
    );
}

const css = StyleSheet.create({
    card: {
        width: "100%",
        height: 100,
        marginBottom: 10,
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: "whitesmoke",
        display: "flex"
    },
    filter: {
        width: "100%",
        height: "30%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        alignSelf: "flex-end",
        marginTop: "8%",
        marginBottom: "1%"
    },
});