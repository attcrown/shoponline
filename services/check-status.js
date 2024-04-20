import firebase from "firebase/compat/app";

export function publicStatus(auth, store) {
    auth.onAuthStateChanged((user) => {
        if (user && user?.emailVerified) {
            store.commit("SET_USER", user);
            return;
        }
        // ไม่มีผู้ใช้ลงทะเบียน, ทำการเข้าสู่ระบบ
        store.commit("SET_USER", null);
    });
}


export function checkLoginStatus(auth, store, router) {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            if (user && user.emailVerified) {
                store.commit("SET_USER", user);
                resolve(true);
            } else {
                // ไม่มีสิทธิ์
                router.push("/CenterShop/shop");
                resolve(false);
            }
        }, error => {
            reject(error);
        });
    });
}

export function addItemsStatus(auth, store, router) {
    return new Promise(async(resolve, reject) => {
        const checkLogin = await checkLoginStatus(auth, store, router)
        if(checkLogin){
            const user = await auth.currentUser
            const result = await getRoleUser(user?.uid)
            if (result && result.status === 'admin'){
                resolve(true)
            }else{
                router.push("/CenterShop/shop");
                resolve(false)
            }
        }else{
            resolve(false)
        }
        
    })
}

async function getRoleUser(uid){
    try {
        const result = await firebase.firestore().collection('roles').doc(uid).get()
        return result.data()
    } catch (error) {
        return null
    }
}
