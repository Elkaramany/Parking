import React from 'react'
import { View, Text, Dimensions, Linking } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import HeaderArrow from './common/HeaderArrow';
import {Colors} from './Constants';
import { SocialIcon } from 'react-native-elements'
import {connect} from 'react-redux';
import {removeItem} from '../actions';

const WIDTH = Dimensions.get('window').width;

const Checkout = (props) => {

    const backToSignIn = () =>{
        props.navigation.navigate('AllSpaces')
    }

    const {item} = props.navigation.state.params;

    const functionsCombined = (item)=>{
        functionOne();
        functionTwo(item);
        functionThree();
    }

    const functionOne =()=>{
        { Linking.openURL('https://paypal.com')}
    }

    const functionTwo = (item)=>{
        props.removeItem(item.uid)
    }

    const functionThree =()=>{
        props.navigation.navigate('AllSpaces');
    }

    return (
        <View style={{flex: 1}}>
            <HeaderArrow  navigateMeBack={() => backToSignIn()} HeaderText={'Checkout'} 
                HeaderStyle={{backgroundColor: 'transparent'}} />
            <View style={styles.container}>
                <Text style={[styles.spaceInfoStyle, {fontWeight: 'bold'}]}>Renting Info:</Text>
                <Text style={styles.spaceInfoStyle}>Space description: {item.description}</Text>
                <Text style={styles.spaceInfoStyle}>Location: {item.location}</Text>
                <Text style={styles.spaceInfoStyle}>Number of spaces: {item.numberOfSpaces}</Text>
                <Text style={styles.spaceInfoStyle}>Availability hours: {item.available}</Text>
                <Text style={[styles.spaceInfoStyle, {fontWeight: 'bold'}]}>You will pay: {item.price}$/hr</Text>
                <SocialIcon
                    title='Pay with paypal'
                    button
                    type='paypal'
                    style={{backgroundColor: Colors.mainForeGround, marginHorizontal: WIDTH * 0.24, marginTop: 25}}
                    onPress={()=> functionsCombined(item)}
                />
            </View>
        </View>
    )
}

const styles = EStyleSheet.create({
    container:{
        margin: '10rem'
    },spaceInfoStyle:{
        fontSize: '18rem',
        color: Colors.mainForeGround
    },
})

export default connect(null, {removeItem}) (Checkout)
