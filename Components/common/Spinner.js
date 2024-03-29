import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Colors} from '../Constants';

function Spinner ({size}){
    return(
        <View
        style={{flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        }}
        >
            <ActivityIndicator
            size={size}
            color={Colors.mainForeGround}
            />
        </View>
    );
}

export default Spinner