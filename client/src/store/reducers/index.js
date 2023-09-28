import { combineReducers } from "redux";
import exampleReducer from './exampleReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    example: exampleReducer,
    user: userReducer,
})

export default rootReducer;