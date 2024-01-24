// store/index.js
export const state = () => ({
    displayName: null,
    email: null,
    uid: null
});

export const mutations = {
    SET_USER(state, data) {
        state.displayName = data.displayName;
        state.email = data.email;
        state.uid = data.uid;
    },

};
