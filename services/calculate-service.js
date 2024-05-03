import { formatDatetime ,checkDateNow } from './formatDatetime';
import { PRECEN_STORE } from './const';

export function priceCalculate(priceSend, discountSend ,countItemsSend) {
    var price = priceSend
    var discount = discountSend
    var countItems = countItemsSend
    // ไม่มีราคา
    if (!price) return price = 0

    if (!countItems) countItems = 1
    price = parseFloat(price)
    countItems = parseInt(countItems)

    // ไม่มีส่วนลด
    if (!discount) return price * countItems

    discount = parseFloat(discount)
    return (price * countItems) - (price * countItems) * (discount / PRECEN_STORE)
}

export function unitCalculate(priceSend ,countItemsSend) {
    var price = priceSend
    var countItems = countItemsSend

    if (!price) return price = 0
    if (!countItems) countItems = 1

    price = parseFloat(price)
    countItems = parseInt(countItems)

    return price * countItems
}

export function dateCalculate(datesSend ,timeFirstSend ,timeEndSend , dateNowSend) {
    const dates = datesSend
    const timeFirst = timeFirstSend
    const timeEnd = timeEndSend
    const dateNow = dateNowSend || checkDateNow();
    
    if(!dates || !timeFirst || !timeEnd || !dateNow) return {status:false , far:null}
    
    for(const x in dates){
        const datePromotionStart = formatDatetime(dates[x],timeFirst)
        const datePromotionEnd = formatDatetime(dates[x],timeEnd)
        
        if(dateNow <= datePromotionEnd && dateNow >= datePromotionStart) {        
            const far =  datePromotionEnd.diff(dateNow,['years','months','days','hours','minutes','seconds'])
            return {status:true , far:far}
        }
    }

    return {status:false , far:null}    
}