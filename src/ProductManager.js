const { Console } = require("console");
const fs = require("fs/promises");

class ProductManager{

    products;
    path;

    empty = [undefined,null, ""];


    constructor(path){
        this.products  = [];
        this.path=path;
    }

    addProduct = async (product) =>{

        const { title, description, price, thumbnail, code,stock } = product;

        let emptyTitle = (title === undefined | title === null | title === "") ? true: false;
        if(emptyTitle){
            return "properties title is required";
        }

        let emptyDescription = (description === undefined | description === null | description === "") ? true: false;
        if(emptyDescription){
            return "properties description is required";
        }

        let emptyPrice = (price === undefined | price === null | price === "") ? true: false;
        if(emptyPrice){
            return "properties price is required";
        }

        let emptyThumbnail = (thumbnail === undefined | thumbnail === null | thumbnail === "") ? true: false;
        if(emptyThumbnail){
            return "properties thumbnail is required";
        }

        let emptyCode = (code === undefined | code === null | code === "") ? true: false;
        if(emptyCode){
            return "properties code is required";
        }

        let emptyStock = (stock === undefined | stock === null | stock === "") ? true: false;
        if(emptyStock){
            return "properties stock is required";
        }
    

        try {

           this.products = await this.getProducts();

           let lastId =1;

            if(this.products.products.length>0){
                lastId = this.products.products[this.products.products.length - 1].id + 1;
                let code_new = product.code;
                let code = this.products.products.find(product => product.code === code_new);
        
                if(code){
                    return 'The code already exists';
                }
            }
          
            product.setId(lastId);

            this.products.products.push(product);

            await fs.writeFile(this.path, JSON.stringify(this.products));
            
        } catch (error) {
            console.log(error);
        }

        
    }


    getProducts = async () =>{

        try {
            const listaProducts = await fs.readFile(this.path);
            return JSON.parse(listaProducts);
        } catch (error) {
            console.log(error);
        }

    }

    getProductsLimit = async (limit) =>{

        try {
            this.products = await this.getProducts();
            return this.products.products.slice(0, limit);
        } catch (error) {
            console.log(error);
        }

    }

    getProductById = async (id)=>{

        this.products = await this.getProducts();

        let p = this.products.products.find(product => product.id === id);

        if(!p){
            return 'Not found';
        }

        return p;
    }

    updateProduct = async (product)=>{

        try {
            const { id,  title, description, price, thumbnail, code, stock } = product;

            let emptyId = (id === undefined | id === null | id === "") ? true: false;
            if(emptyId){
                return "properties id is required";
            }
    
            let editProduct =  await this.getProductById(id);
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
    
            let emptyThumbnail = (thumbnail === undefined | thumbnail === null | thumbnail === "") ? true: false;
            if(!emptyThumbnail){
                editProduct.thumbnail = thumbnail;
            }
    
            let emptyCode = (code === undefined | code === null | code === "") ? true: false;
            if(!emptyCode){
                let code_new = code;
    
                if(editProduct.code != code_new){
                    let code = this.products.products.find(product => product.code === code_new);
                    if(code){
                        return 'The code already exists';
                    }
                }
                
                editProduct.code=code;
            
            }
    
            let emptyStock = (stock === undefined | stock === null | stock === "") ? true: false;
            if(!emptyStock){
                editProduct.stock=stock;
            }
    
    
            this.products.products = this.products.products.map( p =>  p.id !== editProduct.id ? p: editProduct);
    
            await fs.writeFile(this.path, JSON.stringify(this.products));
        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (id) =>{

        this.products = await this.getProducts();

        this.products.products = this.products.products.filter((item) => item.id !== id)

        await fs.writeFile(this.path, JSON.stringify(this.products));

    }

}

module.exports ={
    ProductManager
}






