import React , {useEffect} from 'react'
import { View, Text, Alert, TouchableOpacity, Dimensions } from 'react-native';
import HeaderArrow from './common/HeaderArrow';
import EStyleSheet from 'react-native-extended-stylesheet'
import {Colors, GlobalStyles} from './Constants';
import {connect} from 'react-redux';
import {CredentialSpace, AddSpaceForList, clearList} from '../actions';
import { Input} from 'react-native-elements';

const WIDTH = Dimensions.get('window').width;

const AddList = (props) => {

    const functionsCombined =()=>{
        const {location, numberOfSpaces, description, price, available, AddSpaceForList} = props;
        if(!description || !location || !price || !numberOfSpaces || !available){
            Alert.alert("Please fill all from values")
        }else if(description.length < 5){
            Alert.alert("Please enter a more specific description")
        }else if(location.length < 5){
            Alert.alert("Please enter a more specific location")
        }else if(price.length < 1){
            Alert.alert("Please enter a valid price")
        }else if(isNaN(+numberOfSpaces)){
            Alert.alert("Please enter a valid space number")
        }else if(available.length < 3){
            Alert.alert("Please enter valid working hours")
        }else{
            AddSpaceForList({description, location, numberOfSpaces, price, available});
        }
    }

    const addButton =()=>{
        return(
            <TouchableOpacity
            style={styles.buttonContainerStyle}
            onPress={() => functionsCombined()}
            >
                <Text style={styles.buttonText}>Add the space for listing</Text>
            </TouchableOpacity>
        )
    }

    const showErroMessage =()=>{
        if(props.addedMessage !== ''){
            return <Text style={[styles.buttonText, {color: Colors.mainForeGround}]}>{props.addedMessage}</Text>
        }
    }

    const backToMyListings = () =>{
        if(props.addedMessage == 'Listing added successfully'){
            console.log('here ybasha')
            props.clearList();
        }
        props.navigation.navigate("MyListings")
    }
    const {CredentialSpace, description, price, available, numberOfSpaces, location} = props;
    return (
        <View style={{flex: 1}}>
            <HeaderArrow  navigateMeBack={() => backToMyListings()} HeaderText={'Add a space for rent'} 
            HeaderStyle={{backgroundColor: 'transparent'}} />
        <View style={styles.container}>
            <Text style={styles.infoStyle}>Space description:</Text>
            <Input
                placeholder='Drive way'
                onChangeText={(text) => CredentialSpace({prop: 'description', value: text})}
                value={description}
                inputContainerStyle={GlobalStyles.textInputContainer}
                inputStyle={GlobalStyles.textInputStyle}
                placeholderTextColor={Colors.mainForeGround}
            />
            <Text style={styles.infoStyle}>Location:</Text>
            <Input
                placeholder='Melbourne street'
                onChangeText={(text) => CredentialSpace({prop: 'location', value: text})}
                value={location}
                inputContainerStyle={GlobalStyles.textInputContainer}
                inputStyle={GlobalStyles.textInputStyle}
                placeholderTextColor={Colors.mainForeGround}
            />
            <Text style={styles.infoStyle}>Price:</Text>
            <Input
                placeholder='10$/hr'
                onChangeText={(text) => CredentialSpace({prop: 'price', value: text})}
                value={price}
                inputContainerStyle={GlobalStyles.textInputContainer}
                inputStyle={GlobalStyles.textInputStyle}
                placeholderTextColor={Colors.mainForeGround}
            />
            <Text style={styles.infoStyle}>Number of spaces available:</Text>
            <Input
                placeholder='1'
                onChangeText={(text) => CredentialSpace({prop: 'numberOfSpaces', value: text})}
                value={numberOfSpaces}
                inputContainerStyle={GlobalStyles.textInputContainer}
                inputStyle={GlobalStyles.textInputStyle}
                placeholderTextColor={Colors.mainForeGround}
            />
            <Text style={styles.infoStyle}>Availability hours:</Text>
            <Input
                placeholder='9-5'
                onChangeText={(text) => CredentialSpace({prop: 'available', value: text})}
                value={available}
                inputContainerStyle={GlobalStyles.textInputContainer}
                inputStyle={GlobalStyles.textInputStyle}
                placeholderTextColor={Colors.mainForeGround}
            />
            {addButton()}
            {showErroMessage()}
        </View>
        </View>
    )
}

const styles = EStyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10rem'
    },infoStyle:{
        fontSize: '14rem',
        alignSelf: 'flex-start',
        marginLeft: '10rem',
        color: Colors.mainFooter
    },buttonContainerStyle:{
        backgroundColor: Colors.mainForeGround,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10rem',
        borderRadius: '10rem',
        marginHorizontal: WIDTH * 0.25
    },buttonText:{
        color: Colors.mainBackGround,
        fontSize: '15rem',
        fontWeight: 'bold'
    }
})

const mapStateToProps =({ListingReducer}) =>{
    return{
        description: ListingReducer.description,
        numberOfSpaces: ListingReducer.numberOfSpaces,
        price: ListingReducer.price,
        available: ListingReducer.available,
        location: ListingReducer.location,
        addedMessage: ListingReducer.addedMessage,
    }
}

export default connect(mapStateToProps, {CredentialSpace, AddSpaceForList, clearList}) (AddList);
