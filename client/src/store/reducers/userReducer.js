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
        default:
            return state;
    }
}

export default userReducer;