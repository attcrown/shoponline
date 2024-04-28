import { checkDateNow} from './formatDatetime'
import { PRECEN_STORE } from './const'
export function percenBlockWorking(items) {
    const item = {...items}
    const nowDayTime = item.nowAt || checkDateNow() // ตรวจสอบวันที่ปัจจุบัน

    const checkStartToNowDay = nowDayTime.diff(item.createAt, ['days','hours'])
    const farDay = calcuateFarDay(checkStartToNowDay, item.contract)
    const profitNow = calcuateProfitNow(checkStartToNowDay ,item.cost ,item.block) 
    const profitAll = calcuateProfitAll(item.contract ,item.cost ,item.block)
    const percenStore = calcuatePercenStore(checkStartToNowDay ,item.contract)
    
    const result = {
        status : true,
        farDay : farDay,
        profitNow : profitNow,
        profitAll : profitAll,
        percenStore : percenStore,
        checkStartToNowDay : checkStartToNowDay,
        nowDayTime : nowDayTime,
        ...item
    }
    
    if(!farDay && farDay != 0 || 
        !profitNow && profitNow != 0 || 
        !profitAll && profitAll != 0 || 
        !percenStore && percenStore != 0) return {status:false}
        
    return result;
}

function calcuateFarDay(dateNowToStart , contract) {
    if(!dateNowToStart || !contract) return null
    if(!dateNowToStart.days) return 0
    const result = parseInt(contract) - parseInt(dateNowToStart.days)
    if(parseInt(result) < 0) return null
    return parseInt(result)
}

function calcuateProfitNow(time , cost ,block) {
    if(!time || !cost || !block) return null

    let sum = 0
    if(time.days > 0) {
        sum = time.days * 24 * parseFloat(cost)
    }
    if(time.hours > 0) {
        sum += time.hours * parseFloat(cost)
    }
    const result = (sum*block).toFixed(2)

    if(parseFloat(result) < 0) return null
    return parseFloat(result)
}

function calcuateProfitAll(contract , cost ,block) {
    if(!contract || !cost || !block) return null
    const result = (parseInt(contract) * 24 * parseFloat(cost) * block).toFixed(2)

    if(parseFloat(result) < 0) return null
    return parseFloat(result)
}

function calcuatePercenStore(dateNowToStart, contract) {
    if(!dateNowToStart || !contract) return null
    const result = (parseInt(dateNowToStart.days) * PRECEN_STORE / parseInt(contract))
    
    if(parseInt(result) < 0) return null
    return parseInt(result)
}