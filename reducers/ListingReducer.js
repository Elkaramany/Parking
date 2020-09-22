const INITIAL_STATE={
    description: '',
    location: '',
    numberOfSpaces: '',
    price: '',
    available: '',
    allListings: null,
    addedMessage: '',
}

export default (state={INITIAL_STATE}, action)=>{
    if(action.type === 'Credential_Space_in'){
        return{...state, [action.payload.prop] : action.payload.value}
    }else if(action.type === 'fetch_listings_success'){
        return {...state, allListings: action.payload};
    }else if(action.type === 'added_listing_success' || action.type === 'added_listing_fail'){
        return{...state, addedMessage: action.payload}
    }else if(action.type === 'clear_list_data'){
        return{...state, description: '', location:'', numberOfSpaces: '', price: '', available: '', addedMessage: ''}
    }
    return state;
}