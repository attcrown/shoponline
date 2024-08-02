import firebase from "firebase/compat/app";
import { Timestamp } from "firebase/firestore";

export async function saveBasket(countItemsend, item) {
    const auth = firebase.auth();
    const dbDocs = firebase.firestore();

    const countItems = parseInt(countItemsend);
    if (!countItems || !item || !item.idDocs) return { status: false, msg: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" };

    try {
        const user = auth.currentUser;
        if (!user || !user.uid) {
            return { status: false, msg: "กรุณาเข้าสู่ระบบ" };
        }
        // ใช้ Transaction เพื่อควบคุมการอัปเดตข้อมูลในตะกร้าให้ถูกต้อง
        const basketRef = dbDocs.collection('basket').doc(user.uid);
        await dbDocs.runTransaction(async (transaction) => {
            const result = await transaction.get(basketRef);
            const data = result.data();
            let sumBasket = 0;
            if (data && data[item.idDocs]) {
                const basketCountItems = parseInt(data[item.idDocs].countItems);
                const addNewBasketCountItems = countItems + basketCountItems;

                if (item.stockItems === basketCountItems) {
                    throw new Error("จํานวนสินค้าเหลือเพียง " + item.stockItems + " ชิ้น");
                } else if (item.stockItems <= addNewBasketCountItems) {
                    sumBasket = item.stockItems;
                } else if (item.stockItems >= addNewBasketCountItems) {
                    sumBasket = addNewBasketCountItems;
                } else {
                    throw new Error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
                }

                transaction.update(basketRef, {
                    [item.idDocs]: {
                        countItems: parseInt(sumBasket),
                        createdAt: data[item.idDocs].createdAt,
                        updatedAt: Timestamp.now()
                    }
                });
            } else {
                transaction.set(basketRef, {
                    [item.idDocs]: {
                        countItems: countItems || 1,
                        createdAt: Timestamp.now(),
                        updatedAt: Timestamp.now()
                    }
                }, { merge: true });
            }
        });

        return { status: true, msg: "เพิ่มสินค้าเรียบร้อย" };
    } catch (error) {
        return { status: false, msg: error };
    }
}

export async function delBasket(itemId) {
    const auth = firebase.auth();
    const dbDocs = firebase.firestore();

    try {
        if(!itemId) return false
        const user = auth.currentUser;
        await dbDocs.collection('basket').doc(user.uid).update({
            [itemId]: firebase.firestore.FieldValue.delete()
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getBasketAll() {
    const auth = firebase.auth();
    const dbDocs = firebase.firestore();
    const db = firebase.database();

    try {
        let sumData = [];
        const user = auth.currentUser;
        const result = await dbDocs.collection('basket').doc(user.uid).get();
        if (!result.exists) return null

        const data = result.data();
        for(const idDocs in data) {
            const item = await dbDocs.collection('items').doc(idDocs).get();

            if(!item.exists) {
                delBasket(idDocs);
                continue
            }

            let itemData = item.data();

            delete itemData.updatedAt;
            delete itemData.createdAt;

            data[idDocs] = { ...data[idDocs], ...itemData, idDocs: idDocs };
            const itemReal = await db.ref(`items/${data[idDocs].id}`).get();
            if(itemReal.exists) data[idDocs] = {...data[idDocs] , ...itemReal.val()};
            sumData.push(data[idDocs]);
        }
        // sort updateAt
        sumData = sumData.sort((a, b) => b.updatedAt.seconds - a.updatedAt.seconds);
        return sumData
    } catch (error) {
        console.log(error);
        return null
    }
}

export async function updateBasket(item){
    const dbDocs = firebase.firestore();
    const db = firebase.database();
    const auth = firebase.auth();

    const countItems = parseInt(item.countItems);
    const user = auth.currentUser;

    let textAlert = '';
    let sumBasket = 0;
    let newValueItem = {};

    if (!user || !user.uid || !item || !item.idDocs) return { status: false, msg: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" };
    if(!countItems || countItems < 0) return { status: false, msg: "จำนวนสินค้าไม่ถูกต้อง" };

    try {
        const basketRef = dbDocs.collection('basket').doc(user.uid);
        await dbDocs.runTransaction(async (transaction) => {
            const result = await transaction.get(basketRef);
            const data = result.data();

            const getStockItems = await db.ref(`items/${item.id}`).once("value");
            const stockItems = getStockItems.val();
            newValueItem = stockItems;

            if(stockItems.stockItems < 1) {
                item.seller = newValueItem.seller
                item.view = newValueItem.view
                item.stockItems = newValueItem.stockItems
                throw new Error("สินค้าหมด");
            }

            if (stockItems.stockItems < countItems) {
                sumBasket = stockItems.stockItems;
                textAlert = "จำนวนสินค้าเหลือเพียง " + stockItems.stockItems + " ชิ้น"
            } else if (stockItems.stockItems >= countItems) {
                sumBasket = countItems;
                textAlert = "อัพเดทสำเร็จ"
            } else {
                throw new Error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
            }
            transaction.update(basketRef, {
                [item.idDocs]: {
                    countItems: parseInt(sumBasket),
                    createdAt: data[item.idDocs].createdAt,
                    updatedAt: Timestamp.now()
                }
            });
        });
        item.countItems = sumBasket
        item.seller = newValueItem.seller
        item.view = newValueItem.view
        item.stockItems = newValueItem.stockItems

        return { status: true, msg: textAlert};
    } catch (error) {
        return { status: false, msg: error };
    }
}