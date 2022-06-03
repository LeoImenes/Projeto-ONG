import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TextInput, TouchableOpacity, ToastAndroid, Dimensions } from 'react-native';

import gStyle from '../../global/style'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from "lottie-react-native";
import Url from '../../global/index'
import { TextInputMask } from 'react-native-masked-text';
import SelectMultiple from 'react-native-select-multiple'
import gif from '../../assets/53184-user.json'
import formatDate from '../../Components/FormatDate/index'

export default function VerAssistido({ navigation }) {
    const SCREEN_HEIGHT = Dimensions.get('window').height;
    const [loading, setLoading] = useState(true);
    const [assistido, setAssistido] = useState([])

    const [editar, setEditar] = useState(false)
    const [editarFam, setEditarFam] = useState(false)
    const [familiar, setFamiliar] = useState(false)

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
    const [foto, setFoto] = useState(assistido.foto_depois);

    const [comorbidade, setComorbidade] = useState([]);
    const [psicoativos, setPsicoativos] = useState([]);
    const [selected, setSelected] = useState([]);
    const [dorgas, setDorgas] = useState([]);
    const [doencas, setDoencas] = useState([]);

    const [DadosFamiliar, setDadosFamiliar] = useState([])
    const [nomeFamiliar, setNomeFamiliar] = useState("");
    const [idFam, setIdFam] = useState("");
    const [rgFamiliar, setRgFamiliar] = useState("");
    const [parentescoFamiliar, setParentescoFamiliar] = useState("");
    const [emailFamiliar, setEmailFamiliar] = useState("");
    const [telefoneFamiliar, setTelefoneFamiliar] = useState("");
    const [enderecoFamiliar, setEnderecoFamiliar] = useState("");

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            readStorage();
            carregarFam();
            carregarComAss();
            carregarCom();
        }, [])
    );

    const onSelectionsChange = (selected) => {
        setSelected(selected);
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

    const readStorage = async () => {
        let assistido = JSON.parse(await AsyncStorage.getItem("assistido"));

        fetch(`${Url.URL}/assistidos/${assistido}`)
            .then(resp => { return resp.json() })
            .then(data => {
                setAssistido(data);
                setNome(data.nome_completo);
                setNomeSocial(data.nome_social);
                setRg(data.rg);
                setCpf(data.cpf);
                setAntCriminal(data.antecedente_criminal);
                setEstdCivil(data.estado_civil);
                setNaturalidade(data.naturalidade);
                setCartCid(data.cartao_cidadao);
                setCartSus(data.cartao_sus);
                setNascimento(formatDate.formatBr(new Date(data.data_nascimento)));
                setSexo(data.sexo);
            })
            .catch(err => { console.log(err) });
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
        setDadosFamiliar([])
        setNomeFamiliar("");
        setRgFamiliar("");
        setParentescoFamiliar("");
        setEmailFamiliar("");
        setTelefoneFamiliar("");
        setEnderecoFamiliar("");
    }

    const salvarEdicao = () => {
        let Assistido = {
            id_assistido: assistido.id_assistido,
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
            foto_depois: foto
        }

        fetch(`${Url.URL}/assistido/update`, {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(Assistido),
        })
            .then(resp => { return resp.json() })
            .then(data => {
                let met = "";

                (comorbidade.length > 0) ? met = "PUT" : met = "POST"

                fetch(`${Url.URL}/assistido/saude`, {
                    "method": met,
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "body": JSON.stringify({
                        id_assistido: assistido.id_assistido,
                        comorbidades: selected
                    }),
                })
                    .then(resp => { return resp.json() })
                    .then(async data => {
                        ToastAndroid.show('Atualizado!', ToastAndroid.SHORT)
                        limpar()
                        setEditar(false)
                        readStorage()
                        carregarComAss()
                        carregarFam()
                    })
            })
            .catch(err => {
                console.log(err)
            });
    }

    const cadastrarFamiliar = () => {
        let familiar = {
            id_assistido: assistido.id_assistido,
            nome_completo: nomeFamiliar,
            rg: rgFamiliar,
            telefone: telefoneFamiliar,
            email: emailFamiliar,
            parentesco: parentescoFamiliar,
            endereco: enderecoFamiliar
        }

        fetch(`${Url.URL}/assistido/familiar`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(familiar),
        })
            .then(resp => { return resp.json() })
            .then(data => {
                limpar()
                setFamiliar(false)
                carregarFam()
            })
            .catch(err => { console.log(err) });
    }

    const atualizarFamiliar = () => {
        let familiar = {
            id_familiar: idFam,
            nome_completo: nomeFamiliar,
            rg: rgFamiliar,
            telefone: telefoneFamiliar,
            email: emailFamiliar,
            parentesco: parentescoFamiliar,
            endereco: enderecoFamiliar
        }

        fetch(`${Url.URL}/assistido/update_familiar`, {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(familiar),
        })
            .then(resp => { return resp.json() })
            .then(data => {
                limpar()
                setEditarFam(false)
                carregarFam()
            })
            .catch(err => { console.log(err) });
    }

    const carregarFam = async () => {
        let idAs = JSON.parse(await AsyncStorage.getItem("assistido"));

        fetch(`${Url.URL}/assistido/busca_familiar/${idAs}`)
            .then(resp => { return resp.json() })
            .then(data => {
                (data.length > 0) ? setDadosFamiliar(data) : setDadosFamiliar(false)
            })
            .catch(err => {
                console.log(err)
            });
    }

    const dadosFamiliar = (item) => {
        setIdFam(item.id_familiar)
        setNomeFamiliar(item.Familiar);
        setRgFamiliar(item.RG);
        setParentescoFamiliar(item.Parentesco);
        setEmailFamiliar(item.Email_Familiar);
        setTelefoneFamiliar(item.Telefone_familiar);
        setEnderecoFamiliar(item.Endereco_Familiar);
    }

    const carregarCom = async () => {
        fetch(`${Url.URL}/assistido/comorbidade`)
            .then(resp => { return resp.json() })
            .then(async data => {
                let temp = JSON.stringify(data);
                temp = temp.replace(/id_comorbidade/g, "value");
                temp = temp.replace(/comorbidade/g, "label");
                temp = JSON.parse(temp);

                let tempC = [], tempD = [];

                temp.forEach(item => {
                    (item.tipo == 1) ? tempC.push(item) : tempD.push(item)
                })

                setDoencas(tempC);
                setDorgas(tempD);
            })
            .catch(err => { console.log(err) });
    }

    const carregarComAss = async () => {
        let idAs = JSON.parse(await AsyncStorage.getItem("assistido"));
        fetch(`${Url.URL}/assistido/saudeID/${idAs}`)
            .then(resp => { return resp.json() })
            .then(data => {
                let test1 = [], test2 = [];

                data.forEach((item) => {
                    (item.tipo === 0) ? test1.push(item) : test2.push(item)
                })
                setLoading(false)
                setPsicoativos(test1);
                setComorbidade(test2);

            })
            .catch(err => {
                console.log(err)
            });
    }

    return (
        <View style={gStyle.body}>
            <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, (SCREEN_HEIGHT <= 592) ? { height: 110 } : {}]}>
                <Ionicons name="arrow-back-circle-outline" size={35} color="#166B8A" onPress={() => {
                    setEditar(false)
                    navigation.dispatch(
                        CommonActions.navigate({
                            name: 'ListarAssistidos',
                            params: {},
                        })
                    );
                }} />
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
                            {
                                (editar === false)
                                    ?
                                    <View>
                                        <View style={css.images}>
                                            <View>
                                                <Image source={(assistido.foto_antes !== "null" && assistido.foto_antes !== "undefined" && assistido.foto_antes !== "") ? { uri: assistido.foto_antes } : require("../../assets/user1.png")} style={gStyle.imageUser} />
                                                <Text style={[gStyle.buttonText, { color: "#166B8A", marginTop: 15 }]}>Antes</Text>
                                            </View>
                                            <View>
                                                <Image source={(assistido.foto_depois !== "null" && assistido.foto_depois !== "undefined" && assistido.foto_depois !== "") ? { uri: assistido.foto_depois } : require("../../assets/user1.png")} style={gStyle.imageUser} />
                                                <Text style={[gStyle.buttonText, { color: "#166B8A", marginTop: 15 }]}>Depois</Text>
                                            </View>
                                        </View>
                                        <View style={[gStyle.cardInfo, gStyle.info]}>
                                            <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>Nome:</Text>
                                            <Text style={gStyle.textInfo}>{assistido.nome_completo}</Text>
                                        </View>
                                        <View style={[gStyle.cardInfo, gStyle.info]}>
                                            <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>Nome social:</Text>
                                            <Text style={gStyle.textInfo}>{assistido.nome_social}</Text>
                                        </View>
                                        <View style={[gStyle.cardInfo, gStyle.info]}>
                                            <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>RG:</Text>
                                            <Text style={gStyle.textInfo}>{assistido.rg}</Text>
                                        </View>
                                        <View style={[gStyle.cardInfo, gStyle.info]}>
                                            <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>CPF:</Text>
                                            <Text style={gStyle.textInfo}>{assistido.cpf}</Text>
                                        </View>
                                        <View style={[gStyle.cardInfo, gStyle.info]}>
                                            <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>Nascimento:</Text>
                                            <Text style={gStyle.textInfo}>{formatDate.formatBr(new Date(assistido.data_nascimento))}</Text>
                                        </View>
                                        <View style={[gStyle.cardInfo, gStyle.info]}>
                                            <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>Naturalidade:</Text>
                                            <Text style={gStyle.textInfo}>{assistido.naturalidade}</Text>
                                        </View>
                                        <View style={[gStyle.cardInfo, gStyle.info]}>
                                            <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>Sexo:</Text>
                                            <Text style={gStyle.textInfo}>{assistido.sexo}</Text>
                                        </View>
                                        <View style={[gStyle.cardInfo, gStyle.info]}>
                                            <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>Estado civíl:</Text>
                                            <Text style={gStyle.textInfo}>{assistido.estado_civil}</Text>
                                        </View>
                                        <View style={[gStyle.cardInfo, gStyle.info]}>
                                            <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>Cartão cidadão:</Text>
                                            <Text style={gStyle.textInfo}>{assistido.cartao_cidadao}</Text>
                                        </View>
                                        <View style={[gStyle.cardInfo, gStyle.info]}>
                                            <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>Cartão do SUS:</Text>
                                            <Text style={gStyle.textInfo}>{assistido.cartao_sus}</Text>
                                        </View>
                                        <View style={[gStyle.cardInfo, gStyle.info]}>
                                            <Text style={[gStyle.textInfo, { fontWeight: "bold" }]}>Antecedente:</Text>
                                            <Text style={gStyle.textInfo}>{assistido.antecedente_criminal}</Text>
                                        </View>
                                        <Text style={[gStyle.buttonText, { color: "#166B8A", marginTop: 15 }]}>Psicoativos: </Text>
                                        {
                                            (psicoativos.length > 0)
                                                ?
                                                <View>
                                                    {
                                                        psicoativos.map((item, index) => {
                                                            return (
                                                                <View key={index} style={[gStyle.cardInfo, gStyle.info]}>
                                                                    <Text style={gStyle.textInfo}>{item.Comorbidades}</Text>
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                </View>
                                                :
                                                <View style={{ width: "100%", height: 40, alignItems: "center", justifyContent: "center" }}>
                                                    <Text style={{ color: "gray", fontSize: 18, marginRight: 10 }}>Não possui</Text>
                                                </View>
                                        }
                                        <Text style={[gStyle.buttonText, { color: "#166B8A", marginTop: 15 }]}>Comorbidades:</Text>
                                        {
                                            (comorbidade.length > 0)
                                                ?
                                                <View>
                                                    {
                                                        comorbidade.map((item, index) => {
                                                            return (
                                                                <View key={index} style={[gStyle.cardInfo, gStyle.info]}>
                                                                    <Text style={gStyle.textInfo}>{item.Comorbidades}</Text>
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                </View>
                                                :
                                                <View style={{ width: "100%", height: 40, alignItems: "center", justifyContent: "center" }}>
                                                    <Text style={{ color: "gray", fontSize: 18, marginRight: 10 }}>Não possui</Text>
                                                </View>
                                        }
                                        <TouchableOpacity style={gStyle.cardButton} onPress={() => { setEditar(true) }}>
                                            <Text style={gStyle.buttonText}>Editar dados</Text>
                                        </TouchableOpacity>
                                        <Text style={[gStyle.buttonText, { color: "#166B8A", marginTop: "10%" }]}>Dados dos Familiares</Text>
                                        {
                                            (DadosFamiliar !== null && DadosFamiliar !== undefined && DadosFamiliar !== false)
                                                ?
                                                <View>
                                                    {
                                                        (editarFam === false)
                                                            ?
                                                            <View style={{ width: "100%", minHeight: 50 }}>
                                                                <ScrollView horizontal>
                                                                    {
                                                                        DadosFamiliar.map((item, index) => {
                                                                            return (
                                                                                <View key={index} style={{ width: 370, height: 400 }}>
                                                                                    <View style={[gStyle.cardInfo, gStyle.info]}>
                                                                                        <Text style={gStyle.textInfo}>Nome:</Text>
                                                                                        <Text style={gStyle.textInfo}>{item.Familiar}</Text>
                                                                                    </View>
                                                                                    <View style={[gStyle.cardInfo, gStyle.info]}>
                                                                                        <Text style={gStyle.textInfo}>Parentesco:</Text>
                                                                                        <Text style={gStyle.textInfo}>{item.Parentesco}</Text>
                                                                                    </View>
                                                                                    <View style={[gStyle.cardInfo, gStyle.info]}>
                                                                                        <Text style={gStyle.textInfo}>RG:</Text>
                                                                                        <Text style={gStyle.textInfo}>{item.RG}</Text>
                                                                                    </View>
                                                                                    <View style={[gStyle.cardInfo, gStyle.info]}>
                                                                                        <Text style={gStyle.textInfo}>Telefone:</Text>
                                                                                        <Text style={gStyle.textInfo}>{item.Telefone_familiar}</Text>
                                                                                    </View>
                                                                                    <View style={[gStyle.cardInfo, gStyle.info]}>
                                                                                        <Text style={gStyle.textInfo}>E-mail:</Text>
                                                                                        <Text style={gStyle.textInfo}>{item.Email_Familiar}</Text>
                                                                                    </View>
                                                                                    <View style={[gStyle.cardInfo, gStyle.info]}>
                                                                                        <Text style={gStyle.textInfo}>Endereço:</Text>
                                                                                        <Text style={gStyle.textInfo}>{item.Endereco_Familiar}</Text>
                                                                                    </View>
                                                                                    <FontAwesome name="pencil" size={24} color="#166B8A" style={{ alignSelf: "center", marginTop: 5 }} onPress={() => { setEditarFam(true), dadosFamiliar(item) }} />
                                                                                </View>

                                                                            )
                                                                        })
                                                                    }
                                                                </ScrollView>
                                                            </View>
                                                            :
                                                            <View style={{ width: 370, height: 470 }}>
                                                                <TextInput value={nomeFamiliar} onChangeText={setNomeFamiliar} placeholder="Nome..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                                                <TextInput value={rgFamiliar} onChangeText={setRgFamiliar} placeholder="RG..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                                                <TextInput value={parentescoFamiliar} onChangeText={setParentescoFamiliar} placeholder="Parentesco..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                                                <TextInputMask type={'cel-phone'} options={{ maskType: 'BRL', withDDD: true, dddMask: '(99)' }} value={telefoneFamiliar} onChangeText={setTelefoneFamiliar} placeholder="Telefone..." style={[gStyle.cardInfo, gStyle.info]} />
                                                                <TextInput value={emailFamiliar} onChangeText={setEmailFamiliar} placeholder="E-mail..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                                                <TextInput value={enderecoFamiliar} onChangeText={setEnderecoFamiliar} placeholder="Endereço..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                                                <View style={{ alignItems: 'center', justifyContent: 'space-evenly', flexDirection: "row", marginBottom: 20, marginTop: 20 }}>
                                                                    <TouchableOpacity onPress={() => { limpar(), setEditarFam(false), carregarFam() }} style={{ alignItems: 'center', justifyContent: 'center', width: "35%" }}>
                                                                        <Text style={{ fontSize: 18, color: "#166B8A", fontWeight: "bold" }}>Cancelar</Text>
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity style={[gStyle.cardButton, { marginTop: 0 }]} onPress={() => { atualizarFamiliar() }}>
                                                                        <Text style={gStyle.buttonText}>Atualizar</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                    }
                                                </View>
                                                :
                                                <View style={{ flexDirection: "row", width: 400, height: 50, alignItems: "center", justifyContent: "center" }}>
                                                    <Text style={{ color: "gray", fontSize: 18, marginRight: 10 }}>Nenhum familiar cadastrado</Text>
                                                    <Entypo name="emoji-sad" size={20} color="gray" />
                                                </View>
                                        }
                                        {
                                            (familiar === true)
                                                ?
                                                <View style={{ width: 370, height: 470 }}>
                                                    <Text style={[gStyle.buttonText, { color: "#166B8A", marginTop: 15 }]}>Novo Familiar</Text>
                                                    <TextInput value={nomeFamiliar} onChangeText={setNomeFamiliar} placeholder="Nome..." place style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                                    <TextInput value={rgFamiliar} onChangeText={setRgFamiliar} placeholder="RG..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                                    <TextInput value={parentescoFamiliar} onChangeText={setParentescoFamiliar} placeholder="Parentesco..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                                    <TextInputMask type={'cel-phone'} options={{ maskType: 'BRL', withDDD: true, dddMask: '(99)' }} value={telefoneFamiliar} onChangeText={setTelefoneFamiliar} placeholder="Telefone..." style={[gStyle.cardInfo, gStyle.info]} />
                                                    <TextInput value={emailFamiliar} onChangeText={setEmailFamiliar} placeholder="E-mail..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                                    <TextInput value={enderecoFamiliar} onChangeText={setEnderecoFamiliar} placeholder="Endereço..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                                    <View style={{ alignItems: 'center', justifyContent: 'space-evenly', flexDirection: "row", marginBottom: 20, marginTop: 20 }}>
                                                        <TouchableOpacity onPress={() => { limpar(), setFamiliar(false), carregarFam() }} style={{ alignItems: 'center', justifyContent: 'center', width: "35%" }}>
                                                            <Text style={{ fontSize: 18, color: "#166B8A", fontWeight: "bold" }}>Cancelar</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={[gStyle.cardButton, { marginTop: 0 }]} onPress={() => { cadastrarFamiliar() }}>
                                                            <Text style={gStyle.buttonText}>Salvar</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                :
                                                <TouchableOpacity style={[gStyle.cardButton, { marginTop: 10, marginBottom: 20 }]} onPress={() => { setFamiliar(true) }}>
                                                    <Text style={gStyle.buttonText}>Novo Familiar</Text>
                                                </TouchableOpacity>
                                        }
                                    </View>
                                    :
                                    <View style={gStyle.body}>
                                        <TextInput value={nome} onChangeText={setNome} placeholder="Nome..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                        <TextInput value={nomeSocial} onChangeText={setNomeSocial} placeholder="Nome social..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                        <TextInput value={rg} onChangeText={setRg} placeholder="RG..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                        <TextInputMask type={'cpf'} value={cpf} onChangeText={setCpf} placeholder="CPF..." style={[gStyle.cardInfo, gStyle.info]} />
                                        <TextInput value={antCriminal} onChangeText={setAntCriminal} placeholder="Antecedente criminal..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                        <View style={{ width: "90%", alignSelf: "center", borderBottomWidth: 2, borderBottomColor: "lightgray" }}>
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
                                        <TextInput value={estdCivil} onChangeText={setEstdCivil} placeholder="Estado civil..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                        <TextInput value={naturalidade} onChangeText={setNaturalidade} placeholder="Naturalidade..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                        <TextInput value={cartCid} onChangeText={setCartCid} placeholder="Cartão cidadão..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                        <TextInput value={cartSus} onChangeText={setCartSus} placeholder="Cartão do SUS..." style={[gStyle.cardInfo, gStyle.info]}></TextInput>
                                        <Text style={[gStyle.buttonText, { color: "#166B8A", marginTop: 15 }]}>Comorbidades:</Text>
                                        <SelectMultiple
                                            items={doencas}
                                            renderLabel={renderLabel}
                                            selectedItems={selected}
                                            onSelectionsChange={onSelectionsChange}
                                        />
                                        <Text style={[gStyle.buttonText, { color: "#166B8A", marginTop: 15 }]}>Psicoativos:</Text>
                                        <SelectMultiple
                                            items={dorgas}
                                            renderLabel={renderLabel}
                                            selectedItems={selected}
                                            onSelectionsChange={onSelectionsChange}
                                        />
                                        <View style={{ alignItems: 'center', justifyContent: 'space-evenly', flexDirection: "row", marginBottom: 15 }}>
                                            <TouchableOpacity onPress={() => { setEditar(false) }} style={{ alignItems: 'center', justifyContent: 'center', width: "35%", height: 45, marginTop: 20 }}>
                                                <Text style={[gStyle.buttonText, { color: "#166B8A", marginTop: 15 }]}>Cancelar</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={gStyle.cardButton} onPress={() => { salvarEdicao() }}>
                                                <Text style={gStyle.buttonText}>Salvar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                            }
                        </ScrollView>
                    </View>
            }
        </View>
    )
}

const css = StyleSheet.create({
    images: {
        width: "100%",
        height: 180,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    textArea: {
        width: "90%",
        alignSelf: 'center',
        padding: 10,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 15
    }
})