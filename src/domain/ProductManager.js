const fs = require("fs/promises");

class ProductManager{

    products;
    path;

    constructor(path){
        this.products  = [];
        this.path=path;
    }

    addProduct = async (product) =>{
        try {

           this.products = await this.getProducts();
           let lastId =1;

            if(this.products.products.length>0){
                lastId = this.products.products[this.products.products.length - 1].id + 1;
                let code_new = product.code;
                let code = this.products.products.find(product => product.code === code_new);
           
                if(code){
                    return {status:400,ok:false, message:'The code already exists'};
                }
            }
          
            const newProduct = {id: lastId, status:true, ...product};
            this.products.products.push(newProduct);

            await fs.writeFile(this.path, JSON.stringify(this.products));

            return {status:200, ok:true, message:"The new product was added"};
            
        } catch (error) {
            return {status:500, ok:false, message:`Internal server error ${error}`};
        }

        
    }


    getProducts = async () =>{

        try {
            const listaProducts = await fs.readFile(this.path);
            return JSON.parse(listaProducts);
        } catch (error) {
            return {status:500, ok:false, message:`Internal server error ${error}`};
        }

    }

    getProductsLimit = async (limit) =>{

        try {
            this.products = await this.getProducts();
            return this.products.products.slice(0, limit);
        } catch (error) {
            return {status:500, ok:false, message:`Internal server error ${error}`};
        }

    }

    getProductById = async (id)=>{

        this.products = await this.getProducts();

        let p = this.products.products.find(product => product.id === id);

        if(!p){
            return {status:400,ok:false, message:`Not found produt con id ${id}`};
        }

        return p;
    }

    updateProduct = async (id, product)=>{

        try {
            const {title, description, price, code, stock, category, thumbnails } = product;
    
            let editProduct =  await this.getProductById(id);
           
            if(editProduct.status === 400){
                return editProduct;
            }

            this.products = await this.getProducts();
            
            let emptyTitle = (title === undefined | title === null | title === "") ? true: false;
            if(!emptyTitle){
                editProduct.title = title;
            }
    
            let emptyDescription = (description === undefined | description === null | description === "") ? true: false;
            if(!emptyDescription){
                editProduct.description = description;
            }
    
            let emptyPrice = (price === undefined | price === null | price === "") ? true: false;
            if(!emptyPrice){
                editProduct.price = price;
            }
    
            let emptyCode = (code === undefined | code === null | code === "") ? true: false;
            if(!emptyCode){
                let code_new = code;
    
                if(editProduct.code != code_new){
                    let code = this.products.products.find(product => product.code === code_new);
                    if(code){
                        return {status:400, ok:true, message:'The code already exists'};
                    }
                }
                
                editProduct.code=code;
            
            }
    
            let emptyStock = (stock === undefined | stock === null | stock === "") ? true: false;
            if(!emptyStock){
                editProduct.stock=stock;

                editProduct.status=true;
                if(stock===0){
                    editProduct.status=false;
                }
            }

            let emptyCategory = (category === undefined | category === null | category === "") ? true: false;
            if(!emptyCategory){
                editProduct.category=category;
            }

            let emptyThumbnails = (thumbnails === undefined | thumbnails === null | thumbnails === "") ? true: false;
            if(!emptyThumbnails){
                editProduct.thumbnails=thumbnails;
            }

            this.products.products = this.products.products.map( p =>  p.id !== editProduct.id ? p: editProduct);
    
            await fs.writeFile(this.path, JSON.stringify(this.products));

            return {status:200, ok:true, message:"The product was updated"};
        } catch (error) {
            return {status:500, ok:false, message:`Internal server error ${error}`};
        }
    }

    deleteProduct = async (id) =>{
        try{

            let Product = await this.getProductById(id);

            if(Product.status === 400){
                return Product;
            }

            this.products = await this.getProducts();

            const newProducts = {"products":[]};
            newProducts.products = this.products.products.filter((item) => item.id !== id);

            await fs.writeFile(this.path, JSON.stringify(newProducts));

            return {status:200, ok:true, message:"The product was deleted"};
       
        } catch (error) {
            return {status:500, ok:false, message:`Internal server error ${error}`};
        }
        

    }

}

module.exports ={
    ProductManager
}






