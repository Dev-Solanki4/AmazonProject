export let cart = JSON.parse(localStorage.getItem('cart'))|| [] ;

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

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