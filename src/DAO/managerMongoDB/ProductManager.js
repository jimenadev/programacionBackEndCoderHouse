const  { productModel } = require('../models/products');

class ProductManager{

    products;
    path;

    constructor(){
    }

    addProduct = async (product) =>{
        try {
            let code = product.code;
            const existeCode = await productModel.findOne({ code });

            if(existeCode){
                return {status:400,ok:false, message:'The code already exists'};
            }

            const newProduct = {status:true, ...product};

            productModel.insertMany(newProduct);

            return {status:200, ok:true, message:"The new product was added"};
            
        } catch (error) {
            return {status:500, ok:false, message:`Internal server error ${error}`};
        }

        
    }


    getProducts = async () =>{

        try {
            const listaProducts = await productModel.find({});
            return listaProducts;
        } catch (error) {
            return {status:500, ok:false, message:`Internal server error ${error}`};
        }

    }

    getProductsLimit = async (limit) =>{

        try {

            const listaProducts = await productModel.find({})
                            .skip(0)
                            .limit(limit);

            return listaProducts;
        } catch (error) {
            return {status:500, ok:false, message:`Internal server error ${error}`};
        }

    }

    getProductById = async (pid)=>{

        try {

            let product = await productModel.findById( pid );

            if(!product){
                return {status:400,ok:false, message:`Not found produt con id ${pid}`};
            }

            return product;
        
        } catch (error) {
            return {status:500, ok:false, message:`Internal server error ${error}`};
        }
            
    }

    updateProduct = async (pid, product)=>{

        try {
            const {title, description, price, code, stock, category, thumbnails } = product;
    
            let editProduct =  await  productModel.findById( pid );
            
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
                    const existeCode = await productModel.findOne({ code });
                    if(existeCode){
                        return {status:400,ok:false, message:'The code already exists'};
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

            const productActualizado = await productModel.findByIdAndUpdate(pid,editProduct);

            return {status:200, ok:true, message:"The product was updated"};
        } catch (error) {
            return {status:500, ok:false, message:`Internal server error ${error}`};
        }
    }

    deleteProduct = async (pid) =>{
        try{

            await productModel.deleteOne({_id:pid})

            return {status:200, ok:true, message:"The product was deleted"};
       
        } catch (error) {
            return {status:500, ok:false, message:`Internal server error ${error}`};
        }
        

    }

}

module.exports ={
    ProductManager
}






