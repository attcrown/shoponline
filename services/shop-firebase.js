import firebase from "firebase/compat/app";
import { dateCalculate } from "./calculate-service";

export async function getItemShopAll() {
    const item = await firebase
        .firestore()
        .collection("items")
        .where("deletedAt", "==", null)
        .get();

    if (item.empty) return [];
    
    const docs = item.docs;
    let data = docs.map((doc) => ({ idDocs: doc.id, ...doc.data() }));

    
    for (const x in data) {
        const result = dateCalculate(data[x].dates ,data[x].timeFirst ,data[x].timeEnd);
        
        if(!result.status){
            delete data[x].discount
        }

        let stockItemsRef = await firebase.database().ref(`items/${data[x].id}`).get()
        let dataStock = stockItemsRef.val();
        if(dataStock && dataStock.stockItems > 0){
            data[x] = { ...data[x], ...dataStock }
        }else{
            delete data[x]            
        }
    }

    // กรอกเอาค่าว่างใน Array ออก
    data = data.filter((item) => item !== null && item !== undefined);
    return data;
}
