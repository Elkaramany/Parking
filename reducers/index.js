import {combineReducers} from 'redux';
import SignInReducer from './SignInReducer';
import ListingReducer from './ListingReducer';

export default combineReducers({
    SignInReducer,
    ListingReducer,
})