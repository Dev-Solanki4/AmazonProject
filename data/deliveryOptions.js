import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [{
    id:'1',
    deliveryDays:7,
    price:0 
},{
    id:'2',
    deliveryDays:3,
    price:499
},{
    id:'3',
    deliveryDays:1,
    price:999
}];

export function getDeliveryOption(deliveryOptionId){
    let deliveryOp;
    deliveryOptions.forEach((option)=>{
        if(option.id === deliveryOptionId){
          deliveryOp = option;
        }
    });

    return deliveryOp || deliveryOptions[0];
}

export function getDeliveryDate(deliveryOp){
    let deliveryDate = dayjs();
    let remainingDays = deliveryOp.deliveryDays;

    //logic for counting deliveryDate while excluding sat/sun
    while(remainingDays > 0){
        deliveryDate = deliveryDate.add(1,'day');
        if(!isWeekend(deliveryDate)){
            remainingDays--;
        }
    }

    const dateString = deliveryDate.format('dddd, MMMM D');

    return dateString;
}

function isWeekend(date) {
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

export function formatDate(dateString){
    const date = new Date(dateString);
    if (isNaN(date)) {
        console.error("Invalid Date:", dateString);
        return "";
    }
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}