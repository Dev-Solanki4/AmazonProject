import { cart,removeFromCart,updateDeliveryOption } from "../../data/cart.js";
import { products,getProduct } from "../../data/products.js"
import { formatCurrency } from "../utils/money.js"; // here './' represents stay in the current folder
import { calculateCartQuantity } from "../../data/cart.js";
import { saveToStorage } from "../../data/cart.js";
import { deliveryOptions,getDeliveryOption,getDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import renderCheckoutHeader from "./checkoutHeader.js";

// If we have to code something complex then 1st we have to look for an external library online
// dayJs is a famous external library using which we can get the current date and time
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";   // This is an ESM(EcmaScript) Version of dayJs i.e we can import the dayjs directly to the js

// let today = dayjs();
// let deliveryDate = today.add(7,'days');
// console.log(deliveryDate.format('dddd, MMMM D'));

export function renderOrderSummary(){

  let productList = ``;

  cart.forEach((cartItem)=>{

      let productId = cartItem.productId;
      
      // Fetching the whole data of product using cart productId
      const matchingProduct = getProduct(productId);
      
      // Fetching the whole data of delivery using cart deliveryOptionId
      const deliveryOp = getDeliveryOption(cartItem.deliveryOptionId);
      const dateString = getDeliveryDate(deliveryOp);

      productList += `
          <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                  ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    ${matchingProduct.getPrice()}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                      Update
                    </span>
                    <input type="text" class="quantity-input js-quantity-text-${matchingProduct.id}" />
                    <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingProduct,cartItem)}
                </div>
              </div>
            </div>
      `
  });

  function deliveryOptionsHTML(matchingProduct,cartItem){

    let html = ``;

    deliveryOptions.forEach((option)=>{

      // For Dates
      const dateString = getDeliveryDate(option);

      //For Price
      const priceString = option.price === 0 ? 'FREE' : `$${formatCurrency(option.price)}`

      // For checking the Radio Button
      const isChecked = option.id === cartItem.deliveryOptionId;
      // console.log(option.id);
      // console.log(matchingProduct.id);

    html+= `
        <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${option.id}">
                    <input type="radio"
                      ${isChecked ? 'checked':''}
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        ${dateString}
                      </div>
                      <div class="delivery-option-price">
                        ${priceString} - Shipping
                      </div>
                    </div>
                  </div>
      `
    })
    return html;
  }

  // Used to print the cart Products
  document.querySelector('.js-order-summary').innerHTML = productList;

  //To load the number of items in cart when the page loads
  renderCheckoutHeader();

  // Collecting all the delete links from the products in cart
  document.querySelectorAll('.js-delete-link').forEach((link)=>{
      // adding listener into them
      link.addEventListener('click',()=>{

          const productId = link.dataset.productId;
          removeFromCart(productId); // function created in cart.js  

          // // Fetching the Container of the product to be removed
          // const container = document.querySelector(`.js-cart-item-container-${productId}`);
          // // removing the product from the cart Item display  
          // container.remove();
          
          renderOrderSummary();

          //Update total items in cart
          renderCheckoutHeader();

          // Rebuild the payment section
          renderPaymentSummary();

      })
  });

  // adding listener to the update link
  document.querySelectorAll('.js-update-link').forEach((link)=>{
    link.addEventListener('click',()=>{
      let productId = link.dataset.productId;

      let container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    })
  })


  // functionalities of Save link
  document.querySelectorAll('.js-save-link').forEach((link)=>{
    link.addEventListener('click',()=>{

      let productId = link.dataset.productId;
      let matchingId = " ";

      // Getting the container for adding/removing css from it
      let container = document.querySelector(`.js-cart-item-container-${productId}`);

      // Fetching the product from the cart to update its value
      cart.forEach((Item)=>{
        if(Item.productId === productId){
          matchingId=Item;
        }
      });

      if(matchingId){
        // Getting the new values for the product
        let newQuantity = Number(document.querySelector(`.js-quantity-text-${productId}`).value);
    
        //Validation for the input
        if(newQuantity>=0 && newQuantity<100 && calculateCartQuantity()<=100){

          matchingId.quantity = newQuantity;
          //Updating the value in HTML
          document.querySelector('.quantity-label').innerText = `${matchingId.quantity}`;
      
          //Removing the class to display the update link and the quantity value
          container.classList.remove('is-editing-quantity');
          
          //Rewriting the html code of the Web Page
          renderOrderSummary();
      
          //Regenerating the payment Section
          renderPaymentSummary();

          // Saving items of cart into localStorage
          saveToStorage();
      
          //Updating the cartItems
          renderCheckoutHeader();

        }
      }
    })
  });

  // Radion buttons
  // console.log(document.querySelectorAll('.js-delivery-option'));
  document.querySelectorAll('.js-delivery-option').forEach((radio)=>{
    radio.addEventListener('click',()=>{
      
      let productId = radio.dataset.productId;
      let deliveryOptionId = radio.dataset.deliveryOptionId;

      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();

    });
  });

}
renderOrderSummary();
