import { combineReducers } from "redux";
import gameReducer from './gameReducer';
import userReducer from './userReducer';
import topGameReducer from './topGameReducer';

const rootReducer = combineReducers({
    game: gameReducer,
    user: userReducer,
    topGames: topGameReducer,
})

export default rootReducer;