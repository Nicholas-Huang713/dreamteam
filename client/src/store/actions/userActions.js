export const updateUserData = (data) => {
    return {
        type: 'UPDATE_USER_DATA',
        payload: data,
    };
};

export const updateAffil = (data) => {
    return {
        type: 'UPDATE_AFFIL',
        payload: data,
    };
};

export const updateManagedTeams = (data) => {
    return {
        type: 'UPDATE_MANAGED_TEAMS',
        payload: data,
    };
};

export const updateGamesPlayed = (data) => {
    return {
        type: 'UPDATE_GAMES_PLAYED',
        payload: data,
    };
};

export const updateUserCurrency = (data) => {
    return {
        type: 'UPDATE_USER_CURRENCY',
        payload: data,
    };
};

export const updateFirstName = (data) => {
    return {
        type: 'UPDATE_FIRST_NAME',
        payload: data,
    };
};

export const updateLastName = (data) => {
    return {
        type: 'UPDATE_LAST_NAME',
        payload: data,
    };
};

export const updateEmail = (data) => {
    return {
        type: 'UPDATE_EMAIL',
        payload: data,
    };
};
