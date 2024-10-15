export let cart = [];

export function addToCart(productId){
    let quantity = Number(document.querySelector(`.js-product-quantity-${productId}`).value);
    let matchingId;
    cart.forEach((item)=>{
        if(productId === item.productId){
            matchingId = item;
        }
    })
    if(matchingId){
        matchingId.quantity += quantity;
    }else{
        //Used ShortHand technique
        cart.push({   
            productId,     
            quantity
        })
    }
  }