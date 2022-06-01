import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, ToastAndroid, } from "react-native"

import gStyle from "../../global/style"
import Url from "../../global/index"

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import ToggleButton from '../../Components/ToggleButton/Index';
import StatusBar from '../../Components/StatusBar/Index';

export default function AssistenciaRefeicao({ navigation }) {
    const [dataCriacao, setDataCriacao] = useState("");
    const [lista, setLista] = useState([]);
    const [dados, setDados] = useState([]);
    const [selecionados, setSelecionados] = useState([]);
    const [ref, setRef] = useState([])
    const [valuePicker, setValuePicker] = useState();
    const [idFunc, setIdFunc] = useState();

    const getFunc = async () => {
        let value = await AsyncStorage.getItem('userdata');

        fetch(`${Url.URL}/funcionarios/${value}`)
            .then(resp => { return resp.json() })
            .then(async data => {
                const id = JSON.parse(data[0].id_funcionario)
                setIdFunc(id)
            })
    }

    const listar = () => {
        let newDados = [...dados];

        newDados.sort((a, b) => (a.nome_completo > b.nome_completo) ? 1 : (b.nome_completo > a.nome_completo ? -1 : 0));

        setLista(newDados)
    }

    useFocusEffect(
        React.useCallback(() => {
            const data = new Date();
            setDataCriacao(data)
            getFunc()

            fetch(`${Url.URL}/assistidos`)
                .then(resp => { return resp.json() })
                .then(data => {
                    setLista(data);
                    setDados(data);
                })
                .catch(err => { console.log(err) });

            fetch(`${Url.URL}/itens`)
                .then(resp => { return resp.json() })
                .then(data => {

                    let tempA = [], tempD = [];

                    data.forEach(item => {
                        if (item.tipo === 1) {
                            tempA.push(item);
                        } else {
                            tempD.push(item);
                        }
                    })

                    setRef(tempA)
                })
                .catch(err => { console.log(err) });
        }, [])
    );

    const cadastrar = () => {
        let tempSelecionados = new Array();
        selecionados.forEach((item) => {
            tempSelecionados.push({ "id_assistido": item });
        })

        let item = {
            "id_funcionario": idFunc,
            "assistidos": tempSelecionados,
            "itens": [{ "id_item": valuePicker}]
        }
        console.log(item)

        fetch(`${Url.URL}/funcionario/assistencias`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(item),
        })
            .then(resp => { return resp.json() })
            .then(async data => {
                if (data.err !== undefined) {
                    ToastAndroid.show('Falha ao registrar assistência!', ToastAndroid.SHORT)
                    console.log(data.err)
                } else {
                    ToastAndroid.show('Resgitro efetuado!', ToastAndroid.SHORT)
                    navigation.navigate("Home")
                    limpar()
                }
            })
    }

    const limpar = () => {
        setValuePicker()
        setLista([])
      }

    const add = (idAss, idCard) => {
        if (selecionados.includes(idAss)) selecionados.splice(selecionados.indexOf(idAss), 1)
        else selecionados.push(idAss)
    };

    return (
        <View style={gStyle.body}>
            <StatusBar />
            <View style={{ width: "100%", height: 200, backgroundColor: "#166B8A", borderBottomRightRadius: 40, borderBottomLeftRadius: 40, justifyContent: "center" }}>
                <View style={{ width: "100%", height: "20%", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                    <Ionicons name="arrow-back-circle-outline" size={34} color="white" onPress={() => { navigation.navigate("Home") }} />
                    <View style={{ width: "80%" }}>
                        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Refeição:</Text>
                    </View>
                </View>
                <View style={css.filter}>
                    <View style={css.cards}>
                        <Picker selectedValue={valuePicker} onValueChange={(itemValue, itemIndex) => setValuePicker(itemValue)}>
                            <Picker.Item label={"Selecione..."} value={""} style={{ color: "gray" }} />
                            {
                                ref.map((item, index) => {
                                    return (
                                        <Picker.Item label={item.item} value={item.id_item} key={index} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    <TouchableOpacity style={{ width: "10%", height: "100%", alignItems: "center", justifyContent: "center" }} onPress={() => { listar() }}>
                        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>A-Z</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={[css.textStyle, { fontSize: 20, marginTop: 10 }]}>Selecione:</Text>
            <Text style={[css.textStyle, { fontSize: 20, marginTop: 5, color: "#166B8A" }]}>- - - - - - - - - - - - - - - - - - - - - - </Text>
            <View style={{ width: "100%", height: 450 }}>
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
            <Text style={[css.textStyle, { fontSize: 20, marginTop: 5, color: "#166B8A" }]}>- - - - - - - - - - - - - - - - - - - - - - </Text>
            <TouchableOpacity style={{ backgroundColor: "rgb(22,107,138)", width: "35%", height: 45, alignItems: "center", justifyContent: "center", borderRadius: 5, marginTop: "5%", alignSelf: "center", marginBottom: "20%" }} onPress={() => { cadastrar() }}>
                <Text style={gStyle.buttonText}>Salvar</Text>
            </TouchableOpacity>
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
        height: "40%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    cards: {
        width: 200,
        height: 60,
        borderBottomWidth: 2,
        marginTop: 10,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 10,
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        fontSize: 17,
        textAlign: "center"
    }
});