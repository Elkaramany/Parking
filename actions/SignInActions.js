import firebase from 'firebase';

export const Credential = ({prop, value}) =>{
    return{
        type: 'Credential_In',
        payload: {prop,value}
    }
}

export const CredentialCard = ({prop, value}) =>{
    return{
        type: 'Credential_In_Card',
        payload: {prop,value}
    }
}

export const TryLogin = ({email, password}) =>{
return(dispatch)=>{
    dispatch({type: 'login_started'})
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user)=>{
        dispatch({type: 'login_success', payload: user})
    }).catch(()=>{
        dispatch({type: 'login_failed'})
    })
}
}

export const createAccount = ({email, password, FirstName, LastName}) =>{
    return(dispatch)=>{
        dispatch({type: 'login_started'})
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{
            const {currentUser} = firebase.auth(); 
            firebase.database().ref(`/users/${currentUser.uid}/Info`).push({FirstName, LastName}).then(() =>{
                dispatch({type: 'create_account_success'})
            })
        }).catch(()=>{
            dispatch({type: 'create_account_fail'})
        })
    }
}


export const signMeOut = () =>{
    return(dispatch)=>{
        firebase.auth().signOut().then(() =>{
            dispatch({type: 'sign_me_out_success'})
        }).catch(() =>{
            dispatch({type: 'sign_me_out_fail', payload: 'Sign Out Failed'})
        })
    }
}

export const fetchData = (uid) => {
    return (dispatch)=>{
        firebase.database().ref(`/users/${uid}/Address`)
        .on('value', snapshot =>{
            dispatch({type: 'fetch_data_success', payload: snapshot.val()})
        })
    }
}

export const EditInfo = ({FirstName, LastName, uid}) =>{
    return(dispatch) =>{
        dispatch({type: 'edit_start'});
        const {currentUser} = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/Address/${uid}`)
        .set({FirstName, LastName})
        .then(()=>{
            dispatch({type: 'edit_success', payload: 'Edit was successful'})
        }).catch(()=>{
            dispatch({type: 'edit_fail', payload: 'Edit Failed '})
        })
    }
}

export const resetErrorMessage =()=>{
    return(dispatch)=>{
        dispatch({type: 'edit_out', payload: ''});
    }
}