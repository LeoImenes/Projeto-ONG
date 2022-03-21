import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, TextInput, Text} from 'react-native';

import global from "../../Global/Style"
import { Feather } from '@expo/vector-icons';
import SelectMultiple from 'react-native-select-multiple'
import CheckBox from '@react-native-community/checkbox';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastrarAssistido({navigation}){
    const[selected, setSelected] = useState([]);
    const[comorbidade, setComorbidade] = useState({
        doencas:[],
        dorgas:[],
    });
    const[idFunc, setIdFunc] = useState();
    const[nome, setNome] = useState("");
    const[nomeSocial, setNomeSocial] = useState("");
    const[rg, setRg] = useState("");
    const[cpf, setCpf] = useState("");
    const[sexo,setSexo] = useState("");
    const[nascimento, setNascimento] = useState("");
    const[mae, setMae] = useState("");
    const[pai, setPai] = useState("");
    const[estdCivil, setEstdCivil] = useState("");
    const[naturalidade, setNaturalidade] = useState("");
    const[cartCid, setCartCid] = useState("");
    const[cartSus, setCartSus] = useState("");
    const[foto, setFoto] = useState("");
    const [toggleCheckBox, setToggleCheckBox] = useState(false)


    onSelectionsChange = (selected) => {
        setSelected(selected);
    }

    const getFunc =  async() => {
        let value = await AsyncStorage.getItem('userdata');
        let id = JSON.parse(value)
        setIdFunc(id.id_funcionario)
    }

    const cadastrar = () => {
        let assistido = {
            id_funcionario: idFunc,
            nome_completo: nome,
            nome_social: nomeSocial,
            rg: rg,
            cpf: cpf,
            data_nascimento: nascimento,
            estado_civil: estdCivil,
            naturalidade: naturalidade,
            sexo: sexo,
            cartao_cidadao: cartCid,
            cartao_sus: cartSus,
            foto: foto
        }
    
        fetch(`http://10.87.207.27:3000/assistidos`, {
          "method": "POST",
          "headers": {
              "Content-Type": "application/json"
          },
          "body": JSON.stringify(assistido),
        })
        .then(resp => {return resp.json()})
        .then(async data => {
          console.log(data)
        })
        .catch(err => { console.log(err) });
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
        fetch(`http://10.87.207.27:3000/assistido/comorbidade`)
        .then(resp => {return resp.json()})
        .then(async data => {
            let temp = JSON.stringify(data);
            temp = temp.replace(/id_comorbidade/g, "value");
            temp = temp.replace(/comorbidade/g, "label");
            temp = JSON.parse(temp);

            let tempC = [], tempD = [];

            temp.forEach(item => {
                console.log(item);
                if(item.tipo == 1) {
                    setComorbidade(prevState => ({ doencas: [...prevState.doencas, item] }))
                    //tempC.push(item);
                }else {
                    setComorbidade(prevState => ({ dorgas: [...prevState.dorgas, item] }))
                    //tempD.push(item);
                }
            })
            
            //setComorbidade(tempC);
            //setDorgas(tempD);
        })
        .catch(err => { console.log(err) });

        console.log(comorbidade);

      }, [])

    return(
        <View style={css.body} onLoad={getFunc()}>
            <View style={css.alignHeader}>
                <Ionicons name="arrow-back-circle-outline" style={{marginLeft: 5}} size={35} color="#166B8A" onPress={() => {navigation.navigate('Assistido')}} />
                <View style={css.logo}>
                    <Text style={css.text}>Casa Acolhedora</Text>
                    <Text style={css.text}>Irmã Antônia</Text>
                </View>
            </View>
            <View style={css.scrollView}>
                <ScrollView>
                    <Text style={css.title}>Dados Pessoais</Text>
                    <TextInput value={nome} onChangeText={setNome} placeholder="Nome..." place style={global.info}></TextInput>
                    <TextInput value={nomeSocial} onChangeText={setNomeSocial} placeholder="Nome social..." place style={global.info}></TextInput>
                    <TextInput value={rg} onChangeText={setRg} placeholder="RG..." style={global.info}></TextInput>
                    <TextInput value={cpf} onChangeText={setCpf} placeholder="CPF..." style={global.info}></TextInput>
                    {/* <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    /> */}
                    <TextInput value={nascimento} onChangeText={setNascimento} placeholder="Nascimento..." style={global.info}></TextInput>
                    {/* <TextInput value={mae} onChangeText={setMae} placeholder="Nome da mãe" place style={global.info}></TextInput>
                    <TextInput value={pai} onChangeText={setPai} placeholder="Nome do pai..." place style={global.info}></TextInput> */}
                    <TextInput value={estdCivil} onChangeText={setEstdCivil} placeholder="Estado civil..." style={global.info}></TextInput>
                    <TextInput value={naturalidade} onChangeText={setNaturalidade} placeholder="Naturalidade..." style={global.info}></TextInput>
                    <TextInput value={cartCid} onChangeText={setCartCid} placeholder="Cartão cidadão..." style={global.info}></TextInput>
                    <TextInput value={cartSus} onChangeText={setCartSus} placeholder="Cartão do SUS..." style={global.info}></TextInput>
                    <Text style={css.title}>Psicoativos</Text>
                    <View style={{flex: 1,width: '80%', height: 50, alignItems: "center", alignSelf: "center"}}>
                            <SelectMultiple
                                items={comorbidade.doencas}
                                renderLabel={renderLabel}
                                selectedItems={selected}
                                onSelectionsChange={onSelectionsChange}
                                />
                    </View>
                    <Text style={css.title}>Doenças</Text>
                    <View style={{flex: 1,width: '80%', height: 50, alignItems: "center", alignSelf: "center"}}>
                            <SelectMultiple
                                items={comorbidade.dorgas}
                                renderLabel={renderLabel}
                                selectedItems={selected}
                                onSelectionsChange={onSelectionsChange}
                                />
                    </View>
                    <View style={css.align}>
                        <Image source={require("../../assets/user.png")} style={global.imageUser}/>
                        <View style={css.alignIcon}>
                            <Feather name="camera" size={24} color="blue" />
                            <Text style={{color: "blue"}}>Adicionar foto</Text>
                        </View>
                    </View>
                <Collapse>
                    <CollapseHeader>
                    <View style={{display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: "5%"}}>
                        <Text style={css.title}>Familiar</Text>
                        <AntDesign name="down" size={18} color="black" style={{marginLeft: 10}}/>
                    </View>
                    </CollapseHeader>
                    <CollapseBody>
                        <TextInput placeholder="Nome..." style={global.info}></TextInput>
                        <TextInput placeholder="Parentesco..." style={global.info}></TextInput>
                        <TextInput placeholder="Telefone..." style={global.info}></TextInput>
                        <TextInput placeholder="E-mail..." style={global.info}></TextInput>
                        <TextInput placeholder="Endereço..." style={global.info}></TextInput>
                    </CollapseBody>
                </Collapse>
                    <Text style={global.buttonText} onPress={() => {cadastrar()}}>Salvar</Text>
                </ScrollView>
            </View>
        </View>
    )
}

const css = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: "white",
    },
    title:{
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginTop: "5%"
    },
    scrollView: {
        width: "100%",
        height: 470
    },
    align: {
        width: 150,
        height: 200,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        alignSelf: "center"
    },
    alignIcon: {
        alignItems: "center"
    },
    alignHeader:{
        width: "100%",
        height: "20%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    logo:{
        width: '60%',
        height: '100%',
        backgroundColor: "#166B8A",
        borderBottomLeftRadius: 112.5,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 20,
        color: "white"
    }
})