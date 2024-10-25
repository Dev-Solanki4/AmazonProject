import { getOrder } from "../data/orders.js";
import { formatDate } from "../data/deliveryOptions.js";
import { getProduct } from "../data/products.js";

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

function renderTracking(){

    const today = new Date();

    let order = getOrder(orderId);
    
    let matchingItem;
    order.products.forEach((product)=>{
        if(product.productId === productId){
            matchingItem = product;
        }
    })
        
    const orderDate = new Date(order.orderTime);
    const estimatedDeliveryDate = new Date(matchingItem.estimatedDeliveryTime);
    console.log(today);
    console.log(orderDate);
    console.log(estimatedDeliveryDate);

    const daysSinceOrder = calculateDaysLeft(today, orderDate);
    const totalDeliveryTime = calculateDaysLeft(estimatedDeliveryDate, orderDate);

    if (totalDeliveryTime === 0) {
        console.error("Total delivery time is zero, cannot calculate progress percentage.");
        return; 
    }
    let progressPercent = (daysSinceOrder / totalDeliveryTime) *100;

    
    let matchingProduct = getProduct(productId);

    let html = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${formatDate(matchingItem.estimatedDeliveryTime)}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingItem.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width:${progressPercent}%;"></div>
        </div>
    `;

    document.querySelector('.js-order-tracking').innerHTML = html;
    console.log(progressPercent);
}
renderTracking();

function calculateDaysLeft(date1, date2) {
    if (!(date1 instanceof Date) || isNaN(date1) || !(date2 instanceof Date) || isNaN(date2)) {
        console.error("Invalid Date(s) in calculateDaysLeft:", date1, date2);
        return 0; 
    }
    const differenceInMs = date1 - date2;
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
    return differenceInDays;
}
