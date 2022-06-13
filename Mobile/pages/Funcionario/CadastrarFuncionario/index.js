import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView, Image, TextInput, Text, TouchableOpacity, ToastAndroid, Dimensions } from 'react-native';

import gStyle from "../../global/style"
import Url from '../../global/index'
import { Ionicons, Feather, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { Picker } from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text';
import { LinearGradient } from 'expo-linear-gradient';
import formatDate from '../../Components/FormatDate/index'
import md5 from 'md5';

export default function CadastrarFuncionario({ navigation }) {
    const SCREEN_HEIGHT = Dimensions.get('window').height;
    const camRef = useRef(null);
    const [permission, setPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [cam, setCam] = useState(false);
    const [mostrar1, setMostrar1] = useState(true);

    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState("")
    const [rg, setRg] = useState("");
    const [cpf, setCpf] = useState("");
    const [estdCivil, setEstdCivil] = useState("");
    const [sexo, setSexo] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cargo, setCargo] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [dataAdmissao, setDataAdmissao] = useState("");
    const [foto, setFoto] = useState("");

    const limpar = () => {
        setNome("");
        setRg("");
        setCpf("");
        setSexo("");
        setNascimento("");
        setCargo("");
        setDataAdmissao("");
        setEmail("");
        setSenha("");
        setFoto("");
        setMatricula("");
        setEstdCivil("")
    }

    const cadastrar = () => {
        let funcionario = {
            nome_completo: nome,
            matricula: matricula,
            rg: rg,
            cpf: cpf,
            data_nascimento: formatDate.formatUs(nascimento),
            estado_civil: estdCivil,
            sexo: sexo,
            cargo: cargo,
            email: email,
            senha: md5(senha),
            data_admissao: formatDate.formatUs(dataAdmissao),
            foto: foto
        }

        fetch(`${Url.URL}/funcionario`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(funcionario),
        })
            .then(resp => { return resp.json() })
            .then(data => {
                if (data.err !== undefined) {
                    console.log(data.err)
                    if (data.err.includes("Duplicate entry"))
                        ToastAndroid.show('CPF já existente!', ToastAndroid.SHORT)
                } else {
                    ToastAndroid.show('Cadastro Efetuado!', ToastAndroid.SHORT)
                    limpar()
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setPermission(status === 'granted');
        })();
    }, []);

    if (permission === null) {
        return <View />;
    }

    if (permission === false) {
        return <Text> Acesso negado!</Text>;
    }

    async function takePicture() {
        if (camRef) {
            const data = await camRef.current.takePictureAsync();
            data.width = 1000
            data.height = 1000
            let base = await FileSystem.readAsStringAsync(data.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            let url = data.uri.split(".");
            let b64 = `data:image/${url[url.length - 1]};base64,${base}`;

            setFoto(b64)
            setCam(false)
        }
    }

    return (
        <View style={gStyle.body}>
            {
                (cam === true)
                    ?
                    <View style={{ flex: 1 }}>
                        <View style={{ height: '10%', backgroundColor: "#222", justifyContent: "center" }}></View>
                        <Camera style={{ width: "100%", height: "90%" }} type={type} ref={camRef} quality={0}>
                            <View style={{ width: '100%', height: "10%", flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: "rgba(100, 100, 100, 0.30)", bottom: 0, position: "absolute" }}>
                                <View style={css.buttons}>
                                    <Ionicons name="arrow-back-circle-outline" size={35} color="#fff" onPress={() => { setCam(false) }} />
                                </View>
                                <TouchableOpacity onPress={takePicture} style={css.buttons}>
                                    <MaterialCommunityIcons name="camera-iris" size={50} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity style={css.buttons} onPress={() => {
                                    setType(
                                        type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back
                                    )
                                }}
                                >
                                    <Ionicons name="md-camera-reverse-outline" size={30} color="white" />
                                </TouchableOpacity>
                            </View>
                        </Camera>
                    </View>
                    :
                    <View style={gStyle.body}>
                        <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, (SCREEN_HEIGHT <= 592) ? { height: 110 } : {}]}>
                            <Ionicons name="arrow-back-circle-outline" size={35} color="#166B8A" onPress={() => { navigation.navigate('Home'), limpar() }} />
                            <LinearGradient colors={['rgb(2, 64, 87)', 'transparent']} style={gStyle.logo}>
                                <Text style={gStyle.headerText}>CASA ACOLHEDORA</Text>
                                <Text style={gStyle.headerText}>IRMÃ ANTÔNIA</Text>
                            </LinearGradient>
                        </View>
                        <View style={(SCREEN_HEIGHT - (gStyle.logo.height) <= 500) ? { height: SCREEN_HEIGHT - 110 } : { height: "85%" }}>
                            <ScrollView>
                                <TextInput value={nome} onChangeText={setNome} placeholder="Nome..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                <TextInput value={matricula} onChangeText={setMatricula} placeholder="Matrícula..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                <TextInput value={rg} onChangeText={setRg} placeholder="RG..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                <TextInputMask type={'cpf'} value={cpf} onChangeText={setCpf} placeholder="CPF..." style={[gStyle.cardInfo, gStyle.info]} />
                                <TextInputMask type={'datetime'} options={{ format: 'DD/MM/YYYY' }} value={nascimento} onChangeText={setNascimento} placeholder="Nascimento..." style={[gStyle.cardInfo, gStyle.info]} />
                                <View style={{ height: 40, borderBottomWidth: 2, margin: 10, borderBottomColor: 'lightgray', width: "90%", alignSelf: "center", justifyContent: "center" }}>
                                    <Picker
                                        selectedValue={cargo}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setCargo(itemValue)
                                        }>
                                        <Picker.Item label="Cargo..." value="" style={{ color: "gray", fontSize: 15 }} />
                                        <Picker.Item label="Diretor" value="Diretor" style={{ fontSize: 15 }} />
                                        <Picker.Item label="Assistente Social" value="Assistente Social" style={{ fontSize: 15 }} />
                                        <Picker.Item label="Voluntário" value="Voluntário" style={{ fontSize: 15 }} />
                                        <Picker.Item label="Psicólogo" value="Psicólogo" style={{ fontSize: 15 }} />
                                        <Picker.Item label="Tesoureiro" value="Tesoureiro" style={{ fontSize: 15 }} />
                                        <Picker.Item label="Auxiliar" value="Auxiliar" style={{ fontSize: 15 }} />
                                    </Picker>
                                </View>
                                <TextInput value={estdCivil} onChangeText={setEstdCivil} placeholder="Estado Civíl..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                <View style={{ height: 40, borderBottomWidth: 2, margin: 10, borderBottomColor: 'lightgray', width: "90%", alignSelf: "center", justifyContent: "center" }}>
                                    <Picker
                                        selectedValue={sexo}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSexo(itemValue)
                                        }>
                                        <Picker.Item label="Sexo..." value="" style={{ color: "gray", fontSize: 15 }} />
                                        <Picker.Item label="Feminino" value="Feminino" style={{ fontSize: 15 }} />
                                        <Picker.Item label="Masculino" value="Masculino" style={{ fontSize: 15 }} />
                                        <Picker.Item label="Outro" value="Outro" style={{ fontSize: 15 }} />
                                    </Picker>
                                </View>
                                <TextInputMask type={'datetime'} options={{ format: 'DD/MM/YYYY' }} value={dataAdmissao} onChangeText={setDataAdmissao} placeholder="Data admissão..." style={[gStyle.cardInfo, gStyle.info]} />
                                <TextInput value={email} onChangeText={setEmail} placeholder="E-mail..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                <View style={[gStyle.cardInfo, gStyle.info]}>
                                    <TextInput style={{ width: "90%", height: "100%" }} secureTextEntry={mostrar1} placeholder="Senha" value={senha} onChangeText={setSenha} />
                                    <TouchableOpacity style={{ width: "10%", height: "100%" }} onPress={() => { setMostrar1(!mostrar1) }}>
                                        {
                                            (mostrar1 === true)
                                                ?
                                                <FontAwesome name="eye" size={24} color="black" />
                                                :
                                                <FontAwesome name="eye-slash" size={24} color="black" />
                                        }
                                    </TouchableOpacity>
                                </View>
                                <View style={css.align}>
                                    {
                                        (foto === null || foto === undefined || foto === "") ?
                                            <Image source={require("../../assets/user1.png")} style={gStyle.imageUser} />
                                            :
                                            <Image source={{ "uri": foto }} style={gStyle.imageUser} />
                                    }
                                    <TouchableOpacity style={css.alignIcon} onPress={() => { setCam(true) }}>
                                        <Feather name="camera" size={24} color="#4169E1" style={{ marginRight: 10 }} />
                                        <Text style={{ color: "#4169E1", fontSize: 15, fontWeight: "bold" }}>Add foto</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={[gStyle.cardButton, { margin: "5%" }]} onPress={() => { cadastrar() }}>
                                    <Text style={gStyle.buttonText}>Salvar</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
            }
        </View>
    )
}

const css = StyleSheet.create({
    align: {
        width: "80%",
        minHeight: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        alignSelf: "center",
        margin: "5%"
    },
    alignIcon: {
        flexDirection: "row",
        alignItems: "center"
    },
    imageAlign: {
        width: 110,
        height: 100,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    body2: {
        width: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: "column"
    }
})