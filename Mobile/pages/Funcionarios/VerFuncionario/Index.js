import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';

import global from "../../Global/Style"

export default function VerFuncionario({navigation, route}){
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
            <Image style={global.image} source={require("../../assets/logo.png")}/>
            <View style={css.imageAlign}>
                <Image source={(item.foto !== null) ? {uri: item.foto} : require("../../assets/user.png")} style={global.imageUser}/>
                <Text style={global.textInfo}>Matrícula: {item.matricula}</Text>
            </View>
            <View style={css.scrollView}>
                <ScrollView>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Nome:</Text>
                        <Text style={global.textInfo}>{item.nome_completo}</Text>
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
                        <Text style={global.textInfo}>Cargo:</Text>
                        <Text style={global.textInfo}>{item.cargo}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Sexo:</Text>
                        <Text style={global.textInfo}>{item.sexo}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>E-mail:</Text>
                        <Text style={global.textInfo}>{item.email}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Data admissão:</Text>
                        <Text style={global.textInfo}>{formatDate(new Date(item.data_admissao))}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Data demissão:</Text>
                        <Text style={global.textInfo}>{formatDate(new Date(item.data_demissao))}</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const css = StyleSheet.create({
    imageAlign:{
        width: "100%",
        height: "20%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    scrollView: {
        width: "100%",
        height: 430
    }
})