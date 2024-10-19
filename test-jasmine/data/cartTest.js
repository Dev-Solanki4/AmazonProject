import { addToCart,cart, loadFromStorage } from "../../data/cart.js";

// It is a type of Unit Test : it is used to test for a single function or method i.e 1 piece of code

// **************************** Important***************************
// To run these code make changes to the quantity attrbute inside the object in cart . i.e make it static like from quantity:quantity -> quantity:1 and so on

describe('test suite : addToCart',()=>{
  it('adds an existing product to cart',()=>{	
			spyOn(localStorage,'setItem')
			spyOn(localStorage,'getItem').and.callFake(()=>{ // spyOn is a function which is used to create mocks of an original object or function
				return JSON.stringify([{productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',quantity:1,deliveryOptionId:'1'}]);
			});
	
			console.log(localStorage.getItem('cart'));
			loadFromStorage(); // to load the cart after mocking the localStorage
			
			addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
			console.log(cart.length);
			expect(cart.length).toEqual(1);
			expect(localStorage.setItem).toHaveBeenCalledTimes(1);
			expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
			expect(cart[0].quantity).toEqual(2);
	});

  it('adds a new product to cart',()=>{

		spyOn(localStorage,'setItem')
		spyOn(localStorage,'getItem').and.callFake(()=>{ // spyOn is a function which is used to create mocks of an original object or function
			return JSON.stringify([]);
		});

		console.log(localStorage.getItem('cart'));
		loadFromStorage(); // to load the cart after mocking the localStorage
		
		addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		console.log(cart.length);
		expect(cart.length).toEqual(1);
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart[0].quantity).toEqual(1);
	});
});