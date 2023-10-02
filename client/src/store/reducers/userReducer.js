const initialState = {}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_USER_DATA':
            return action.payload;
        case 'UPDATE_AFFIL':
            return {
                ...state,
                affiliation: {
                    color: action.payload.affiliation.color,
                    team: action.payload.affiliation.team,
                    location: action.payload.affiliation.location
                }
            };
        default:
            return state;
    }
}

export default userReducer;