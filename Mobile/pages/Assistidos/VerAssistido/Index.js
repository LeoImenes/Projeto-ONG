import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TextInput, TouchableOpacity} from 'react-native';

import global from "../../Global/Style"
import { Ionicons, AntDesign } from '@expo/vector-icons';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';

export default function VerAssistido({navigation, route}){
    const id = route.params;

    const[assistido, setAssistido] = useState([]) 

    useEffect(() => {
        // fetch(`http://192.168.0.103:3000/assistidos`)
            fetch(`http://10.87.207.27:3000/assistidos/${id.id_assistido}`)
            .then(resp => {return resp.json()})
            .then(data => {
                setAssistido(data)
            })
            .catch( err => { console.log(err) })
    })

    const formatDate = (nasc) => {
        let dia = nasc.getDate();
        dia = (dia < 10) ? "0" + dia : dia;
        let mes = nasc.getMonth() + 1;
        mes = (mes < 10) ? "0" + mes : mes;
        let ano = nasc.getFullYear();
        return `${dia}/${mes}/${ano}`;
     }

    return(
        <View style={global.body}>
            <View style={global.header}>
                <Ionicons name="arrow-back-circle-outline" style={{marginLeft: 5}} size={35} color="#166B8A" onPress={() => {navigation.navigate('ListarAssistidos')}} />
                <View style={global.cardTitle}>
                        <Text style={global.textTitle}>CASA ACOLHEDORA</Text>
                        <Text style={global.textTitle}>IRMÃ ANTÔNIA</Text>
                </View>
            </View>
            <View style={global.scroll}>
                <ScrollView>
                    <View style={css.images}>
                        <View>
                            <Image alt= "Foto antes" source={(assistido.foto_antes !== null) ? {uri:assistido.foto_antes} : require("../../assets/user1.png")} style={global.imageUser}/>
                            <Text style={css.title}>Antes</Text>
                        </View>
                        <View>
                            <Image alt= "Foto antes" source={(assistido.foto_depois !== null) ? {uri:assistido.foto_depois} : require("../../assets/user1.png")} style={global.imageUser}/>
                            <Text style={css.title}>Depois</Text>
                        </View>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Nome:</Text>
                        <Text style={global.textInfo}>{assistido.nome_completo}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Nome social:</Text>
                        <Text style={global.textInfo}>{assistido.nome_social}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>RG:</Text>
                        <Text style={global.textInfo}>{assistido.rg}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>CPF:</Text>
                        <Text style={global.textInfo}>{assistido.cpf}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Nascimento:</Text>
                        <Text style={global.textInfo}>{formatDate(new Date(assistido.data_nascimento))}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Naturalidade:</Text>
                        <Text style={global.textInfo}>{assistido.naturalidade}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Sexo:</Text>
                        <Text style={global.textInfo}>{assistido.sexo}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Estado civíl:</Text>
                        <Text style={global.textInfo}>{assistido.estado_civil}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Cartão cidadão:</Text>
                        <Text style={global.textInfo}>{assistido.cartao_cidadao}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Cartão do SUS:</Text>
                        <Text style={global.textInfo}>{assistido.cartao_sus}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Antecedente:</Text>
                        <Text style={global.textInfo}>{assistido.antecedente_criminal}</Text>
                    </View>
                    {/* <TouchableOpacity onPress={() => {navigation.navigate("CadastrarFamiliar")}}>
                        <Text style={css.button}>Adicionar novo familiar</Text>
                    </TouchableOpacity> */}
                    {/* <Collapse>
                        <CollapseHeader style={{width: "100%", height: 90, backgroundColor: "red",}}>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center",justifyContent: "center "}}>
                                <Text style={css.title}>Dados do Familiar</Text>
                                <AntDesign name="caretdown" size={20} color="black" />
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Nome:</Text>
                                <Text style={global.textInfo}>{}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Parentesco:</Text>
                                <Text style={global.textInfo}>{}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Telefone:</Text>
                                <Text style={global.textInfo}>{}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>E-mail:</Text>
                                <Text style={global.textInfo}>{}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Endereço:</Text>
                                <Text style={global.textInfo}>{}</Text>
                            </View>
                        </CollapseBody>
                    </Collapse> */}
                    {/* <Text style={css.title}>Dados do Familiar</Text>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Nome:</Text>
                        <Text style={global.textInfo}>{}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Parentesco:</Text>
                        <Text style={global.textInfo}>{}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Telefone:</Text>
                        <Text style={global.textInfo}>{}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>E-mail:</Text>
                        <Text style={global.textInfo}>{}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Endereço:</Text>
                        <Text style={global.textInfo}>{}</Text>
                    </View> */}
                    {/* <TouchableOpacity>
                        <Text style={css.button}>Adicionar observações</Text>
                    </TouchableOpacity>
                    <Text style={css.title}>Observações</Text>
                    {/* <Text style={css.title}>Observações</Text>
                    <TextInput multiline
                                numberOfLines={5}
                                maxLength={20000}
                                onChangeText={text => onChangeText(text)}
                                value={value}
                                style={css.textArea}></TextInput> */}
                </ScrollView>
            </View>
        </View>
    )
}

const css = StyleSheet.create({
    images: {
        width: "100%",
        height: "20%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    title: {
        fontWeight: 'bold',
        fontSize:18,
        alignSelf: 'center',
        marginTop: 15
    },
    textArea: {
        padding: 10,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 15
    },
    scrollView: {
        width: "100%",
        height: "80%"
    },
    button:{
        color:"blue",
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 10
    }
})