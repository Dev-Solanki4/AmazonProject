// let products = [{
//         image : 'images/products/athletic-cotton-socks-6-pairs.jpg',
//         name : 'Black and Gray Athletic Cotton Socks - 6 Pairs',
//         rating :{
//             stars : 4.5,
//             count : 87
//         },
//         price : 1090 // in cents
//     },{
//         image : 'images/products/intermediate-composite-basketball.jpg',
//         name : 'Intermediate Size Basketball',
//         rating:{
//             stars:4,
//             count:127
//         },
//         price:2095
//     },{
//         image : 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//         name : 'Adults Plain Cotton T-Shirt - 2 Pack',
//         rating:{
//             stars:4.5,
//             count:56
//         },
//         price:799
//     },{
//         image:'images/products/black-2-slot-toaster.jpg',
//         name: '2 Slot Toaster-Black',
//         rating:{
//             stars:5,
//             count:2197
//         },
//         price:1899
//     }
// ];

// This product list is already created in the data folder so we can extract in out HTML first and then will use that in our amazon.js

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
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.price/100).toFixed(2)}
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

          <div class="added-to-cart">
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

document.querySelectorAll('.js-add-to-cart')
 .forEach((button)=>{
    button.addEventListener('click',()=>{
        // console.log(`This is Button of item ${index}`);
        // dataset is used to give info about all the data attributes added to the HTML element
        
        // For adding item to the cart with quantity
        const productId = button.dataset.productId;
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
            cart.push({
                productId : productId,
                quantity : quantity
            })
        }

        // For Updating total Quantities of the cart
        let totalItems=0;
        cart.forEach((item)=>{
            totalItems += item.quantity;
        })
        document.querySelector('.js-cart-quantity').innerText = `${totalItems}`;
        console.log(cart);
    })
 });