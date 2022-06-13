import React, { useState, useEffect } from 'react';
import {  View, Text, Image, ScrollView, TouchableOpacity, Dimensions, TextInput, ToastAndroid } from 'react-native';

import gStyle from "../../global/style"
import Url from '../../global/index'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import formatDate from '../../Components/FormatDate/index'
import gif from '../../assets/53184-user.json'
import LottieView from "lottie-react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text';

export default function MeuPerfil({ navigation }) {
    const [funcionario, setFuncionario] = useState({});
    const [loading, setLoading] = useState(true);
    const [atualizar, setAtualizar] = useState(false);
    const SCREEN_HEIGHT = Dimensions.get('window').height;
    const [nome, setNome] = useState("");
    const [rg, setRg] = useState("");
    const [cpf, setCpf] = useState("");
    const [estdCivil, setEstdCivil] = useState("");
    const [sexo, setSexo] = useState("");
    const [nascimento, setNascimento] = useState("");

    useEffect(() => {
        getUser()
    }, []);

    const getUser = async () => {
        let value = await AsyncStorage.getItem('userdata');
        if (value !== null) {
            value = JSON.parse(value);

            fetch(`${Url.URL}/funcionarios/${value}`)
                .then(resp => { return resp.json() })
                .then(data => {
                    setFuncionario(data[0])
                    setLoading(false)
                    setNome(data[0].nome_completo);
                    setRg(data[0].rg);
                    setCpf(data[0].cpf);
                    setSexo(data[0].sexo);
                    setNascimento(formatDate.formatBr(new Date(data[0].data_nascimento)));
                    setEstdCivil(data[0].estado_civil);
                })
                .catch(err => { console.log(err) })
        }
    }

    const att = async () => {
        let value = await AsyncStorage.getItem('userdata');
        value = JSON.parse(value);

        let item = {
            matricula: value,
            nome_completo: nome,
            rg: rg,
            cpf: cpf,
            data_nascimento: formatDate.formatUs(nascimento),
            estado_civil: estdCivil,
            sexo: sexo,
            foto: funcionario.foto,
        }
        
        fetch(`${Url.URL}/funcionario/dados`, {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(item),
        })
            .then(resp => { return resp.json() })
            .then(data => {
                ToastAndroid.show('Dados atualizados!', ToastAndroid.SHORT)
                setAtualizar(false)
                limpar()
                getUser()
            })
            .catch(err => {
                console.log(err)
            });
    }

    const limpar = () => {
        setNome("");
        setRg("");
        setCpf("");
        setSexo("");
        setNascimento("");
        setEstdCivil("");
    }

    return (
        <View style={gStyle.body}>
            {
                (loading === true)
                    ?
                    <View style={{ width: "70%", height: "80%", alignSelf: "center" }}>
                        <LottieView source={gif} autoPlay loop />
                    </View>
                    :
                    <View style={gStyle.body}>
                        {
                            (atualizar === true)
                                ?
                                <View style={gStyle.body}>
                                    <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, (SCREEN_HEIGHT <= 592) ? { height: 110 } : {}]}>
                                        <Ionicons name="arrow-back-circle-outline" size={35} color="#166B8A" onPress={() => { setAtualizar(false) }} />
                                        <LinearGradient colors={['rgb(2, 64, 87)', 'transparent']} style={gStyle.logo}>
                                            <Text style={gStyle.headerText}>CASA ACOLHEDORA</Text>
                                            <Text style={gStyle.headerText}>IRMÃ ANTÔNIA</Text>
                                        </LinearGradient>
                                    </View>
                                    <Text style={[gStyle.buttonText, { color: "#166B8A", marginTop: 15 }]}>Alterar informações</Text>
                                    <TextInput value={nome} onChangeText={setNome} placeholder="Nome..." style={[gStyle.cardInfo, gStyle.info]} />
                                    <TextInput value={rg} onChangeText={setRg} placeholder="RG..." style={[gStyle.cardInfo, gStyle.info]} />
                                    <TextInputMask type={'cpf'} value={cpf} onChangeText={setCpf} placeholder="CPF..." style={[gStyle.cardInfo, gStyle.info]} />
                                    <View style={{ height: 40, borderBottomWidth: 2, margin: 10, borderBottomColor: 'lightgray', width: "90%", alignSelf: "center", justifyContent: "center" }}>
                                        <Picker
                                            selectedValue={sexo}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setSexo(itemValue)
                                            }>
                                            <Picker.Item label="Sexo..." value="" style={{ color: "gray" }} />
                                            <Picker.Item label="Feminino" value="Feminino" />
                                            <Picker.Item label="Masculino" value="Masculino" />
                                            <Picker.Item label="Outro" value="Outro" />
                                        </Picker>
                                    </View>
                                    <TextInputMask type={'datetime'} options={{ format: 'DD/MM/YYYY' }} value={nascimento} onChangeText={setNascimento} placeholder="Nascimento..." style={[gStyle.cardInfo, gStyle.info]} />
                                    <TextInput value={estdCivil} onChangeText={setEstdCivil} placeholder="Estado civíl..." style={[gStyle.cardInfo, gStyle.info]} />
                                    <TouchableOpacity style={gStyle.cardButton} onPress={() => { att() }}>
                                        <Text style={gStyle.buttonText}>Salvar</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={gStyle.body}>
                                    <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, (SCREEN_HEIGHT <= 592) ? { height: 110 } : {}]}>
                                        <Ionicons name="arrow-back-circle-outline" size={35} color="#166B8A" onPress={() => { navigation.navigate('Home') }} />
                                        <LinearGradient colors={['rgb(2, 64, 87)', 'transparent']} style={gStyle.logo}>
                                            <Text style={gStyle.headerText}>CASA ACOLHEDORA</Text>
                                            <Text style={gStyle.headerText}>IRMÃ ANTÔNIA</Text>
                                        </LinearGradient>
                                    </View>
                                    <View style={(SCREEN_HEIGHT - (gStyle.logo.height) <= 500) ? { height: SCREEN_HEIGHT - 110 } : { height: "85%" }}>
                                        <ScrollView>
                                            <View style={{ width: "100%", height: 110, flexDirection: "row", alignItems: "center", marginTop: 10, justifyContent: "space-evenly" }}>
                                                <Image source={(funcionario.foto === "null" || funcionario.foto === "" || funcionario.foto === "undefined" || funcionario.foto === null || funcionario.foto === undefined) ? require("../../assets/user1.png") : { uri: funcionario.foto }} style={gStyle.imageUser} />
                                                <TouchableOpacity style={{ alignItems: "center" }} onPress={() => { setAtualizar(true) }}>
                                                    <MaterialCommunityIcons name="update" size={24} color="#4169E1" />
                                                    <Text style={{ color: "#4169E1", fontSize: 18, fontWeight: "bold" }}>Atualizar</Text>
                                                    <Text style={{ color: "#4169E1", fontSize: 18, fontWeight: "bold" }}>dados</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={[gStyle.cardInfo, gStyle.info]}>
                                                <Text style={gStyle.textInfo}>Nome:</Text>
                                                <Text style={gStyle.textInfo}>{funcionario.nome_completo}</Text>
                                            </View>
                                            <View style={[gStyle.cardInfo, gStyle.info]}>
                                                <Text style={gStyle.textInfo}>E-mail:</Text>
                                                <Text style={gStyle.textInfo}>{funcionario.email}</Text>
                                            </View>
                                            <View style={[gStyle.cardInfo, gStyle.info]}>
                                                <Text style={gStyle.textInfo}>Matrícula:</Text>
                                                <Text style={gStyle.textInfo}>{funcionario.matricula}</Text>
                                            </View>
                                            <View style={[gStyle.cardInfo, gStyle.info]}>
                                                <Text style={gStyle.textInfo}>RG:</Text>
                                                <Text style={gStyle.textInfo}>{funcionario.rg}</Text>
                                            </View>
                                            <View style={[gStyle.cardInfo, gStyle.info]}>
                                                <Text style={gStyle.textInfo}>CPF:</Text>
                                                <Text style={gStyle.textInfo}>{funcionario.cpf}</Text>
                                            </View>
                                            <View style={[gStyle.cardInfo, gStyle.info]}>
                                                <Text style={gStyle.textInfo}>Nascimento:</Text>
                                                <Text style={gStyle.textInfo}>{formatDate.formatBr(new Date(funcionario.data_nascimento))}</Text>
                                            </View>
                                            <View style={[gStyle.cardInfo, gStyle.info]}>
                                                <Text style={gStyle.textInfo}>Estado civíl:</Text>
                                                <Text style={gStyle.textInfo}>{funcionario.estado_civil}</Text>
                                            </View>
                                            <View style={[gStyle.cardInfo, gStyle.info]}>
                                                <Text style={gStyle.textInfo}>Cargo:</Text>
                                                <Text style={gStyle.textInfo}>{funcionario.cargo}</Text>
                                            </View>
                                            <View style={[gStyle.cardInfo, gStyle.info]}>
                                                <Text style={gStyle.textInfo}>Sexo:</Text>
                                                <Text style={gStyle.textInfo}>{funcionario.sexo}</Text>
                                            </View>
                                            <View style={[gStyle.cardInfo, gStyle.info]}>
                                                <Text style={gStyle.textInfo}>Data admissão:</Text>
                                                <Text style={gStyle.textInfo}>{formatDate.formatBr(new Date(funcionario.data_admissao))}</Text>
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                        }
                    </View>
            }
        </View>
    )
}
