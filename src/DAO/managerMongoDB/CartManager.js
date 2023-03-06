const  { cartModel } = require('../models/carts');

class CartManager{
    constructor(){}

    addCart = async (products) =>{
        try {

             const newCart = {...products};

             await cartModel.create(newCart) ;
 
             return {status:200, ok:true, message:"The new cart was added"};
             
         } catch (error) {
             return {status:500, ok:false, message:`Internal server error ${error}`};
         }
    }
    
    getCartById = async (cid) => {
        try{

            let cart = await cartModel.findById( cid );

            if(!cart){
                return {status:400,ok:false, message:`Not found the cart con id ${cid}`};
            }

            return cart;
            
        } catch (error) {
            return {status:500, ok:false, message:`Internal server error ${error}`};
        }
        
    } 
    
    addProductInCart = async (cid, pid, product) =>{
        try{
            let cart = await cartModel.findById(cid);

            let productFound = await this.getProductInCart(cart, pid);
            
            if(productFound === "Not found"){
                cart.products.push(product);
            }else{
                productFound.quantity = productFound.quantity + product.quantity;
                cart.products = cart.products.filter((item) => item.product !== pid);
                cart.products.push(productFound);
            }

            await cartModel.findByIdAndUpdate(cid,cart);

            return {status:200, ok:true, message:"The product was added in cart"};
        } catch (error) {
            return {status:500, ok:false, message:`Internal server error ${error}`};
        }

    }

    getProductInCart = async (cart, pid) => {

        try{
            let c = cart.products.find(prod => prod.product === pid);

            if(!c){
                return "Not found";
            }

            return c;
        } catch (error) {
            return {status:500, ok:false, message:`Internal server error ${error}`};
        }
            
    } 

    getCarts = async () =>{

        try {
            const listaCarts = await cartModel.find({})
            return listaCarts;
        } catch (error) {
            return {status:500, ok:false, message:`Internal server error ${error}`};
        }

    }

    
}

module.exports ={
    CartManager
}