import {cart as cartClass} from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary(){
    // console.log('payment Summary');

    // Looping through the cart to get the final amount of items
    let totalPrice = 0;
    let deliveryPrice = 0;
    cartClass.cartItems.forEach((cartItem)=>{
        const matchingProduct = getProduct(cartItem.productId);
        
        const priceOfItem = matchingProduct.price*cartItem.quantity;
        totalPrice +=priceOfItem;
        
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        deliveryPrice += deliveryOption.price;
    });
    console.log(totalPrice);
    console.log(deliveryPrice);
    const beforeTaxAmount = totalPrice+deliveryPrice;
    console.log("Before Tax :"+beforeTaxAmount);

    const tax = beforeTaxAmount * 0.1;
    console.log("Tax : "+tax);
    
    const totalBillAmount = tax + beforeTaxAmount;
    console.log("TotalAmount : "+totalBillAmount);

    const paymentSummary = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartClass.calculateCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(totalPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(deliveryPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(beforeTaxAmount)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBillAmount)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>

    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummary;

    document.querySelector('.js-place-order').addEventListener('click',async ()=>{
      
      try{
        const response = await fetch('https://supersimplebackend.dev/orders',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            cart:cartClass.cartItems
          })
        });
  
        const order = await response.json();
        addOrder(order);

      }catch(error){
        console.log("Unexpected Error !! Try again later");
      }
      
      window.location.href = 'orders.html';
      
      cartClass.deleteCart();
      renderPaymentSummary();
      renderOrderSummary();
    });
}