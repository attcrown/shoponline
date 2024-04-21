import firebase from "firebase/compat/app";
import { Timestamp } from "firebase/firestore";

export async function saveBasket(countItems ,item) {
    try {
        const user = firebase.auth().currentUser;
        const basketRef = firebase.firestore().collection('basket').doc(user.uid);
        // ตรวจเช็คค่าเก่าของใน ตะกร้า item.idDocs
        const result = await basketRef.get();
        const data = result.data();
        if( data && data[item.idDocs] ){
            if(item.stockItems < (data[item.idDocs].countItems + (parseInt(countItems)))){
                return false
            }
            await basketRef.update({
                [item.idDocs]: {
                    countItems: data[item.idDocs].countItems + (parseInt(countItems) || 1),
                    createdAt: data[item.idDocs].createdAt,
                    updatedAt: Timestamp.now()
                }
            })
            return true
        }

        // ไม่มีค่าเก่าสร้างใหม่
        await basketRef.set({
            [item.idDocs]: {
                countItems: parseInt(countItems) || 1,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            }
        }, { merge: true });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function delBasket(itemId) {
    try {
        if(!itemId) return false
        const user = firebase.auth().currentUser;
        await firebase.firestore().collection('basket').doc(user.uid).update({
            [itemId]: firebase.firestore.FieldValue.delete()
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getBasketAll() {
    try {
        let sumData = [];
        const user = firebase.auth().currentUser;
        const result = await firebase.firestore().collection('basket').doc(user.uid).get();
        if (!result.exists) return null
        
        const data = result.data();
        for(const idDocs in data) {
            const item = await firebase.firestore().collection('items').doc(idDocs).get();
            delete data[idDocs].createdAt;
            delete data[idDocs].updatedAt;
            data[idDocs] = {...data[idDocs] , ...item.data() ,idDocs: idDocs};
            const itemReal = await firebase.database().ref(`items/${data[idDocs].id}`).get();
            if(itemReal.exists) data[idDocs] = {...data[idDocs] , ...itemReal.val()};
            sumData.push(data[idDocs]);
        }
        return sumData
    } catch (error) {
        console.log(error);
        return null
    }
}