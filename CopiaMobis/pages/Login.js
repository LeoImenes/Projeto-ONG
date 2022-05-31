import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';

import gStyle from './global/style'
import StatusBar from './Components/StatusBar/Index'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';
import Url from './global/index';

export default function Login({ navigation }) {
    const [recPassword, setRecpassword] = useState(false);
    const [show1, setShow1] = useState(true);
    const [show2, setShow2] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [cpf, setCpf] = useState("");

    useEffect(async () => {
        if (await AsyncStorage.getItem('userdata') !== null) {
            navigation.navigate("ContainerHome");
        }
    }, [])

    const authenticator = () => {
        let funcionario = {
            email: email,
            senha: password
        }

        fetch(`${Url.URL}/funcionarios`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(funcionario),
        })
            .then(resp => { return resp.json() })
            .then(async data => {
                if (data.id_funcionario !== undefined) {
                    await AsyncStorage.setItem('userdata', JSON.stringify(data.matricula));
                    navigation.navigate('ContainerHome');
                    setEmail("")
                    setPassword("")
                }
            })
            .catch(err => {
                ToastAndroid.show('Email ou Senha Inválidos!', ToastAndroid.LONG);
                console.log(err)
            });
    }

    const recPass = () => {
        let funcionario = {
            email: newEmail,
            cpf: cpf,
            nova_senha: newPassword
        }

        fetch(`${Url.URL}/funcionario/reset_senha`, {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(funcionario),
        })
            .then(resp => { return resp.json() })
            .then(async data => {
                if (data !== undefined) {
                    await AsyncStorage.setItem('userdata', JSON.stringify(data));
                    setNewEmail('')
                    setNewPassword('')
                    setCpf('')
                    ToastAndroid.show('Senha alterada com sucesso!', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Não foi possivel alterar a senha!', ToastAndroid.SHORT);
                }
            })
            .catch(err => { console.log(err) });
    }

    return (
        <View style={gStyle.body}>
            <StatusBar />
            {
                (recPassword)
                    ?
                    <View style={[css.container, { backgroundColor: "rgb(22,107,138)", paddingTop: 35 }]}>
                        <Ionicons name="arrow-back-circle-outline" style={gStyle.arrow} size={35} color="white" onPress={() => setRecpassword(false)} />
                        <Text style={[css.title, { color: "white" }]}>Recuperar senha</Text>
                        <View style={[css.align, { height: "50%" }]}>
                            <TextInput placeholder={"E-mail..."} value={newEmail} onChangeText={setNewEmail} placeholderTextColor={"white"} style={[gStyle.input, { borderBottomColor: "white", color: "white" }]}></TextInput>
                            <TextInputMask
                                style={[gStyle.input, { borderBottomColor: "white", color: "white" }]}
                                placeholder="CPF..."
                                placeholderTextColor="white"
                                type={'cpf'}
                                value={cpf}
                                onChangeText={setCpf}
                            />
                            <View style={[gStyle.input, { flexDirection: "row", borderBottomColor: "white" }]}>
                                <TextInput placeholder={"Nova senha..."} value={newPassword} onChangeText={setNewPassword} secureTextEntry={show2} placeholderTextColor={"white"} style={{ width: "90%", height: "100%", color: "white" }}></TextInput>
                                <TouchableOpacity style={{ width: "10%", height: "100%" }} onPress={() => { setShow2(!show2) }}>
                                    {
                                        (show2 === true)
                                            ?
                                            <FontAwesome name="eye" size={24} color="white" />
                                            :
                                            <FontAwesome name="eye-slash" size={24} color="white" />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={[gStyle.cardButton, { backgroundColor: "white" }]} onPress={() => { recPass() }}>
                            <Text style={[gStyle.buttonText, { color: "rgb(22,107,138)" }]}>SALVAR</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={css.container}>
                        <LinearGradient colors={['rgb(2, 64, 87)', 'transparent']} style={gStyle.logo}>
                            <Text style={gStyle.headerText}>CASA ACOLHEDORA</Text>
                            <Text style={gStyle.headerText}>IRMÃ ANTÔNIA</Text>
                        </LinearGradient>
                        <Text style={[css.title]}>Login</Text>
                        <View style={css.align}>
                            <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} style={gStyle.input} />
                            <View style={[gStyle.input, { flexDirection: "row" }]}>
                                <TextInput placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry={show1} style={{ width: "90%", height: "100%" }} />
                                <TouchableOpacity style={{ width: "10%", height: "100%" }} onPress={() => { setShow1(!show1) }}>
                                    {
                                        (show1 === true)
                                            ?
                                            <FontAwesome name="eye" size={24} color="black" />
                                            :
                                            <FontAwesome name="eye-slash" size={24} color="black" />
                                    }
                                </TouchableOpacity>
                            </View>
                            <Text style={css.button} onPress={() => { setRecpassword(true) }}>Esqueci a senha</Text>
                        </View>
                        <TouchableOpacity style={[gStyle.cardButton]} onPress={() => authenticator()}>
                            <Text style={gStyle.buttonText}>ENTRAR</Text>
                        </TouchableOpacity>

                    </View>
            }
        </View>
    )
}

const css = StyleSheet.create({
    title: {
        color: "black",
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: "5%",
        marginBottom: "5%"
    },
    container: {
        flex: 1,
        alignItems: "center"
    },
    button: {
        color: "rgb(22,107,138)",
        fontWeight: "bold",
        fontSize: 14,
        marginRight: -190,
        marginTop: -10
    },
    align: {
        width: "100%",
        height: "45%",
        alignItems: "center",
        justifyContent: "space-evenly",
    }
})