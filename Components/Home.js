import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';
import { Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
import {Colors, GlobalStyles} from './Constants';
import {Credential, TryLogin} from '../actions';
import Header from './common/Header';

import Spinner from './common/Spinner';

function Home(props){
    useEffect(() =>{
        if(props.user){
            props.navigation.navigate("AllSpaces");
        }
    }, [props.user])


    const showErrorMessage = () =>{
        if(props.errorMessage){
            return( 
            <View style={styles.buttonContainer}>
                <Text style={styles.textMissMatch}>
                    {props.errorMessage}
                </Text>
            </View>
            )
        }else{
            return <View></View>
        }
    }

    const functionsCombined = () =>{
        const {email, password,TryLogin} = props;
        if(email && password){
            TryLogin({email, password});
        }else{
            Alert.alert("Email or password can't be empty")
        }
    }

    const showButton = () =>{
        const {loading} = props;
        if(!loading){
            return(
                <View style={styles.buttonContainer2}>
                <Button
                style={{flex: 1}}
                    icon={
                        <Icon
                        name={'login'}
                        size={25}
                        color={Colors.mainForeGround}
                        />
                    }
                    title={'Login'}
                    titleStyle={{color: Colors.mainForeGround}}
                    buttonStyle={{backgroundColor: 'transparent'}}
                    onPress={() => functionsCombined()}
                />
                </View>
            )
        }else{
            return <View style={styles.buttonContainer}><Spinner size={'small'} /></View>
        }
    }

    if(props.user){
        return (
        <View style={[styles.buttonContainer, {backgroundColor: Colors.mainBackGround, flex: 1}]}>
            <Spinner size={'large'} />
        </View>
        )
    }else{
        const {Credential, email, password} = props;
        return(
        <View style={{flex: 1, backgroundColor: Colors.mainBackGround}}>
        <Header  HeaderText={'Login'} HeaderStyle={{backgroundColor: 'transparent'}} />
        <View style={styles.container}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Input
                placeholder='Email'
                leftIcon={<Icon name={'email'} size={25} color={Colors.mainForeGround}/>}
                onChangeText={(text) => Credential({prop: 'email', value: text})}
                value={email}
                inputContainerStyle={GlobalStyles.textInputContainer}
                inputStyle={GlobalStyles.textInputStyle}
                placeholderTextColor={Colors.mainForeGround}
            />
            <Input
                placeholder='Password'
                leftIcon={<Icon name={'lock'} size={25} color={Colors.mainForeGround}/>}
                onChangeText={(text) => Credential({prop: 'password', value: text})}
                value={password}
                secureTextEntry
                inputStyle={GlobalStyles.textInputStyle}
                inputContainerStyle={GlobalStyles.textInputContainer}
                placeholderTextColor={Colors.mainForeGround}
            />                
            {showButton()}
            <View style={[styles.OrStyle, {flexDirection: 'row'}]}>
                <Text style={GlobalStyles.textInputStyle}>Don't have an account?</Text>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Signup')}
                    >
                    <Text style={styles.signUpStyle}>  Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.ErrorStyle}>
                {showErrorMessage()}
            </View>
            </View>
        </View>
        </View >
        )
    }
}

const styles = EStyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.mainBackGround,
        bottom: '50rem'
    },signUpStyle:{
        color: Colors.brightRed,
        fontSize: '15rem',
        fontWeight: 'bold',
    },buttonContainer2:{
        height: '20rem',
        justifyContent: 'center',
        alignItems: 'center',
    },buttonContainer:{
        height: '20rem',
        justifyContent: 'center',
        alignItems: 'center'
    },textMissMatch:{
        color: '#ff3232',
        fontSize: '14rem',
        textAlign: 'center'
    },logoStyle:{
        bottom: '15rem'
    },OrStyle:{
        fontSize: '14rem',
        color: Colors.mainForeGround,
        height: '25rem',
        marginLeft: '5rem'
    },ErrorStyle:{
        height: '10rem',
        marginTop: '5rem'
    },dontStyle:{
        flexDirection: 'row',
        //height: '20rem',
        width: '100%'
    }
})

const mapStateToProps= ({ SignInReducer}) =>{
    return{
        user: SignInReducer.user,
        email: SignInReducer.email,
        password: SignInReducer.password,
        errorMessage: SignInReducer.errorMessage,
        loading: SignInReducer.loading,
        navigated: SignInReducer.navigated,
    }
}

export default connect(mapStateToProps, { Credential, TryLogin}) (Home);