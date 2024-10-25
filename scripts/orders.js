import { orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import { formatDate } from "../data/deliveryOptions.js";
import { formatCurrency } from "./utils/money.js";
import { cart } from "../data/cart-class.js";

function renderOrderDetails(){

    let html = ``;

    orders.forEach((order)=>{

        const orderCart = order.products;

        html += `
        <div class="order-container">  
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formatDate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${orderCartItems(orderCart,order.id)}
          </div>
        </div>
        `;
       console.log(order);
    //    console.log(order.id);
    //    console.log(orderCart);
    // console.log(order.orderTime);
    // console.log(orderCart);
    })

    document.querySelector('.js-order-grid').innerHTML = html;

}

cartQuantity();
renderOrderDetails();

function cartQuantity(){
    let displayNoItems = document.querySelector('.js-cart-quantity');
    displayNoItems.innerText = `${cart.calculateCartQuantity()}`;
  }

function orderCartItems(cartItems,orderId){
    
    let productHtml = ``;
    let matchingId;

    cartItems.forEach((item)=>{
        matchingId= getProduct(item.productId);
        
        productHtml += `
            <div class="product-image-container">
                <img src="${matchingId.image}"> 
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingId.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${formatDate(item.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity">
                Quantity: ${item.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message js-buy-again" data-order-id="${orderId}" data-product-id="${item.productId}">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${orderId}&productId=${matchingId.id}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
        `;
    });

    return productHtml;
}

document.querySelectorAll('.js-buy-again').forEach((button)=>{

    button.addEventListener('click',()=>{
        let productId = button.dataset.productId;
        let orderId = button.dataset.orderId;

        // Update the cart
        cart.addSingleProductToCart(productId);
        cartQuantity();
    })

})
