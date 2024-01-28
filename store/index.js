// store/index.js
export const state = () => ({
    displayName: null,
    email: null,
    uid: null
});

export const mutations = {
    SET_USER(state, data) {
        state.displayName = data?.displayName || null;
        state.email = data?.email || null;
        state.uid = data?.uid || null;
    },

};
