import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView, Image, TextInput, Text, TouchableOpacity, ToastAndroid, Dimensions } from 'react-native';

import gStyle from "../../global/style"
import SelectMultiple from 'react-native-select-multiple'
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { Camera } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native';
import Url from '../../global/index'
import { LinearGradient } from 'expo-linear-gradient';
import { TextInputMask } from 'react-native-masked-text';
import formatDate from '../../Components/FormatDate/index'

import * as FileSystem from 'expo-file-system';

export default function CadastrarAssistido({ navigation }) {
    const SCREEN_HEIGHT = Dimensions.get('window').height;
    const camRef = useRef(null);
    const [permission, setPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [cam, setCam] = useState(false);

    const [selected, setSelected] = useState([]);
    const [comorbidade, setComorbidade] = useState([]);
    const [dorgas, setDorgas] = useState([]);
    const [idFunc, setIdFunc] = useState();
    const [nome, setNome] = useState("");
    const [nomeSocial, setNomeSocial] = useState("");
    const [rg, setRg] = useState("");
    const [cpf, setCpf] = useState("");
    const [antCriminal, setAntCriminal] = useState("");
    const [sexo, setSexo] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [estdCivil, setEstdCivil] = useState("");
    const [naturalidade, setNaturalidade] = useState("");
    const [cartCid, setCartCid] = useState("");
    const [cartSus, setCartSus] = useState("");
    const [foto, setFoto] = useState("");

    const onSelectionsChange = (selected) => {
        setSelected(selected);
    }

    const limpar = () => {
        setNome("");
        setNomeSocial("");
        setRg("");
        setCpf("");
        setAntCriminal("");
        setSexo("");
        setNascimento("");
        setEstdCivil("");
        setNaturalidade("");
        setCartCid("");
        setCartSus("");
        setSelected([]);
        setFoto("");
    }

    const getFunc = async () => {
        let value = await AsyncStorage.getItem('userdata');

        fetch(`${Url.URL}/funcionarios/${value}`)
            .then(resp => { return resp.json() })
            .then(async data => {
                const id = JSON.parse(data[0].id_funcionario)
                setIdFunc(id)
            })
    }

    const cadastrar = () => {
        let assistido = {
            id_funcionario: idFunc,
            nome_completo: nome,
            nome_social: nomeSocial,
            rg: rg,
            cpf: cpf,
            antecedente_criminal: antCriminal,
            data_nascimento: formatDate.formatUs(nascimento),
            estado_civil: estdCivil,
            naturalidade: naturalidade,
            sexo: sexo,
            cartao_cidadao: cartCid,
            cartao_sus: cartSus,
            foto: foto
        }

        fetch(`${Url.URL}/assistidos`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(assistido),
        })
            .then(resp => { return resp.json() })
            .then(async data => {
                if (data.err !== undefined) {
                    if (data.err.includes("Duplicate entry"))
                        ToastAndroid.show('CPF já existente!', ToastAndroid.SHORT)
                } else {

                    let saude = {
                        id_assistido: data.id_assistido,
                        comorbidades: selected
                    }

                    fetch(`${Url.URL}/assistido/saude`, {
                        "method": "POST",
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        "body": JSON.stringify(saude),
                    })
                        .then(resp => { return resp.json() })
                        .then(async data => {
                            ToastAndroid.show('Cadastro Efetuado!', ToastAndroid.SHORT)
                            limpar()
                            console.log(data)
                        })
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    const renderLabel = (label, style) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginLeft: 5 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{label}</Text>
                </View>
            </View>
        )
    }

    useFocusEffect(
        React.useCallback(() => {
            getFunc()

            fetch(`${Url.URL}/assistido/comorbidade`)
                .then(resp => { return resp.json() })
                .then(async data => {
                    let temp = JSON.stringify(data);
                    temp = temp.replace(/id_comorbidade/g, "value");
                    temp = temp.replace(/comorbidade/g, "label");
                    temp = JSON.parse(temp);

                    let tempC = [], tempD = [];

                    temp.forEach(item => {
                        if (item.tipo == 1) {
                            tempC.push(item);
                        } else {
                            tempD.push(item);
                        }
                    })

                    setComorbidade(tempC);
                    setDorgas(tempD);
                })
                .catch(err => { console.log(err) });
        }, [])
    );

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
                        <Camera style={{ width: "100%", height: "90%" }} type={type} ref={camRef}>
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
                                <Text style={[gStyle.buttonText, { color: "#166B8A", marginTop: 15 }]}>Dados Pessoais</Text>
                                <TextInput value={nome} onChangeText={setNome} placeholder="Nome..." style={[gStyle.cardInfo, gStyle.info]} />
                                <TextInput value={nomeSocial} onChangeText={setNomeSocial} placeholder="Nome social..." style={[gStyle.cardInfo, gStyle.info]} />
                                <TextInput value={rg} onChangeText={setRg} placeholder="RG..." style={[gStyle.cardInfo, gStyle.info]} />
                                <TextInputMask type={'cpf'} value={cpf} onChangeText={setCpf} placeholder="CPF..." style={[gStyle.cardInfo, gStyle.info]} />
                                <TextInput value={antCriminal} onChangeText={setAntCriminal} placeholder="Antecedente criminal..." style={[gStyle.cardInfo, gStyle.info]} />
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
                                <TextInputMask type={'datetime'} options={{ format: 'DD/MM/YYYY' }} value={nascimento} onChangeText={setNascimento} placeholder="Nascimento..." style={[gStyle.cardInfo, gStyle.info]} />
                                <TextInput value={estdCivil} onChangeText={setEstdCivil} placeholder="Estado civil..." style={[gStyle.cardInfo, gStyle.info]} />
                                <TextInput value={naturalidade} onChangeText={setNaturalidade} placeholder="Naturalidade..." style={[gStyle.cardInfo, gStyle.info]} />
                                <TextInput value={cartCid} onChangeText={setCartCid} placeholder="Cartão cidadão..." style={[gStyle.cardInfo, gStyle.info]} />
                                <TextInput value={cartSus} onChangeText={setCartSus} placeholder="Cartão do SUS..." style={[gStyle.cardInfo, gStyle.info]} />
                                <Text style={[gStyle.buttonText, { color: "#166B8A", marginTop: 15 }]}>Comorbidades</Text>
                                <SelectMultiple
                                    items={comorbidade}
                                    renderLabel={renderLabel}
                                    selectedItems={selected}
                                    onSelectionsChange={onSelectionsChange}
                                />
                                <Text style={[gStyle.buttonText, { color: "#166B8A", marginTop: 15 }]}>Psicoativos</Text>
                                <SelectMultiple
                                    items={dorgas}
                                    renderLabel={renderLabel}
                                    selectedItems={selected}
                                    onSelectionsChange={onSelectionsChange}
                                />
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
    select: {
        flex: 1,
        width: '85%',
        height: 50,
        alignItems: "center",
        alignSelf: "center"
    },
    buttons: {
        width: 55,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(100, 100, 100, 0.30)",
        borderRadius: 50
    }
})