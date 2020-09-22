import React, {useState, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Input, Button} from 'react-native-elements';
import HeaderArrow from './common/HeaderArrow';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Credential, createAccount} from '../actions';
import {connect} from 'react-redux';
import {Colors, GlobalStyles} from './Constants';

import Spinner from './common/Spinner';

function Signup (props){

    const [missMatch, setMissmatch] = useState('');
    const [InvalidName, setInvalidName] = useState('');

    const functionsCombined = () =>{
        const {FirstName, LastName} = props;
        if(InvalidName !== ''){
            setMissmatch(InvalidName);
        }else if(!FirstName || !LastName){
            Alert.alert("Please fill all form values")
        }else{
            setMissmatch('');
            setInvalidName('');
            functionOne();
            functionTwo();
        }
    }

    const functionOne = () =>{
        const {email, password, FirstName, LastName} = props;
        props.createAccount({email, password, FirstName, LastName});
    }

    const functionTwo =()=>{
        props.navigation.navigate("Home");
    }

    const validateEmail = (text) =>{
        const form = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!text.match(form)){
            setInvalidName('Incorrect email format');
        }
        else {
            setInvalidName('');
        }
        props.Credential({prop: 'email', value: text})
    }
    
    validatePassword = (text) =>{
        const formula=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if(!text.match(formula)){
            setInvalidName('Password must be 6 to 20 chars thats contains at least one digit, an uppercase and a lowercase letter')
        }else{
            setInvalidName('')
        }
        props.Credential({prop: 'password', value: text})
    }

    const showMissMatch = () =>{
        if(missMatch){
            return <View style={styles.buttonContainer}><Text style={styles.textMissMatch}>{missMatch}</Text></View>
        }
    }

    const validateName = (text, type) =>{
        if(text.length < 2){
            setInvalidName(`${type} must be more than 2 chars long.`);
        }else{
            setInvalidName('');
        }
        props.Credential({prop: type, value: text})
    }

    const showButton = () =>{
        if(!props.loading){
        return(
            <View style={styles.buttonContainer2}>
            <Button
                icon={
                    <Icon
                    name={'account-plus'}
                    size={25}
                    color={Colors.mainForeGround}
                    />
                }
                title={'Sign Up'}
                titleStyle={styles.buttonTitleStyle}
                buttonStyle={styles.Login}
                onPress={() => functionsCombined()}
            />
        </View>
        )}else{
            return <View style={styles.buttonContainer}><Spinner size={'small'} /></View>
        }
    }

    const backToSignIn = () =>{
        props.navigation.navigate('Home');
    }

    const {FirstName, LastName, email, password , Credential, confirm} = props;
    return(
        <View style={{flex: 1, backgroundColor: Colors.mainBackGround}}>
        <HeaderArrow  navigateMeBack={() => backToSignIn()} HeaderText={'Sign up'} 
        HeaderStyle={{backgroundColor: 'transparent'}} />
        <View style={styles.container}>
            <Input
            placeholder='Email'
            leftIcon={<Icon name={'email'} size={25} color={Colors.mainForeGround}/>}
            inputStyle={GlobalStyles.textInputStyle}
            inputContainerStyle={GlobalStyles.textInputContainer}
            value={email}
            onChangeText={(text) => validateEmail(text)}
            placeholderTextColor={Colors.mainForeGround}
            />
            <Input
            placeholder='Password'
            secureTextEntry
            leftIcon={<Icon name={'lock'} size={25} color={Colors.mainForeGround}/>}
            inputStyle={GlobalStyles.textInputStyle}
            inputContainerStyle={GlobalStyles.textInputContainer}
            value={password}
            onChangeText={(text) => validateName(text, "password")}
            placeholderTextColor={Colors.mainForeGround}
            />
            <Input
            placeholder='Confirm password'
            leftIcon={<Icon name={'lock'} size={25} color={Colors.mainForeGround}/>}
            secureTextEntry
            inputStyle={GlobalStyles.textInputStyle}
            inputContainerStyle={GlobalStyles.textInputContainer}
            value={confirm}
            onChangeText={(text) => Credential({prop: 'confirm', value: text})}
            placeholderTextColor={Colors.mainForeGround}
            />
            <Input
            placeholder='First Name'
            leftIcon={<Icon name={'account'} size={25} color={Colors.mainForeGround}/>}
            inputContainerStyle={GlobalStyles.textInputContainer}
            inputStyle={GlobalStyles.textInputStyle}
            onChangeText={(text) => validateName(text, "FirstName")}
            value={FirstName}
            placeholderTextColor={Colors.mainForeGround}
            />
            <Input
            placeholder='Last Name'
            leftIcon={<Icon name={'account-box'} size={25} color={Colors.mainForeGround}/>}
            inputStyle={GlobalStyles.textInputStyle}
            inputContainerStyle={GlobalStyles.textInputContainer}
            onChangeText={(text) => validateName(text, "LastName")}
            value={LastName}
            placeholderTextColor={Colors.mainForeGround}
            />
            {showButton()}
            {showMissMatch()}
    </View>
    </View>
    )
}

const styles = EStyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Login:{
        flex:1,
        backgroundColor: 'transparent',
    },buttonTitleStyle:{
        color: Colors.mainForeGround,
        fontSize: '15rem'
    },
    textMissMatch:{
        color: '#ff3232',
        fontSize: '12rem'
    },buttonContainer:{
        height: '20rem',
        justifyContent: 'center',
        alignItems: 'center'
    },buttonContainer2:{
        height: '25rem',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapStateToProps= ({ SignInReducer}) =>{
    return{
        user: SignInReducer.user,
        email: SignInReducer.email,
        password: SignInReducer.password,
        createError: SignInReducer.errorMessage,
        loading: SignInReducer.loading,
        confirm: SignInReducer.confirm,
        FirstName: SignInReducer.FirstName,
        LastName: SignInReducer.LastName,
    }
}

export default connect(mapStateToProps, {Credential, createAccount})(Signup);