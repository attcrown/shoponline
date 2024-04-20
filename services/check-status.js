import firebase from "firebase/compat/app";

export async function checkLoginStatus(auth, store, router) {
    const user = await auth.currentUser
    if (user?.emailVerified) {
        store.commit("SET_USER", user);
        return true
    }
    // ไม่มีสิทธิ์
    router.push("/CenterShop/shop");
    return false
}

export async function addItemsStatus(auth, store, router) {
    const user = await auth.currentUser
    if (user?.emailVerified) store.commit("SET_USER", user);

    const result = await getRoleUser(user?.uid)
    if (result && result.status === 'admin') return true

    // ไม่มีสิทธิ์
    router.push("/CenterShop/shop");
    return false
}

async function getRoleUser(uid){
    try {
        const result = await firebase.firestore().collection('roles').doc(uid).get()
        return result.data()
    } catch (error) {
        return null
    }
}
