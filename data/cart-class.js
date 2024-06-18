class Cart{
    cartItems=undefined;
    //the below key is private and can be accessible only within the class
    #localStorageKey=undefined;

    constructor(localStorageKey){
        this.#localStorageKey=localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage (){
        this.cartItems=JSON.parse(localStorage.getItem(this.#localStorageKey));
      //if the cart is empty we are going to use the default value below
      if(!this.cartItems){
        this.cartItems=[
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
      }

      saveToStorage(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
      }

      addToCart(productId){
        let matchingitem;
        this.cartItems.forEach((cartItem)=>{
        if(productId===cartItem.productId){
          matchingitem=cartItem;
        }
        });
    
        const quantitySelector=document.querySelector(`.js-quantity-container-${productId} .js-quantity-select`);
        const quantity=quantitySelector ? parseInt(quantitySelector.value, 10) : 1;
        //console.log(quantity);
    
        if(matchingitem){
          matchingitem.quantity +=quantity;
        }
        else{
          this.cartItems.push({
              productId:productId,
              quantity:1,
              deliveryOptionId:'1'
            });
        } 
        //we need to save the added cart to local storage so using this func below
        this.saveToStorage();
    }

    removeFromCart(productId){
        const newCart=[];
        this.cartItems.forEach((cartItem)=>{
         if(cartItem.productId!==productId) newCart.push(cartItem);
        });
        //here we are chaning oru original cart to the new cart
        this.cartItems=newCart;
        //we need to save the new cart to local storage so using this func below
        this.saveToStorage();
    }

    updateDeliveryOption(productId,deliveryOptionId){
        let matchingitem;
          this.cartItems.forEach((cartItem)=>{
          if(productId===cartItem.productId){
            matchingitem=cartItem;
          }
          });
      
          matchingitem.deliveryOptionId=deliveryOptionId;
          this.saveToStorage();
    }
}

const cart=new Cart('cart-oop');
const businessCart=new Cart('cart-business');

console.log(cart);
console.log(businessCart);

//it is used to check if business cart is generated from the Cart class
console.log(businessCart instanceof Cart);







