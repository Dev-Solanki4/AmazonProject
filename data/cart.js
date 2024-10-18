import { deliveryOptions } from "./deliveryOptions.js";

export let cart;
loadFromStorage();

export function loadFromStorage(){              // Created to run tests in jasmine
    cart = JSON.parse(localStorage.getItem('cart'))|| [] ;
}

export function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
    let quantity = Number(document.querySelector(`.js-product-quantity-${productId}`).value);
    let matchingId;
    cart.forEach((item)=>{
        if(productId === item.productId){
            matchingId = item;
            item.deliveryOptionId = deliveryOptions[0].id; // Default to the first delivery option
        }
    });
    if(matchingId){
        matchingId.quantity += quantity;
    }else{
        //Used ShortHand technique
        cart.push({   
            productId:productId,     
            quantity:quantity,
            deliveryOptionId:deliveryOptions[0].id
        })
    }
    saveToStorage();
}

export function removeFromCart(productId){
    const newCart = cart.filter((cartItem)=>{
        if(cartItem.productId !== productId){
            return true;
        }else{
            return false;
        }
    })

    cart = newCart;

    saveToStorage();
}

export function calculateCartQuantity(){
    let totalItems=0;
    if(cart){
        cart.forEach((item)=>{
            totalItems += item.quantity;
        })
         return totalItems;
    }else{
        totalItems = 0;
        return totalItems;
    }
}

export function updateDeliveryOption(productId,deliveryOptionId){
    let matchingElement;
    cart.forEach((element)=>{
        if(element.productId === productId){
            matchingElement = element;
        }
    });
    if (matchingElement) {
        matchingElement.deliveryOptionId = deliveryOptionId;
        console.log("Matching Element DeliveryOtion now : "+matchingElement.deliveryOptionId);
        saveToStorage();
    }
}