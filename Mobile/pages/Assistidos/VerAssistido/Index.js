import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TextInput, TouchableOpacity} from 'react-native';

import global from "../../Global/Style"
import { Ionicons } from '@expo/vector-icons';

export default function VerAssistido({navigation, route}){
    const {item} = route.params;

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
            <Ionicons name="return-down-back-sharp" size={24} color="black" />
            <Image style={global.image} source={require("../../assets/logo.png")}/>
            <View style={css.images}>
                <View>
                    <Image source={require("../../assets/user.png")} style={global.imageUser}/>
                    <Text style={css.title}>Antes</Text>
                </View>
                <View>
                    <Image source={require("../../assets/user.png")} style={global.imageUser}/>
                    <Text style={css.title}>Depois</Text>
                </View>
            </View>
            <View style={css.scrollView}>
                <ScrollView>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Nome:</Text>
                        <Text style={global.textInfo}>{item.nome_completo}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Nome social:</Text>
                        <Text style={global.textInfo}>{item.nome_social}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>RG:</Text>
                        <Text style={global.textInfo}>{item.rg}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>CPF:</Text>
                        <Text style={global.textInfo}>{item.cpf}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Nascimento:</Text>
                        <Text style={global.textInfo}>{formatDate(new Date(item.data_nascimento))}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Naturalidade:</Text>
                        <Text style={global.textInfo}>{item.naturalidade}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Sexo:</Text>
                        <Text style={global.textInfo}>{item.sexo}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Estado civíl:</Text>
                        <Text style={global.textInfo}>{item.estado_civil}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Cartão cidadão:</Text>
                        <Text style={global.textInfo}>{item.cartao_cidadao}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Cartão do SUS:</Text>
                        <Text style={global.textInfo}>{item.cartao_sus}</Text>
                    </View>
                    {/* <Text style={css.title}>Dados do Familiar</Text>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Nome:</Text>
                        <Text style={global.textInfo}>{item.}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Parentesco:</Text>
                        <Text style={global.textInfo}>{item.}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Telefone:</Text>
                        <Text style={global.textInfo}>{item.}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>E-mail:</Text>
                        <Text style={global.textInfo}>{item.}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Endereço:</Text>
                        <Text style={global.textInfo}>{item.}</Text>
                    </View> */}
                    <TouchableOpacity>
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
        height: 425
    },
    button:{
        color:"blue",
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 10
    }
})