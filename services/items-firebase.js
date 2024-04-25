import firebase from 'firebase/compat/app';

export async function createItems(itemsMain) {
    let items = {...itemsMain}
    const dbDocs = firebase.firestore();
    const db = firebase.database();
    try {
        for(let x in items.imgs){
            let name = new Date().getTime()
            items.imgs[x].src = await saveImgItems(items.imgs[x].value ,items.id ,name)
            items.imgs[x].value = `${name}.jpg`
        }

        await db.ref(`items/${items.id}`).set({
            stockItems :  parseInt(items.stockItems),
            view : parseInt(items.view),
            seller : parseInt(items.seller)
        })

        await dbDocs.collection('items').doc().set({            
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
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`items/${id}/${name}.jpg`);
    // บันทึกรูป
    await imageRef.put(img);
    // get link img
    const downloadURL = await imageRef.getDownloadURL();
    return downloadURL
}

export async function getItemsAll() {
    const db = firebase.database();
    const dbDocs = firebase.firestore();

    try {
        const item = await dbDocs.collection('items').orderBy('updatedAt','desc').get()
        if(item.empty) return []

        const docs = item.docs
        let data = docs.map(doc => ({idDocs: doc.id, ...doc.data()}))
        //stockitems
        for(const x in data){
            let stockItems = await db.ref(`items/${data[x].id}`).get()                           
            data[x] = {...data[x] , ...stockItems.val()}
        }
        return data 

    } catch (error) {
        console.log(error)
        return []
    }
}

export async function delItem(itemDel) {
    const db = firebase.database();
    const dbDocs = firebase.firestore();
    const storage = firebase.storage();

    let items = {...itemDel}

    if(!items || !items.id) return false
    try {
        await db.ref(`items/${items.id}`).remove()       
    } catch (error) {
        console.log(error)
    }

    try {
        for(const x in items.imgs){
           await storage.ref(`items/${items.id}/${items.imgs[x].value}`).delete()
        }
    } catch (error) {
        console.log(error)
    }

    try{
        const result = await dbDocs.collection('items').where('id', '==', items.id).get()
        if(!result.empty){
            result.forEach(async (doc) => {
                await dbDocs.collection('items').doc(doc.id).delete();
            });
        }
    }catch (error) {
        console.log(error)
    }
    return true
}

export async function updateItems(itemUpdate ,imgOld) {
    const db = firebase.database();
    const dbDocs = firebase.firestore();
    const storage = firebase.storage();
    
    const items = itemUpdate
    const itemsImgOld = imgOld
    const imgsNew = items.imgs
    let AllFileNameJpg = []

    try {
        // ตรวจสอบการเพิ่มรูปภาพใหม่
        for(const x in imgsNew){            
            // imgsNew === file Blob
            if(imgsNew[x].value instanceof Blob){
                const name = new Date().getTime()
                const result = await saveImgItems(imgsNew[x].value ,items.id ,name)
                imgsNew[x].src = result
                imgsNew[x].value = `${name}.jpg`
            }
            AllFileNameJpg.push(imgsNew[x].value)
        }
        //ตรวจสอบรูปภาพนำออก
        for(const x in itemsImgOld){
            if(!AllFileNameJpg.includes(itemsImgOld[x].value)){
                storage.ref(`items/${items.id}/${itemsImgOld[x].value}`).delete()
            }
        }
        // อัพเดทข้อมูล Realtime
        await db.ref(`items/${items.id}`).update({
            stockItems : parseInt(items.stockItems),
            view : parseInt(items.view),
            seller : parseInt(items.seller)
        })
        // อัพเดทข้อมูล Firestore
        await dbDocs.collection('items').doc(items.idDocs).update({
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

export async function updateView(id) {
    const db = firebase.database();
    try {
        await db.ref(`items/${id}`).transaction((currentData) => {
            if (currentData === null) return
            return { ...currentData, view: (currentData.view || 0) + 1 };
        });
    } catch (error) {
        console.log(error)
    }
}




