import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, TextInput, ToastAndroid, Dimensions } from 'react-native';

import gStyle from "../../global/style"
import Url from '../../global/index'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import formatDate from '../../Components/FormatDate/index'
import gif from '../../assets/53184-user.json'
import LottieView from "lottie-react-native";
import { LinearGradient } from 'expo-linear-gradient';

import { useFocusEffect, CommonActions } from '@react-navigation/native';

export default function VerFuncionario({ navigation }) {
    const [atualizar, setAtualizar] = useState(false);
    const [funcionario, setFuncionario] = useState([]);
    const [matricula, setMatricula] = useState("")
    const [cargo, setCargo] = useState("");
    const [dataDemissao, setDataDemissao] = useState("");
    const SCREEN_HEIGHT = Dimensions.get('window').height;
    const [loading, setLoading] = useState(true);
    
    const Atualizar = async () => {
        let value = await AsyncStorage.getItem('userdata');
        if (value !== null) {
            value = JSON.parse(value);
        }

        if (dataDemissao !== null) {
            var funcionario = {
                matricula: value,
                matricula_funcionario: matricula,
                cargo: cargo,
                data_demissao: formatDate.formatUs(dataDemissao),
            }
        } else {
            var funcionario = {
                matricula_funcionario: matricula,
                cargo: cargo,
                data_demissao: dataDemissao,
            }
        }

        fetch(`${Url.URL}/funcionarios`, {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(funcionario),
        })
            .then(resp => { return resp.json() })
            .then(data => {
                setMatricula("")
                setCargo("")
                setDataDemissao("")
                ToastAndroid.show('Funcionário atualizado!', ToastAndroid.SHORT)
                setAtualizar(false)
                readStorage()
            })
            .catch(err => {
                console.log(err)
            });
    }

    useFocusEffect(
        React.useCallback(() => {
            readStorage();
        }, [])
    );

    const readStorage = async () => {
        let funcionario = JSON.parse(await AsyncStorage.getItem("funcionario"));

        fetch(`${Url.URL}/funcionarios/${funcionario}`)
            .then(resp => { return resp.json() })
            .then(data => {
                setFuncionario(data[0]);
                setDataDemissao(formatDate.formatBr(new Date()));
                setCargo(data[0].cargo);
                setMatricula(data[0].matricula);
                setLoading(false)
            })
            .catch(err => { console.log(err) });
    }

    return (
        <View style={gStyle.body}>
            {
                (atualizar !== true) ?
                    <View>
                        <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, (SCREEN_HEIGHT <= 592) ? { height: 110 } : {}]}>
                            <Ionicons name="arrow-back-circle-outline" size={35} color="#166B8A" onPress={() => { navigation.navigate('ListarFuncionarios') }} />
                            <LinearGradient colors={['rgb(2, 64, 87)', 'transparent']} style={gStyle.logo}>
                                <Text style={gStyle.headerText}>CASA ACOLHEDORA</Text>
                                <Text style={gStyle.headerText}>IRMÃ ANTÔNIA</Text>
                            </LinearGradient>
                        </View>
                        {
                            (loading === true)
                                ?
                                <View style={{ width: "70%", height: "80%", alignSelf: "center" }}>
                                    <LottieView source={gif} autoPlay loop />
                                </View>
                                :
                                <View style={(SCREEN_HEIGHT - (gStyle.logo.height) <= 500) ? { height: SCREEN_HEIGHT - 110 } : { height: "85%" }}>
                                    <ScrollView>
                                        <View style={{ width: "100%", height: 110, flexDirection: "row", alignItems: "center", marginTop: 10, justifyContent: "space-evenly" }}>
                                            <View style={[gStyle.cardInfo, gStyle.info, {width: "60%"}]}>
                                                <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>Matricula:</Text>
                                                <Text style={gStyle.textInfo}>{funcionario.matricula}</Text>
                                            </View>
                                            <Image source={(funcionario.foto === null || funcionario.foto === "null" || funcionario.foto === "" || funcionario.foto === "undefined") ? require("../../assets/user1.png") : { uri: funcionario.foto }} style={gStyle.imageUser} />
                                        </View>
                                        <View style={[gStyle.cardInfo, gStyle.info]}>
                                            <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>Nome:</Text>
                                            <Text style={gStyle.textInfo}>{funcionario.nome_completo}</Text>
                                        </View>
                                        <View style={[gStyle.cardInfo, gStyle.info]}>
                                            <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>RG:</Text>
                                            <Text style={gStyle.textInfo}>{funcionario.rg}</Text>
                                        </View>
                                        <View style={[gStyle.cardInfo, gStyle.info]}>
                                            <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>CPF:</Text>
                                            <Text style={gStyle.textInfo}>{funcionario.cpf}</Text>
                                        </View>
                                        <View style={[gStyle.cardInfo, gStyle.info]}>
                                            <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>Nascimento:</Text>
                                            <Text style={gStyle.textInfo}>{formatDate.formatBr(new Date(funcionario.data_nascimento))}</Text>
                                        </View>
                                        <View style={[gStyle.cardInfo, gStyle.info]}>
                                            <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>Cargo:</Text>
                                            <Text style={gStyle.textInfo}>{funcionario.cargo}</Text>
                                        </View>
                                        <View style={[gStyle.cardInfo, gStyle.info]}>
                                            <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>Sexo:</Text>
                                            <Text style={gStyle.textInfo}>{funcionario.sexo}</Text>
                                        </View>
                                        <View style={[gStyle.cardInfo, gStyle.info]}>
                                            <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>E-mail:</Text>
                                            <Text style={gStyle.textInfo}>{funcionario.email}</Text>
                                        </View>
                                        <View style={[gStyle.cardInfo, gStyle.info]}>
                                            <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>Data admissão:</Text>
                                            <Text style={gStyle.textInfo}>{formatDate.formatBr(new Date(funcionario.data_admissao))}</Text>
                                        </View>
                                        {
                                            (funcionario.data_demissao !== null)
                                                ?
                                                <View style={[gStyle.cardInfo, gStyle.info]}>
                                                    <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>Data demissão:</Text>
                                                    <Text style={gStyle.textInfo}>{formatDate.formatBr(new Date(funcionario.data_demissao))}</Text>
                                                </View>
                                                :
                                                <TouchableOpacity style={[gStyle.cardButton, { marginBottom: "5%" }]} onPress={() => { setAtualizar(true) }}>
                                                    <Text style={gStyle.buttonText}>Atualizar</Text>
                                                </TouchableOpacity>
                                        }
                                    </ScrollView>
                                </View>
                        }

                    </View>
                    :
                    <View>
                        <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, (SCREEN_HEIGHT <= 592) ? { height: 110 } : {}]}>
                            <Ionicons name="arrow-back-circle-outline" size={35} color="#166B8A" onPress={() => { setAtualizar(false) }} />
                            <LinearGradient colors={['rgb(2, 64, 87)', 'transparent']} style={gStyle.logo}>
                                <Text style={gStyle.headerText}>CASA ACOLHEDORA</Text>
                                <Text style={gStyle.headerText}>IRMÃ ANTÔNIA</Text>
                            </LinearGradient>
                        </View>
                        <View style={{ width: "100%", height: "80%" }}>
                        <Text style={css.text}>Cargo:</Text>
                            <TextInput value={cargo} onChangeText={setCargo} placeholder="Cargo..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                            <Text style={css.text}>Matrícula:</Text>
                            <TextInput value={matricula} onChangeText={setMatricula} placeholder="Matricula..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                            <Text style={css.text}>Data de demissão:</Text>
                            <TextInput value={dataDemissao} onChangeText={setDataDemissao} placeholder="Data demissão..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                            <TouchableOpacity style={gStyle.cardButton} onPress={() => { Atualizar() }}>
                                <Text style={gStyle.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            }
        </View>
    )
}

const css = StyleSheet.create({
    scroll: {
        width: '100%',
        height: '70%',
    },
    body2: {
        width: "100%",
        height: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: "column"
    },
    cardButton1: {
        backgroundColor: "rgb(22,107,138)",
        width: "35%",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 20
    },
    text:{
        color: "rgb(22,107,138)",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: "5%",
        marginTop: "5%" 
    }
})