export function formatBath(price){
    price = parseFloat(price)
    if(price === 0 || !price) return 0
    // 1,000.00 | 1,000,000.00 | 1,000,000.00
    return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");            
}

export function formatInt(num){
    num = parseInt(num)
    if(num === 0 || !num) return 0
    // 1,000.00 | 1,000,000.00 | 1,000,000.00
    return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");            
}