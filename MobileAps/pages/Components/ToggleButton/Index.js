import React, { useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function ToggleButton({ navigation, text, style, onPress }) {
    const [cor, setCor] = useState(false)

    return(
        <TouchableOpacity style={[style,{backgroundColor: (!cor) ? "whitesmoke" : "salmon"}]} onPress={() => {setCor(!cor); onPress()}}>
            <Text style={{fontSize: 18, fontWeight: "bold", alignSelf: "center", marginTop: "2%"}}>{text}</Text>
        </TouchableOpacity>
    );
};