export let cart;
loadFromStorage();

export function loadFromStorage(){
  cart=JSON.parse(localStorage.getItem('cart'));
//if the cart is empty we are going to use the default value below
if(!cart){
  cart=[
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:2,
      deliveryOptionId:'1'
    },{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity:1,
      deliveryOptionId:'2'
    }
    ];
}
};


function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
    let matchingitem;
    cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      matchingitem=cartItem;
    }
    });

    const quantitySelector=document.querySelector(`.js-quantity-container-${productId} .js-quantity-select`);
    const quantity=parseInt(quantitySelector.value,10);
    //console.log(quantity);

    if(matchingitem){
      matchingitem.quantity +=quantity;
    }
    else{
      cart.push({
          productId:productId,
          quantity:quantity,
          deliveryOptionId:'1'
        });
    } 
    //we need to save the added cart to local storage so using this func below
    saveToStorage();
};

export function removeFromCart(productId){
  const newCart=[];
  cart.forEach((cartItem)=>{
   if(cartItem.productId!==productId) newCart.push(cartItem);
  });
  //here we are chaning oru original cart to the new cart
  cart=newCart;
  //we need to save the new cart to local storage so using this func below
  saveToStorage();
}


export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingitem;
    cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      matchingitem=cartItem;
    }
    });

    matchingitem.deliveryOptionId=deliveryOptionId;
    saveToStorage();
}