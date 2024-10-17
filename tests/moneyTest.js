import { formatCurrency } from "../scripts/utils/money.js";

console.log('test suite : formatCurrency');

console.log('converts cents to dollar');
if(formatCurrency(2095) === '20.95' ){
    console.log('passed');
}else{
    console.log(formatCurrency(2095));
    console.log('failed');
}

console.log('works with 0');
if(formatCurrency(0) === '0.00'){
    console.log('passed');
}else{
    console.log(formatCurrency(0));
    console.log('failed');
}

console.log('works with rounding the nearest cents properly')
if(formatCurrency(2000.5) === '20.01'){
    console.log('passed');
}else{
    console.log(formatCurrency(2000.5));
    console.log('failed');
}
