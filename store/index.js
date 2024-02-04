// store/index.js
export const state = () => ({
    displayName: null,
    email: null,
    uid: null,
    deviceMode: false,
});


export const mutations = {
    SET_USER(state, data) {
        state.displayName = data?.displayName || null;
        state.email = data?.email || null;
        state.uid = data?.uid || null;
    },

    SET_DEVICE(state, data) {
        state.deviceMode = data || false;
    }
};

