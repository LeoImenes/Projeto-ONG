import React, { useState, useFocusEffect, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, ScrollView } from "react-native";

import global from "../../Global/Style"
import StatusBar from "../../Components/StatusBar/Index"
import ToggleButton from '../../Components/ToggleButton/Index';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import SelectMultiple from 'react-native-select-multiple'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OutrasAssistencias({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [idFunc, setIdFunc] = useState();
  const [selecionados, setSelecionados] = useState([]);
  const [itens, setItens] = useState([])
  const [selected, setSelected] = useState([]);
  const [lista, setLista] = useState([]);
  const [dados, setDados] = useState([]);
  const [valuePicker, setValuePicker] = useState();

  const renderLabel = (label, style) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ marginLeft: 5 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{label}</Text>
        </View>
      </View>
    )
  }

  const onSelectionsChange = (selected) => {
    setSelected(selected);
  }

  const listar = () => {
    let newDados = [...dados];

    newDados.sort((a, b) => (a.nome_completo > b.nome_completo) ? 1 : (b.nome_completo > a.nome_completo ? -1 : 0));

    setLista(newDados)
  }

  const getFunc = async () => {
    let value = await AsyncStorage.getItem('userdata');

    // fetch(`http://192.168.0.104:3000/funcionarios/${value}`)
      fetch(`http://10.87.207.20:3000/funcionarios/${value}`)
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

    // fetch(`http://192.168.0.104:3000/assistidos`)
      fetch(`http://10.87.207.20:3000/assistidos`)
      .then(resp => { return resp.json() })
      .then(data => {
        setLista(data);
        setDados(data);
      })
      .catch(err => { console.log(err) });

    // fetch(`http://192.168.0.104:3000/itens`)
      fetch(`http://10.87.207.20:3000/itens`)
      .then(resp => { return resp.json() })
      .then(data => {
        let temp = JSON.stringify(data);
        temp = temp.replace(/id_item/g, "value");
        temp = temp.replace(/item/g, "label");
        temp = JSON.parse(temp);

        let tempB = [];

        temp.forEach(item => {
          if (item.tipo != 0) tempB.push(item);
        })

        setItens(tempB)
      })
      .catch(err => { console.log(err) });
  }, [])

  const cadastrar = () => {
    let temp = JSON.stringify(selected);
    temp = temp.replace(/value/g, "id_item");
    temp = temp.replace(/label/g, "item");
    temp = JSON.parse(temp);
    
    let item = {
      "id_funcionario": idFunc,
      "assistidos": selecionados,
      "itens": temp
    }

    console.log(item)
    
    // fetch(`http://192.168.0.104:3000/funcionario/assistencias`, {
    //   "method": "POST",
    //   "headers": {
    //     "Content-Type": "application/json"
    //   },
    //   "body": JSON.stringify(item),
    // })
    //   .then(resp => { return resp.json() })
    //   .then(async data => {
    //     if (data.err !== undefined) {
    //       ToastAndroid.show('Falha ao registrar assistência!', ToastAndroid.SHORT)
    //     } else {
    //       ToastAndroid.show('Resgitro efetuado!', ToastAndroid.SHORT)
    //     }
    //   })
  }

  return (
    <View style={global.body}>
      <StatusBar />
      <View style={{ width: "100%", height: 200, backgroundColor: "#166B8A", borderBottomRightRadius: 40, borderBottomLeftRadius: 40, justifyContent: "center" }}>
        <View style={{ width: "100%", height: "20%", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
          <Ionicons name="arrow-back-circle-outline" size={34} color="white" onPress={() => { navigation.navigate("Home") }} />
          <View style={{ width: "80%" }}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Selecione os itens:</Text>
          </View>
        </View>
        <View style={css.filter}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("O modal foi fechado!")
              setModalVisible(!modalVisible);
            }}
          >
            <View style={css.centeredView}>
              <View style={css.modalView}>
                <View style={{ flex: 1, width: '100%', height: 100, alignItems: "center", alignSelf: "center" }}>
                  <SelectMultiple
                    items={itens}
                    renderLabel={renderLabel}
                    selectedItems={selected}
                    onSelectionsChange={onSelectionsChange}
                  />
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
      </View>
      <Text style={{ color: "black", fontSize: 20, fontWeight: "bold", marginTop: 5 }}>Selecione:</Text>
      <Text style={{ color: "#166B8A", fontSize: 20, fontWeight: "bold" }}>- - - - - - - - - - - - - - - - - - - - - - </Text>
      <View style={{ width: "100%", height: 450 }}>
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
      <Text style={{ color: "#166B8A", fontSize: 20, fontWeight: "bold" }}>- - - - - - - - - - - - - - - - - - - - - - </Text>
      <TouchableOpacity style={{ backgroundColor: "rgb(22,107,138)", width: "35%", height: 45, alignItems: "center", justifyContent: "center", borderRadius: 5, marginTop: "5%", alignSelf: "center", marginBottom: "20%" }} onPress={() => { cadastrar() }}>
        <Text style={global.buttonText1}>SALVAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const css = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)"
  },
  modalView: {
    width: 300,
    height: 280,
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
  }
});