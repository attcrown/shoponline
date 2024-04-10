import firebase from "firebase/compat/app";

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
        let stockItemsRef = await firebase.database().ref(`items/${data[x].id}`).get()
        let dataStock = stockItemsRef.val();
        if(dataStock && parseInt(dataStock.stockItems) > 0){
            data[x] = { ...data[x], ...dataStock }
        }
    }
    return data;
}
