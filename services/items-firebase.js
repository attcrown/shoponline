import firebase from 'firebase/compat/app';

export async function createItems(itemsMain) {
    let items = {...itemsMain}
    try {
        for(let x in items.imgs){
            let name = new Date().getTime()
            items.imgs[x].src = await saveImgItems(items.imgs[x].value ,items.id ,name)
            items.imgs[x].value = `${name}.jpg`
        }

        await firebase.database().ref(`items/${items.id}`).set({
            stockItems :  parseInt(items.stockItems),
            view : parseInt(items.view),
            seller : parseInt(items.seller)
        })

        await firebase.firestore().collection('items').doc().set({            
            createdAt : items.createdAt,
            createdUser : items.createdUser,
            dates : items.dates || null,
            deletedAt : items.deletedAt,
            detail : items.detail,
            discount : parseFloat(items.discount) || null,          
            goodSell : Boolean(items.goodSell),
            id : items.id,
            imgs : items.imgs,
            name : items.name,
            price : parseFloat(items.price),
            star : parseFloat(items.star),
            timeEnd : items.timeEnd || null,
            timeFirst : items.timeFirst || null,
            top : Boolean(items.top),
            updatedAt : items.updatedAt
        })
        return true
    } catch (error) {
        console.log(error)
        delItem(items)
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
        const item = await firebase.firestore().collection('items').orderBy('updatedAt','desc').get()
        if(item.empty) return []

        const docs = item.docs
        let data = docs.map(doc => ({idDocs: doc.id, ...doc.data()}))
        //stockitems
        for(const x in data){
            let stockItems = await firebase.database().ref(`items/${data[x].id}`).get()                           
            data[x] = {...data[x] , ...stockItems.val()}
        }
        return data 

    } catch (error) {
        console.log(error)
        return []
    }
}

export async function delItem(itemDel) {
    let items = {...itemDel}
    if(!items || !items.id) return false
    try {
        await firebase.database().ref(`items/${items.id}`).remove()       
    } catch (error) {
        console.log(error)
    }

    try {
        for(const x in items.imgs){
           await firebase.storage().ref(`items/${items.id}/${items.imgs[x].value}`).delete()
        }
    } catch (error) {
        console.log(error)
    }

    try{
        const result = await firebase.firestore().collection('items').where('id', '==', items.id).get()
        if(!result.empty){
            result.forEach(async (doc) => {
                await firebase.firestore().collection('items').doc(doc.id).delete();
            });
        }
    }catch (error) {
        console.log(error)
    }
    return true
}

export async function updateItems(itemUpdate) {
    let items = {...itemUpdate}
    try {
        await firebase.database().ref(`items/${items.id}`).update({
            stockItems : parseInt(items.stockItems),
            view : parseInt(items.view),
            seller : parseInt(items.seller)
        })

        await firebase.firestore().collection('items').doc(items.idDocs).update({
            createdAt : items.createdAt,
            createdUser : items.createdUser,
            dates : items.dates || null,
            deletedAt : items.deletedAt,
            detail : items.detail,
            discount : parseFloat(items.discount) || null,          
            goodSell : Boolean(items.goodSell),
            id : items.id,
            imgs : items.imgs,
            name : items.name,
            price : parseFloat(items.price),
            star : parseFloat(items.star),
            timeEnd : items.timeEnd || null,
            timeFirst : items.timeFirst || null,
            top : Boolean(items.top),
            updatedAt : items.updatedAt
        })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
