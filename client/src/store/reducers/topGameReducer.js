const initialState = {
    data: [],
};

const topGameReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_TOP_GAMES':
            return action.payload;
        default:
            return state;
    }
};

export default topGameReducer;