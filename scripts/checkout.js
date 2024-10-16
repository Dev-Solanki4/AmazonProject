import {cart,removeFromCart} from "../data/cart.js"
import { products } from "../data/products.js"
import { formatCurrency } from "./utils/money.js"; // here './' represents stay in the current folder
import { calculateCartQuantity } from "../data/cart.js";
import { saveToStorage } from "../data/cart.js";

let productList = ``;
let items = 0;

cart.forEach((cartItem)=>{

    let productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product)=>{
        if(product.id === productId){
            items+=1;
            matchingProduct = product
        }
    });

    productList += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.price)}
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${items}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${items}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${items}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `
});

// Used to print the cart Products
document.querySelector('.js-order-summary').innerHTML = productList;

//To load the number of items in cart when the page loads
cartItems();

// Collecting all the delete links from the products in cart
document.querySelectorAll('.js-delete-link').forEach((link)=>{
    // adding listener into them
    link.addEventListener('click',()=>{

        const productId = link.dataset.productId;
        removeFromCart(productId); // function created in cart.js  

        // Fetching the Container of the product to be removed
        const container = document.querySelector(`.js-cart-item-container-${productId}`);

        // removing the product from the cart Item display  
        container.remove();

        //Update total items in cart
        cartItems();

    })
});

// function to print the number of items in cart
function cartItems(){
  document.querySelector('.js-total-item').innerText = `${calculateCartQuantity()} items`;
}


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
    
        saveToStorage();
    
        //Updating the cartItems
        cartItems();
      }
    }
  })
});
