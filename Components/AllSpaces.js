import React , {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from './Constants';
import {connect} from 'react-redux';
import {SearchBar} from 'react-native-elements';
import {fetchAllListngs} from '../actions'
import Header from './common/Header';
import _ from 'lodash';

const WIDTH = Dimensions.get('window').width;

const AllSpaces = (props) => {
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() =>{
        props.fetchAllListngs();
    }, [])


    const renderItem = ({item}) =>{
        return(
            <View style={styles.listingContainer}>
                <Text style={[styles.spaceInfoStyle, {fontWeight: 'bold'}]}>Space listing info:</Text>
                <Text style={styles.spaceInfoStyle}>Space description: {item.description}</Text>
                <Text style={styles.spaceInfoStyle}>Location: {item.location}</Text>
                <Text style={styles.spaceInfoStyle}>Price: {item.price}</Text>
                <Text style={styles.spaceInfoStyle}>Number of spaces: {item.numberOfSpaces}</Text>
                <Text style={styles.spaceInfoStyle}>Availability hours: {item.available}</Text>
                {showButton(item)}
                <View style={styles.lineStyle}></View>
            </View>
        )
    }

    const showButton =(item) =>{
        if(item.ID === props.user.user.uid){
            return <Text style={styles.spaceInfoStyle}>This listing is made by you</Text>
        }else{
            return(
                <TouchableOpacity
                style={styles.buttonContainerStyle}
                onPress={() => console.log('clicked')}
                >
                    <Text style={[styles.buttonText, {color: Colors.mainBackGround}]}>Rent this space</Text>
                </TouchableOpacity>
            )
        }
    }

    const returnData = () =>{
        if(props.data.length === 0){
            return(
                <Text style={styles.buttonText}>No spaces available at the moment</Text>
            )
        }else{
            if(items.length !== 0){
                return(
                    <FlatList 
                        data={items}
                        renderItem={renderItem}
                        keyExtractor={v => v.uid}
                    />
                )
            }else{
                return(
                    <FlatList 
                    data={props.data}
                    renderItem={renderItem}
                    keyExtractor={v => v.uid}
                    />
                )
            }
        }
    }

    const searchItem = (text) =>{
        const newData = props.data.filter(item => {      
        const itemData = `${item.location.toLowerCase()}`;
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;    
        });
        setItems(newData)
        setSearch(text);
        if(text === ''){
            setItems([])
            setSearch('')
        }
    }

    return (
        <View style={{flex: 1}}>
            <SearchBar
                lightTheme round
                placeholder={'What are you looking for?'}
                onChangeText={(text) => searchItem(text)}
                onClear={() => setSearch([])}
                value={search}
                containerStyle={{backgroundColor: '#DCDCDC'}}
                autoCorrect={false}
                autoCapitalize={'none'}
                />
            {returnData()}
        </View>
    )
}

const styles = EStyleSheet.create({
    buttonContainerStyle:{
        backgroundColor: Colors.mainForeGround,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem',
        borderRadius: '10rem',
        marginHorizontal: WIDTH * 0.3,
        marginTop: '2rem'
    },buttonText:{
        color: Colors.mainForeGround,
        fontSize: '15rem',
        fontWeight: 'bold',
        textAlign: 'center'
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

export default connect(mapStateToProps, {fetchAllListngs})(AllSpaces);
