// we need to import the required variables from the script using the import statement
import {cart, addToCart} from "../data/cart.js"; // here ".." signifies that we are getting out of the current folder i.e script and then going to the specified path
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { calculateCartQuantity } from "../data/cart.js";
// we can rename the import as "import {cart as myCart} from "path" . by which we can avoid conflict in the current file


// The product list is already created in the data folder so we can extract in out HTML first and then will use that in our amazon.js

let productsHtml = ``; // This is the accumulator pattern which shows that we are accumulating the html of all products together

// toFixed method in the price is a method using which we can force the number to the desired no. of decimal values
products.forEach((product)=>{
    productsHtml += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class=" js-product-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-message-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
})


let grid = document.querySelector('.products-grid');
grid.innerHTML = productsHtml;

let timeoutId;

cartQuantity();

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
  
  // adding Event listener to every Button
  button.addEventListener('click',()=>{

    // dataset is used to give info about all the data attributes added to the HTML element
        const productId = button.dataset.productId;
        
        //Printing the Added Message
        message(productId);
        
        // For adding item to the cart with quantity
        addToCart(productId);

        // For Updating total Quantities of the cart
        cartQuantity();
        console.log(cart);
      })
    });


    function message(productId){
      let message = document.querySelector(`.js-added-message-${productId}`);
            clearTimeout(timeoutId);
            message.classList.add('add-to-cart-message');
            timeoutId = setTimeout(()=>{
                message.classList.remove('add-to-cart-message');
            },2000);
    }
    
  function cartQuantity(){
    let displayNoItems = document.querySelector('.js-cart-quantity');
    displayNoItems.innerText = `${calculateCartQuantity()}`;
  }