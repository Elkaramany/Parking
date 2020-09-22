import React , {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from './Constants';
import {connect} from 'react-redux';
import {fetchAllListngs, removeItem} from '../actions'
import Header from './common/Header';
import _ from 'lodash';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const WIDTH = Dimensions.get('window').width;

const MyListings = (props) => {

    const [listed, setListed] = useState(false);

    useEffect(() =>{
        props.fetchAllListngs();
    }, [])


    const addList =()=>{
        return(
            <TouchableOpacity
            style={styles.buttonContainerStyle}
            onPress={() => props.navigation.navigate("AddList")}
            >
                <Text style={styles.buttonText}>Add a space for rent</Text>
            </TouchableOpacity>
        )
    }

    const renderItem = ({item}) =>{
        if(props.user.user.uid === item.ID){
            setListed(true);
            return(
                <View style={styles.listingContainer}>
                    <Text style={[styles.spaceInfoStyle, {fontWeight: 'bold'}]}>Space listing info:</Text>
                    <Text style={styles.spaceInfoStyle}>Space description: {item.description}</Text>
                    <Text style={styles.spaceInfoStyle}>Location: {item.location}</Text>
                    <Text style={styles.spaceInfoStyle}>Price: {item.price}</Text>
                    <Text style={styles.spaceInfoStyle}>Number of spaces: {item.numberOfSpaces}</Text>
                    <Text style={styles.spaceInfoStyle}>Availability hours: {item.available}</Text>
                    <TouchableOpacity style={styles.singleRemove}
                        onPress={() => props.removeItem(item.uid)}
                        >
                    <Icon2
                    name={'delete-empty'}
                    size={20}
                    color={'#fff'}
                    /> 
                    </TouchableOpacity>
                    <View style={styles.lineStyle}></View>
                </View>
            )
        }
    }

    const hasItems = () =>{
        if(!listed){
            return <Text style={[styles.buttonText, {color: Colors.mainForeGround}]}>You don't have any listed spaces</Text>
        }
    }

    return (
        <View style={{flex: 1}}>
            <Header  HeaderText={'My Listings'} HeaderStyle={{backgroundColor: 'transparent'}} />
            {hasItems()}
            <FlatList 
                data={props.data}
                renderItem={renderItem}
                keyExtractor={v => v.uid}
            />
            {addList()}
        </View>
    )
}

const styles = EStyleSheet.create({
    buttonContainerStyle:{
        backgroundColor: Colors.mainForeGround,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10rem',
        borderRadius: '10rem',
        marginHorizontal: WIDTH * 0.25,
        marginBottom: '5rem'
    },buttonText:{
        color: Colors.mainBackGround,
        fontSize: '15rem',
        textAlign: 'center',
        fontWeight: 'bold'
    },spaceInfoStyle:{
        fontSize: '14rem',
        color: Colors.mainForeGround
    },listingContainer:{
        marginHorizontal: '10rem',
        marginVertical: '5rem',
    },singleRemove:{
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#2E90C8', 
        justifyContent: 'center',
        padding: '3rem',
        marginHorizontal: WIDTH * 0.45,
        left: WIDTH * 0.33,
        //to make a circle around the delete button:
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.07,
        height: Dimensions.get('window').width * 0.07,
    },lineStyle:{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginHorizontal: WIDTH * 0.1,
        marginTop: '10rem'
        },
})

const mapStateToProps =({ListingReducer, SignInReducer}) =>{
    const data = _.map(ListingReducer.allListings, (val, uid) =>{
        return {...val, uid}
    })
    return{
        data,
        user: SignInReducer.user
    }
}

export default connect(mapStateToProps, {fetchAllListngs, removeItem})(MyListings);
