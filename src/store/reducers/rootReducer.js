import {combineReducers} from 'redux'
import profileReducer from "./profile";
import rentItemReducer from "./rentItem";

export default combineReducers({
    profile: profileReducer,
    rentItem: rentItemReducer
})