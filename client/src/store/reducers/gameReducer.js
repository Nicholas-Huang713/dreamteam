const initialState = {
    data: [],
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_GAMES_LIST':
            return action.payload;
        default:
            return state;
    }
};

export default gameReducer;