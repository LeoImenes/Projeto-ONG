import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, TextInput, Text, TouchableOpacity, ToastAndroid, SafeAreaView} from 'react-native';

import global from "../../Global/Style"
import SelectMultiple from 'react-native-select-multiple'
import { Ionicons, Feather} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

export default function CadastrarAssistido({navigation, route}){
    const newFoto = route.params;

    const[selected, setSelected] = useState([]);
    const[comorbidade, setComorbidade] = useState([]);
    const[dorgas, setDorgas] = useState([]);
    const[idFunc, setIdFunc] = useState();
    const[nome, setNome] = useState("");
    const[nomeSocial, setNomeSocial] = useState("");
    const[rg, setRg] = useState("");
    const[cpf, setCpf] = useState("");
    const[antCriminal, setAntCriminal] = useState("");
    const[sexo,setSexo] = useState("");
    const[nascimento, setNascimento] = useState("");
    const[estdCivil, setEstdCivil] = useState("");
    const[naturalidade, setNaturalidade] = useState("");
    const[cartCid, setCartCid] = useState("");
    const[cartSus, setCartSus] = useState("");
    const[foto, setFoto] = useState("");
    const[type, setType] = useState(Camera.Constants.Type.back);
    const[permissao, setPermissao] = useState(null);

    onSelectionsChange = (selected) => {
        setSelected(selected);
    }

    const getFunc =  async() => {
        let value = await AsyncStorage.getItem('userdata');
        let id = JSON.parse(value)
        setIdFunc(id.id_funcionario)
    }

    const cadastrar = () => {
        let ano = nascimento.split('/')[2]
        let mes = nascimento.split('/')[1]
        let dia = nascimento.split('/')[0]
        
        let assistido = {
            id_funcionario: idFunc,
            nome_completo: nome,
            nome_social: nomeSocial,
            rg: rg,
            cpf: cpf,
            antecedente_criminal: antCriminal,
            data_nascimento: `${ano}-${mes}-${dia}`,
            estado_civil: estdCivil,
            naturalidade: naturalidade,
            sexo: sexo,
            cartao_cidadao: cartCid,
            cartao_sus: cartSus,
            foto: foto
        }
    
        // fetch(`http://10.87.207.27:3000/assistidos`, {
        fetch(`http://192.168.0.103:3000/assistidos`, {
          "method": "POST",
          "headers": {
              "Content-Type": "application/json"
          },
          "body": JSON.stringify(assistido),
        })
        .then(resp => {return resp.json()})
        .then(async data => {
            if(data.err !== undefined) {
                if(data.err.includes("Duplicate entry"))
                    ToastAndroid.show('CPF já existente!', ToastAndroid.SHORT)
            } else {
                let saude = {
                    id_assistido: data.id_assistido,
                    comorbidades: selected
                }

                // fetch(`http://10.87.207.27:3000/assistido/saude`, {
                    fetch(`http://192.168.0.103:3000/assistido/saude`, {
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "body": JSON.stringify(saude),
                })
                .then(resp => {return resp.json()})
                .then(async data => {
                    if(data.err !== undefined) {
                        console.log(data)
                    }else{
                        ToastAndroid.show('Cadastro Efetuado!', ToastAndroid.SHORT)
                        this.textInput.clear()
                    }
                })
            }
        })
        .catch(err => {
            console.log(err) 
        });
      }

      const renderLabel = (label, style) => {
        return (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginLeft: 5}}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>{label}</Text>
            </View>
          </View>
        )
      }

      useEffect(() => {     
        // fetch(`http://10.87.207.27:3000/assistido/comorbidade`)
        fetch(`http://192.168.0.103:3000/assistido/comorbidade`)
        .then(resp => {return resp.json()})
        .then(async data => {
            let temp = JSON.stringify(data);
            temp = temp.replace(/id_comorbidade/g, "value");
            temp = temp.replace(/comorbidade/g, "label");
            temp = JSON.parse(temp);

            let tempC = [], tempD = [];

            temp.forEach(item => {
                if(item.tipo == 1) {
                    tempC.push(item);
                }else {
                    tempD.push(item);
                }
            })
            
            setComorbidade(tempC);
            setDorgas(tempD);
        })
        .catch(err => { console.log(err) });
      }, [])

      const selecionarImagem = async () => {
        // let result = await ImagePicker.launchImageLibraryAsync({
        //     mediaTypes: ImagePicker.MediaTypeOptions.All,
        //     allowsEditing: true,
        //     aspect: [4, 3],
        //     quality: 1,
        //     base64: true
        // // });
        
        let item = newFoto.split(".")

        // console.log(item)
        
        if (newFoto.length > 0) {
            setFoto({
                // uri: 'data:image/jpeg;base64,' + result.base64,
                uri: `data:image/${item[item.length-1]};base64,`+newFoto
            })
        } else if(!result.cancelled) {
            ToastAndroid.show('Selecione uma imagem menor', ToastAndroid.SHORT);
        }
    }

    return(
        <View style={global.body} onLoad={getFunc()}>
            <View style={global.header}>
                <Ionicons name="arrow-back-circle-outline" style={{marginLeft: 5}} size={35} color="#166B8A" onPress={() => {navigation.navigate('Assistido')}} />
                <View style={global.cardTitle}>
                    <Text style={global.textTitle}>Casa Acolhedora</Text>
                    <Text style={global.textTitle}>Irmã Antônia</Text>
                </View>
            </View>
            <View style={global.scroll}>
                <ScrollView>
                    <Text style={css.title1}>Dados Pessoais</Text>
                    <TextInput value={nome} onChangeText={setNome} placeholder="Nome..." place style={global.info}></TextInput>
                    <TextInput value={nomeSocial} onChangeText={setNomeSocial} placeholder="Nome social..." place style={global.info}></TextInput>
                    <TextInput value={rg} onChangeText={setRg} placeholder="RG..." style={global.info}></TextInput>
                    <TextInput value={cpf} onChangeText={setCpf} placeholder="CPF..." style={global.info}></TextInput>
                    <TextInput value={antCriminal} onChangeText={setAntCriminal} placeholder="Antecedente criminal..." style={global.info}></TextInput>
                    <View style={{width: "80%", alignSelf: "center", borderBottomWidth: 2}}>
                        <Picker
                            selectedValue={sexo}
                            onValueChange={(itemValue, itemIndex) =>
                                setSexo(itemValue)
                        }>
                            <Picker.Item label="Sexo..." value="" style={{color: "gray"}}/>
                            <Picker.Item label="Feminino" value="Feminino" />
                            <Picker.Item label="Masculino" value="Masculino" />
                            <Picker.Item label="Outro" value="Outro" />
                        </Picker>
                    </View>
                    <TextInput value={nascimento} onChangeText={setNascimento} placeholder="Nascimento..." style={global.info}></TextInput>
                    <TextInput value={estdCivil} onChangeText={setEstdCivil} placeholder="Estado civil..." style={global.info}></TextInput>
                    <TextInput value={naturalidade} onChangeText={setNaturalidade} placeholder="Naturalidade..." style={global.info}></TextInput>
                    <TextInput value={cartCid} onChangeText={setCartCid} placeholder="Cartão cidadão..." style={global.info}></TextInput>
                    <TextInput value={cartSus} onChangeText={setCartSus} placeholder="Cartão do SUS..." style={global.info}></TextInput>
                    <Text style={css.title1}>Doenças</Text>
                    <View style={{flex: 1, width: '90%', height: 100, alignItems: "center", alignSelf: "center"}}>
                            <SelectMultiple
                                items={comorbidade}
                                renderLabel={renderLabel}
                                selectedItems={selected}
                                onSelectionsChange={onSelectionsChange}
                                />
                    </View>
                    <Text style={css.title2}>Psicoativos</Text>
                    <View style={css.select}>
                            <SelectMultiple
                                items={dorgas}
                                renderLabel={renderLabel}
                                selectedItems={selected}
                                onSelectionsChange={onSelectionsChange}
                                />
                    </View>
                    <View style={css.align}>
                        <Image source={( foto !== null ) ? foto : require("../../assets/user1.png")} style={global.imageUser}/>
                        {console.log(foto)}
                        {/* <TouchableOpacity style={css.alignIcon} onPress={() => {selecionarImagem()}}> */}
                        <TouchableOpacity style={css.alignIcon} onPress={() => {navigation.navigate("TelaCamera")}}>
                            <Feather name="camera" size={24} color="blue" style={{marginRight: 10}}/>
                            <Text style={{color: "blue", fontSize: 15, fontWeight: "bold"}}>Nova foto</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={global.cardButton1} onPress={() => {selecionarImagem()}}>
                        <Text style={global.buttonText1}>SALVAR</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

const css = StyleSheet.create({
    title1:{
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginTop: "5%"
    },
    title2:{
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginBottom: "5%"
    },
    align: {
        width: "80%",
        height: 150,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        alignSelf: "center"
    },
    alignIcon: {
        alignItems: "center",
        flexDirection: "row",
        marginBottom: "10%"
    },
    select: {
        flex: 1,
        width: '85%',
        height: 50,
        alignItems: "center",
        alignSelf: "center"
    }
})