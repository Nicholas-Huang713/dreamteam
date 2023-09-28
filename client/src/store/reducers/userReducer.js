const initialState = {
    data: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_USER_DATA':
            return action.payload;
        case 'UPDATE_AFFIL':
            return {
                ...state,
                affiliation: {
                    color: action.payload.color,
                    team: action.payload.team
                }
            };
        default:
            return state;
    }
}

export default userReducer;