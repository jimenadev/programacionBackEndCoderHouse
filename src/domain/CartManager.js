const fs = require("fs/promises");

class CartManager{

    carts;
    path;

    constructor(path){
        this.carts  = [];
        this.path=path;
    }

    addCart = async (products) =>{
        try {
            this.carts = await this.getCarts();

            let lastId =1;
 
             if(this.carts.carts.length>0){
                 lastId = this.carts.carts[this.carts.carts.length - 1].id + 1;
             }
           
             const newCart = {id: lastId, ...products};
             this.carts.carts.push(newCart);
 
             await fs.writeFile(this.path, JSON.stringify(this.carts));
 
             return {status:200, ok:true, message:"The new cart was added"};
             
         } catch (error) {
             return {status:500, ok:false, message:`Internal server error ${error}`};
         }
    }
    
    getCartById = async (cid) => {
        try{

            this.carts = await this.getCarts();

            console.log(this.carts);

            let c = this.carts.carts.find(cart => cart.id === cid);

            if(!c){
                return {status:400,ok:false, message:`Not found the cart con id ${id}`};
            }

            return c;
            
        } catch (error) {
            return {status:500, ok:false, message:`Internal server error ${error}`};
        }
        
    } 
    
    addProductInCart = async (cid, pid, product) =>{
        try{
            let cart = await this.getCartById(cid);

            let productFound = await this.getProductInCart(cart, pid);
            
            if(productFound === "Not found"){
                cart.products.push(product);
            }else{
                productFound.quantity = productFound.quantity + product.quantity;
                cart.products = cart.products.filter((item) => item.product !== pid);
                cart.products.push(productFound);
            }

            this.carts = await this.getCarts();

            const newCarts = {"carts":[]};
            newCarts.carts = this.carts.carts.filter((item) => item.id !== cid);

            newCarts.carts.push(cart);

            await fs.writeFile(this.path, JSON.stringify(newCarts));

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
            const listaCarts = await fs.readFile(this.path);

            console.log(this.path);
            return JSON.parse(listaCarts);
        } catch (error) {
            return {status:500, ok:false, message:`Internal server error ${error}`};
        }

    }
    
}

module.exports ={
    CartManager
}