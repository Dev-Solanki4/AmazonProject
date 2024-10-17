export function formatCurrency(price){
    return Number((Math.round(price)/100).toFixed(2));
}