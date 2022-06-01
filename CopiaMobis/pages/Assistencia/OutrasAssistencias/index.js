import React, { useState, useFocusEffect, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, ScrollView, Dimensions, ToastAndroid } from "react-native";

import gStyle from "../../global/style"
import Url from '../../global/index'
import ToggleButton from '../../Components/ToggleButton/Index';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import MultiSelect from 'react-native-multiple-select';

export default function OutrasAssistencias({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [idFunc, setIdFunc] = useState();
  const [selecionados, setSelecionados] = useState([]);
  const [itens, setItens] = useState([])
  const [selected, setSelected] = useState([]);
  const [sendSelected, setSendselected] = useState([]);
  const [lista, setLista] = useState([]);
  const [dados, setDados] = useState([]);
  const SCREEN_HEIGHT = Dimensions.get('window').height;

  const listar = () => {
    let newDados = [...dados];

    newDados.sort((a, b) => (a.nome_completo > b.nome_completo) ? 1 : (b.nome_completo > a.nome_completo ? -1 : 0));

    setLista(newDados)
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

  const add = (idAss, idCard) => {
    if (selecionados.includes(idAss)) selecionados.splice(selecionados.indexOf(idAss), 1)
    else selecionados.push(idAss)
  };

  useEffect(() => {
    getFunc()

    fetch(`${Url.URL}/assistidos`)
      .then(resp => { return resp.json() })
      .then(data => {
        setLista(data);
        setDados(data);
      })
      .catch(err => { console.log(err) });

    fetch(`${Url.URL}/itens`)
      .then(resp => { return resp.json() })
      .then(data => {
        let temp = JSON.stringify(data);
        temp = temp.replace(/id_item/g, "value");
        temp = temp.replace(/item/g, "label");
        temp = JSON.parse(temp);

        let tempB = [];

        temp.forEach(item => {
          if (item.tipo !== 1) tempB.push(item);
        })
        setItens(tempB)
      })
      .catch(err => { console.log(err) });
  }, [])

  const cadastrar = () => {
    let tempSelecionados = new Array();
    selecionados.forEach((item) => {
      tempSelecionados.push({ "id_assistido": item });
    })

    let item = {
      "id_funcionario": idFunc,
      "assistidos": tempSelecionados,
      "itens": sendSelected
    }

    console.log(item)
    fetch(`${Url.URL}/funcionario/assistencias`, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(item),
    })
      .then(resp => { return resp.json() })
      .then(async data => {
        if (data.err !== undefined) {
          ToastAndroid.show('Falha ao registrar assistência!', ToastAndroid.SHORT)
          console.log(data.err)
        } else {
          ToastAndroid.show('Resgitro efetuado!', ToastAndroid.SHORT)
          limpar()
          navigation.navigate("Home")
        }
      })
  }

  const limpar = () => {
    setSendselected([]);
    setSelected([]);
    setLista([])
  }

  const onSelectedItemsChange = (selected) => {
    let temp = new Array();
    selected.forEach((item) => {
      temp.push({ "id_item": item });
    })
    setSendselected(temp);
    setSelected(selected);
  };

  return (
    <View style={gStyle.body}>
      <LinearGradient colors={['rgb(2, 64, 87)', 'transparent']} style={[css.header, (SCREEN_HEIGHT <= 592) ? { height: 160 } : {}]}>
        <View style={{ width: "100%", height: "20%", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
          <Ionicons name="arrow-back-circle-outline" size={34} color="white" onPress={() => { navigation.navigate("Home") }} />
          <View style={{ width: "80%" }}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Itens da assistência:</Text>
          </View>
        </View>
        <View style={css.filter}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Você cancelou esta ação!")
              setModalVisible(!modalVisible);
            }}
          >
            <View style={css.centeredView}>
              <View style={css.modalView}>
                <View style={{ flex: 1, height: 110, alignItems: "center", alignSelf: "center" }}>
                  <MultiSelect items={itens} uniqueKey="value" onSelectedItemsChange={onSelectedItemsChange} selectedItems={selected} selectText="Selecionar..." searchInputPlaceholderText="Pesquisar..."
                    searchInputStyle={{ color: '#CCC', height: 60 }} tagRemoveIconColor="#4169E1" tagBorderColor="#CCC" tagTextColor="#CCC" selectedItemTextColor="#CCC" selectedItemIconColor="#4169E1"
                    itemTextColor="#000" displayKey="label" submitButtonColor="#4169E1" submitButtonText="Adicionar" styleDropdownMenuSubsection={{ paddingLeft: 10, height: 50}} styleDropdownMenu={{ width: 250, height: 60 }} styleListContainer={{ width: 250, height: 130 }} />
                </View>
                <Pressable
                  style={[css.button, css.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={css.textStyle}>Salvar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[css.button, css.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={css.textStyle}>Selecionar</Text>
          </Pressable>
          <TouchableOpacity style={{ width: "10%", height: "100%", alignItems: "center", justifyContent: "center" }} onPress={() => { listar() }}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>A-Z</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <Text style={[css.textStyle, { fontSize: 20, marginTop: 10 }]}>Assistidos</Text>
      <Text style={[css.textStyle, { fontSize: 20, marginTop: 5, color: "#166B8A" }]}>--------------------------------------</Text>
      <View style={((SCREEN_HEIGHT - (css.header.height)) < 400) ? { height: 250 } : { height: 450 }}>
        <ScrollView>
          {
            lista.map((item, index) => {
              return (
                <ToggleButton key={index} text={item.nome_completo} style={css.card} onPress={() => { add(item.id_assistido, index) }} />
              )
            })
          }
        </ScrollView>
      </View>
      <Text style={[css.textStyle, { fontSize: 20, marginTop: 5, color: "#166B8A" }]}>--------------------------------------</Text>
      <TouchableOpacity style={{ backgroundColor: "rgb(22,107,138)", width: "35%", height: 45, alignItems: "center", justifyContent: "center", borderRadius: 5, marginTop: "5%", alignSelf: "center", marginBottom: "20%" }} onPress={() => { cadastrar() }}>
        <Text style={gStyle.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const css = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalView: {
    width: 310,
    height: 300,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    borderRadius: 20,
    padding: 1,
    marginBottom: 5,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  buttonClose: {
    backgroundColor: "#b0c4de",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center"
  },
  filter: {
    width: "100%",
    height: "40%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  card: {
    width: "100%",
    height: 100,
    marginBottom: 10,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "whitesmoke",
    display: "flex"
  },
  header: {
    width: "100%",
    height: 200,
    backgroundColor: "#166B8A",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    justifyContent: "center"
  }
});