import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TextInput, TouchableOpacity} from 'react-native';

import global from "../../Global/Style"
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';

export default function VerAssistido({navigation, route}){
    const id = route.params;

    const DadosFamiliar = (null)
    // const DadosFamiliar = [{"nome": "maria"},{"nome": "paulo", "parentesco" : "pai"}, {"nome": "maria"},{"nome": "paulo", "parentesco" : "pai"}]

    const[assistido, setAssistido] = useState([]) 
    const[relatorio, setRelatorio] = useState("")
    const [value, onChangeText] = useState("");

    useEffect(() => {
        setAssistido(id);
    })

    const formatDate = (nasc) => {
        let dia = nasc.getDate();
        dia = (dia < 10) ? "0" + dia : dia;
        let mes = nasc.getMonth() + 1;
        mes = (mes < 10) ? "0" + mes : mes;
        let ano = nasc.getFullYear();
        return `${dia}/${mes}/${ano}`;
     }

    const salvarRelatorio = () => {
        setRelatorio(value)
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
                            <Image source={(assistido.foto_antes !== null && assistido.foto_antes !== undefined) ? {uri:assistido.foto_antes} : require("../../assets/user1.png")} style={global.imageUser}/>
                            <Text style={css.title}>Antes</Text>
                        </View>
                        <View>
                            <Image source={(assistido.foto_depois !== null && assistido.foto_depois !== undefined) ? {uri:assistido.foto_depois} : require("../../assets/user1.png")} style={global.imageUser}/>
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
                    <Text style={css.title}>Dados do Familiar</Text>
                    <View style={{width: "100%"}}>
                        <ScrollView horizontal>
                        {
                            (DadosFamiliar !== null && DadosFamiliar !== undefined)
                            ?
                            DadosFamiliar.map((item, index) => {
                                return(
                                    <View key={index} style={{width: 370, height: 350}}>
                                        <View style={global.info}>
                                            <Text style={global.textInfo}>Nome:</Text>
                                            <Text style={global.textInfo}>{item.nome}</Text>
                                        </View>
                                        <View style={global.info}>
                                            <Text style={global.textInfo}>Parentesco:</Text>
                                            <Text style={global.textInfo}>{item.parentesco}</Text>
                                        </View>
                                        <View style={global.info}>
                                            <Text style={global.textInfo}>Telefone:</Text>
                                            <Text style={global.textInfo}>{item.telefone}</Text>
                                        </View>
                                        <View style={global.info}>
                                            <Text style={global.textInfo}>E-mail:</Text>
                                            <Text style={global.textInfo}>{item.email}</Text>
                                        </View>
                                        <View style={global.info}>
                                            <Text style={global.textInfo}>Endereço:</Text>
                                            <Text style={global.textInfo}>{item.endereco}</Text>
                                        </View> 
                                        <FontAwesome name="circle" size={20} color="#166B8A" style={{alignSelf: "center", marginTop: 5}} />
                                    </View>
                                )
                            })
                            :
                            <View style={{display: "flex", flexDirection: "row", width: 370, height: 40, justifyContent: "center", alignItems: "center"}}>
                                <Text style={{color: "gray", fontSize: 18, marginRight: 10}}>Nenhum familiar cadastrado</Text>
                                <Entypo name="emoji-sad" size={20} color="gray" />
                            </View>
                        }
                        </ScrollView>
                    </View>
                    <TouchableOpacity style={css.button} onPress={() => {navigation.navigate("CadastrarFamiliar")}}>
                        <Text style={global.buttonText1}>Novo Familiar</Text>
                    </TouchableOpacity>
                    <Text style={css.title}>Observações</Text>
                    <TextInput multiline
                                numberOfLines={5}
                                maxLength={20000}
                                onChangeText={text => onChangeText(text)}
                                value={value}
                                style={css.textArea}></TextInput>
                    <TouchableOpacity style={css.button} onPress={() => {salvarRelatorio()}}>
                        <Text style={global.buttonText1}>Novo</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

const css = StyleSheet.create({
    images: {
        width: "100%",
        height: "13%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginTop: 15
    },
    title: {
        fontWeight: 'bold',
        fontSize:18,
        alignSelf: 'center',
        marginTop: 15,
        color: "#166B8A"
    },
    textArea: {
        width: "90%",
        alignSelf: 'center',
        padding: 10,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 15
    },
    button:{
        backgroundColor: "rgb(22,107,138)",
        width: "35%",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 20
    }
})