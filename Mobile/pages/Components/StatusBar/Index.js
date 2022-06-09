import React from 'react';
import {StatusBar} from 'react-native'

export default function Status({navigation}){
    return(
        <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor="transparent"
                translucent={true} />
    )
}