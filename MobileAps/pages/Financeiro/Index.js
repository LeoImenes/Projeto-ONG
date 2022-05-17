import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, TextInput, Text, TouchableOpacity, ToastAndroid } from 'react-native';

import global from "../Global/Style"
import { Ionicons, FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import StatusBar from "../Components/StatusBar/Index"
import { useFocusEffect } from '@react-navigation/native';

export default function Financeiro({ navigation }) {
    const [valuePicker, setValuePicker] = useState();
    const [rec, setRec] = useState([])
    const [mostrarSaldo, setMostrarSaldo] = useState(true);
    const [mostrarFinancas, setMostrarFinancas] = useState(false);
    const [receitas, setReceitas] = useState([])
    const [despesas, setDespesas] = useState([])
    const [financas, setFinancas] = useState([])
    const saldo = 10;

    const formatDate = (nasc) => {
        let dia = nasc.getDate();
        dia = (dia < 10) ? "0" + dia : dia;
        let mes = nasc.getMonth() + 1;
        mes = (mes < 10) ? "0" + mes : mes;
        let ano = nasc.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    useFocusEffect(
        React.useCallback(() => {

            // fetch(`http://192.168.0.104:3000/funcionario/financas`)
            fetch(`http://10.87.207.20:3000/funcionario/financas`)
                .then(resp => { return resp.json() })
                .then(data => {
                    // let tempR = [], tempD = [];

                    // data.forEach(item => {
                    //     if (item.tipo == 0) {
                    //         tempD.push(item);
                    //     } else {
                    //         tempR.push(item);
                    //     }
                    // })

                    // setDespesas(tempD)
                    // setReceitas(tempR)
                    setFinancas(data)
                })
                .catch(err => { console.log(err) });
        }, [])
    );

    return (
        <View style={global.body}>
            <StatusBar />
            <View style={global.header}>
                <Ionicons name="arrow-back-circle-outline" style={{ marginLeft: 5 }} size={35} color="#166B8A" onPress={() => { navigation.navigate('Home'), limpar() }} />
                <View style={global.cardTitle}>
                    <Text style={global.textTitle}>Casa Acolhedora</Text>
                    <Text style={global.textTitle}>Irmã Antônia</Text>
                </View>
            </View>
            <View style={css.saldo}>
                <Text style={css.textPattern}>Saldo: R$ </Text>
                <Text style={[css.text, (saldo < 0) ? { color: "red" } : { color: "green" }, (mostrarSaldo === true) ? {} : { color: "black" }]}>{(mostrarSaldo === true) ? saldo : "•••"}</Text>
                <TouchableOpacity style={{}} onPress={() => { setMostrarSaldo(!mostrarSaldo) }}>
                    {
                        (mostrarSaldo === true)
                            ?
                            <FontAwesome name="eye" size={28} color="black" />
                            :
                            <FontAwesome name="eye-slash" size={28} color="black" />
                    }
                </TouchableOpacity>
            </View>
            <View style={css.historico}>
                <View style={{ flexDirection: "row", width: "100%", minHeight: 40, justifyContent: "space-evenly", alignItems: "center"}}>
                    <Text style={css.textPattern}>Histórico</Text>
                    <TouchableOpacity style={{ width: "10%", maxHeight: "100%", alignItems: "center", justifyContent: "center"}} onPress={() => { setMostrarFinancas(!mostrarFinancas) }}>
                        {
                            (mostrarFinancas === true)
                                ?
                                <AntDesign name="up" size={24} color="black" />
                                :
                                <AntDesign name="down" size={24} color="black" />
                        }
                    </TouchableOpacity>
                </View>
                <View style={{ width: "100%", maxHeight: 420 }}>
                    <ScrollView>
                        {
                            (mostrarFinancas === true)
                                ?
                                financas.map((item, index) => {
                                    return (
                                        <TouchableOpacity style={css.card} key={index}>
                                            <View style={css.div}>
                                                {
                                                    (item.tipo === 0)
                                                        ?
                                                        <MaterialIcons name="money-off" size={25} color="orangered" />
                                                        :
                                                        <MaterialIcons name="attach-money" size={25} color="green" />
                                                }

                                                <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.descricao}</Text>
                                            </View>
                                            <View style={[css.div, { justifyContent: "space-evenly" }]}>
                                                <Text style={{ fontSize: 16 }}>R$ {item.valor.toFixed(2)}</Text>
                                                <Text>{formatDate(new Date(item.data_lancamento))}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                                :
                                <View></View>
                        }
                    </ScrollView>
                </View>
            </View>
            <TouchableOpacity style={[global.cardButton1, {width: 160, height: 50}]}>
              <Text style={global.buttonText1}>Novo lançamento</Text>
            </TouchableOpacity>
        </View>
    )
}

const css = StyleSheet.create({
    saldo: {
        width: "80%",
        height: 100,
        backgroundColor: "whitesmoke",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10
    },
    text: {
        fontWeight: "bold",
        fontSize: 18,
        width: "60%"
    },
    card: {
        width: "100%",
        minHeight: 70,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
        padding: 2,
        paddingRight: 5,
        justifyContent: "space-evenly"
    },
    textPattern: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20
    },
    historico: {
        width: "90%",
        backgroundColor: "whitesmoke",
        marginTop: 10
    },
    div: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    }
})