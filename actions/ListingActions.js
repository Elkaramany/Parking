import firebase from 'firebase';
import {Alert} from 'react-native';

export const CredentialSpace = ({prop, value}) =>{
    return{
        type: 'Credential_Space_in',
        payload: {prop,value}
    }
}

export const AddSpaceForList = ({description, location, numberOfSpaces, price, available}) =>{
    return(dispatch)=>{
        const {currentUser} = firebase.auth();
        const ID = currentUser.uid 
        firebase.database().ref(`/bookings/AllListings`).push({description, location, numberOfSpaces, price, available, ID})
        .then(() =>{
            dispatch({type: 'added_listing_success', payload: 'Listing added successfully'})
        }).catch(() =>{
            dispatch({type: 'added_listing_fail', payload: 'Error adding the listing'})
        })
    }
}

export const fetchAllListngs = () =>{
    return (dispatch)=>{
        firebase.database().ref(`/bookings/AllListings`)
        .on('value', snapshot =>{
            dispatch({type: 'fetch_listings_success', payload: snapshot.val()})
        })
    }
}

export const clearList =() =>{
    return(dispatch)=>{
        dispatch({type: 'clear_list_data'})
    }
}

export const removeItem = (uid) =>{
    return(dispatch)=>{
        firebase.database().ref(`/bookings/AllListings/${uid}`).remove()
        .then(() =>{
            Alert.alert("Listing removed successfully")
        }).catch(() =>{
            Alert.alert("Error removing listing")
        })
    }
}