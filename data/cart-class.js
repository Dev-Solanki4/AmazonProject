import { deliveryOptions } from "./deliveryOptions.js";

class Cart {
	
	cartItems = undefined;

	// We can place '#' in front of a variable to make it private, but we also need to use the # when we have to use the value as shown on line 11,16,28
	#localStorageKey;          // we can just not write the variable = undefined part and still it will work the same

	constructor(localStorageKey){
		this.#localStorageKey = localStorageKey;
		this.#loadFromStorage();
	}

	#loadFromStorage() {         // Similarly we can do it here as well      
		this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
				productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity:2,
				deliveryOptionId:'1'
		},{
				productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
				quantity:1,
				deliveryOptionId:'1'
		}];
	}

	saveToStorage(){
		localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
	}

	addToCart(productId){
		let matchingId;
		this.cartItems.forEach((item)=>{
				if(productId === item.productId){
						matchingId = item;
						item.deliveryOptionId = deliveryOptions[0].id; // Default to the first delivery option
				}
		});
		if(matchingId){
				matchingId.quantity += 1;
		}else{
				//Used ShortHand technique
				this.cartItems.push({   
						productId:productId,     
						quantity:1,
						deliveryOptionId:deliveryOptions[0].id
				})
		}
		this.saveToStorage();
	}

	removeFromCart(productId){
		const newCart = this.cartItems.filter((cartItem)=>{
				if(cartItem.productId !== productId){
						return true;
				}else{
						return false;
				}
		})

		this.cartItems = newCart;

		this.saveToStorage();
	}

	calculateCartQuantity(){
		let totalItems=0;
		if(this.cartItems){
				this.cartItems.forEach((item)=>{
						totalItems += item.quantity;
				})
				 return totalItems;
		}else{
				totalItems = 0;
				return totalItems;
		}
	}

	updateDeliveryOption(productId,deliveryOptionId){
		let matchingElement;
		this.cartItems.forEach((element)=>{
				if(element.productId === productId){
						matchingElement = element;
				}
		});
		if (matchingElement) {
				matchingElement.deliveryOptionId = deliveryOptionId;
				console.log("Matching Element DeliveryOtion now : "+matchingElement.deliveryOptionId);
				this.saveToStorage();
		}
	}
}

const cart = new Cart('cart-oop');
const buisnessCart = new Cart('cart-buisness');

cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');

// cart.#localStorageKey;
// cart.#loadFromStorage();           // We cannot use them here as they are declared as private fields

console.log(cart)
console.log(buisnessCart);
