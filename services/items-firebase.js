import firebase from 'firebase/compat/app';

export async function createItems(itemsMain) {
    let items = itemsMain
    try {
        for(let x in items.imgs){
            let name = new Date().getTime()
            items.imgs[x].src = await saveImgItems(items.imgs[x].value ,items.id ,name)
            items.imgs[x].value = `${name}.jpg`
        }

        firebase.database().ref(`items/${items.id}`).set({
            stockItems : items.stockItems,
            view : items.view,
            seller : items.seller
        })

        delete items.stockItems
        delete items.view
        delete items.seller

        firebase.firestore().collection('items').doc().set({
            ...items
        })
        return true
    } catch (error) {
        console.log(error)
        firebase.storage().ref(`items/${items.id}`).delete()
        firebase.database().ref(`items/${items.id}`).delete()
        firebase.firestore().collection('items').where('id', '==', items.id).delete()
        return false
    }
}
    
async function saveImgItems(img ,id ,name){
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`items/${id}/${name}.jpg`);
    // บันทึกรูป
    await imageRef.put(img);
    // get link img
    const downloadURL = await imageRef.getDownloadURL();
    return downloadURL
}

export async function getItemsAll() {
    try {
        const item = await firebase.firestore().collection('items').get()
        if(item.empty) return []

        const docs = item.docs
        let data = docs.map(doc => doc.data())

        //stockitems
        for(const x in data){
            let stockItems = await firebase.database().ref(`items/${data[x].id}`).get()
            if(stockItems.exists()){
                data[x] = {...data[x] , ...stockItems.val()}
            }
        }
        
        return data 

    } catch (error) {
        console.log(error)
        return []
    }
    
}
