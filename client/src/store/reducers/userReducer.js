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
                    displayName: action.payload.affiliation.displayName,
                    abbr: action.payload.affiliation.abbr,
                }
            };
        case 'UPDATE_MANAGED_TEAMS':
            return {
                ...state,
                managedTeams: action.payload
            };
        case 'UPDATE_LAST_NAME':
            return {
                ...state,
                firstName: action.payload
            };
        case 'UPDATE_FIRST_NAME':
            return {
                ...state,
                lastName: action.payload
            };
        case 'UPDATE_EMAIL':
            return {
                ...state,
                email: action.payload
            };
        case 'UPDATE_GAMES_PLAYED':
            return {
                ...state,
                gameHistory: action.payload
            };
        case 'UPDATE_USER_CURRENCY':
            return {
                ...state,
                currency: action.payload
            };
        default:
            return state;
    }
}

export default userReducer;