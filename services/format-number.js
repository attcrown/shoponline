export function formatBath(price){
    price = parseFloat(price)
    if(price === 0 || !price) return 0
    // 1,000.00 | 1,000,000.00 | 1,000,000.00
    return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");            
}

export function formatInt(num){
    num = parseInt(num)
    if(num === 0 || !num) return 0
    // 1,000 | 1,000,000 | 1,000,000
    return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");            
}

export function formatText(text ,deviceMode) {
    if(!deviceMode && text.length > 27) return text.substring(0, 27) + '...'
    if(deviceMode && text.length > 14) return text.substring(0, 14) + '...'
    return text
}

export function formatTextBasket(text ,deviceMode) {
    if(!deviceMode) return text
    if(deviceMode && text.length > 25) return text.substring(0, 25) + '...'
    return text
}