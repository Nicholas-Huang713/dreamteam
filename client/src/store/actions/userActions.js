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