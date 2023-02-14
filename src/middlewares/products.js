mdlAddProduct = (req,res,next) =>{

    const { title, description, code, price, stock, category, thumbnails } = req.body;

    let emptyTitle = (title === undefined | title === null | title === "") ? true: false;
    if(emptyTitle){
        return res.status(400).json({
            ok: false,
            message: "properties title is required",
          });
    }

    let emptyDescription = (description === undefined | description === null | description === "") ? true: false;
    if(emptyDescription){
        return res.status(400).json({
            ok: false,
            message: "properties description is required"
          });
    }

    let emptyPrice = (price === undefined | price === null | price === "") ? true: false;
    if(emptyPrice){
        return res.status(400).json({
            ok: false,
            message: "properties price is required"
          });
    }

    let emptyCode = (code === undefined | code === null | code === "") ? true: false;
    if(emptyCode){
        return res.status(400).json({
            ok: false,
            message: "properties code is required"
          });
    }

    let emptyStock = (stock === undefined | stock === null | stock === "") ? true: false;
    if(emptyStock){
        return res.status(400).json({
            ok: false,
            message: "properties stock is required"
          });
    }

    let emptyCategory = (category === undefined | category === null | category === "") ? true: false;
    if(emptyCategory){
        return res.status(400).json({
            ok: false,
            message: "properties category is required"
          });
    }

   
    if (!(typeof(price) === 'number')) {
        return res.status(400).json({
          ok: false,
          message: `the price must be a numeric value (${price})`,
        });
    }

    if (!(typeof(stock) === 'number' )) {
        return res.status(400).json({
          ok: false,
          message: `the stock must be a numeric value (${stock})`,
        });
    }

    if (stock<1) {
        return res.status(400).json({
          ok: false,
          message: `the stock must be greater or the equal to 1 (${stock})`,
        });
    }


    if (!(typeof(title) === 'string')) {
        return res.status(400).json({
          ok: false,
          message: `the title must be a string value (${title})`,
        });
    }

    if ( !(typeof(description) === 'string')){
        return res.status(400).json({
          ok: false,
          message: `the description must be a string value  (${description})`,
        });
    }

    if (!(typeof(code) === 'string')) {
        return res.status(400).json({
          ok: false,
          message: `the code must be a string value  (${code})`,
        });
    }

    if (!(typeof(category) === 'string')) {  
        return res.status(400).json({
          ok: false,
          message: `the category must be a string value  (${category})`,
        });
    }

    let emptyThumbnails = (thumbnails === undefined | thumbnails === null | thumbnails === "") ? true: false;
    if(!emptyThumbnails){
        if( !(Array.isArray(thumbnails) )){
            return res.status(400).json({
                ok: false,
                message: `the thumbnails must be a array  (${thumbnails})`,
            });
        }

        const notString = thumbnails.find(function(element) {
            return !(typeof(element) === 'string');
          });
          
          if(notString){
            return res.status(400).json({
                ok: false,
                message: `the thumbnails must be an array of string (${thumbnails})`,
              });
          } 

    }

    next();
}


mdlGetProductById = (req,res,next) =>{

    const pid = req.params.pid;

    let emptyId = (pid === undefined | pid === null | pid === "") ? true: false;
    if(emptyId){
        return res.status(400).json({
            ok: false,
            message: "properties id is required"
          });
    }

    if (isNaN(pid)) {
        return res.status(400).json({
          ok: false,
          message: `The id is an invalid value (${pid})`,
        });
    }

    next();
}

mdlUpdateProduct = (req,res,next) =>{
    const  pid  = req.params.pid;

    if (isNaN(pid)) {
        return res.status(400).json({
          ok: false,
          message: `The pid is an invalid value (${id})`,
        });
    }


    const { title, description, code, price, stock, category, thumbnails } = req.body;

    let emptyTitle = (title === undefined | title === null | title === "") ? true: false;
    if(!emptyTitle){
        if (!(typeof(title) === 'string')) {
            return res.status(400).json({
              ok: false,
              message: `the title must be a string value (${title})`,
            });
        }
    }

    let emptyDescription = (description === undefined | description === null | description === "") ? true: false;
    if(!emptyDescription){
        if ( !(typeof(description) === 'string')){
            return res.status(400).json({
              ok: false,
              message: `the description must be a string value  (${description})`,
            });
        }
    }

    let emptyPrice = (price === undefined | price === null | price === "") ? true: false;
    if(!emptyPrice){
        if (!(typeof(price) === 'number')) {
            return res.status(400).json({
              ok: false,
              message: `the price must be a numeric value (${price})`,
            });
        }
    }

    let emptyCode = (code === undefined | code === null | code === "") ? true: false;
    if(!emptyCode){
        if (!(typeof(code) === 'string')) {
            return res.status(400).json({
              ok: false,
              message: `the code must be a string value  (${code})`,
            });
        }
    }

    let emptyStock = (stock === undefined | stock === null | stock === "") ? true: false;
    if(!emptyStock){
        if (!(typeof(stock) === 'number' )) {
            return res.status(400).json({
              ok: false,
              message: `the stock must be a numeric value (${stock})`,
            });
        }

        if (stock<0) {
            return res.status(400).json({
              ok: false,
              message: `the stock must be greater or the equal to 0 (${stock})`,
            });
        }
    }

    let emptyCategory = (category === undefined | category === null | category === "") ? true: false;
    if(!emptyCategory){
        if (!(typeof(category) === 'string')) {  
            return res.status(400).json({
              ok: false,
              message: `the category must be a string value  (${category})`,
            });
        }
    }

    let emptyThumbnails = (thumbnails === undefined | thumbnails === null | thumbnails === "") ? true: false;
    if(!emptyThumbnails){
        if( !(Array.isArray(thumbnails) )){
            return res.status(400).json({
                ok: false,
                message: `the thumbnails must be a array  (${thumbnails})`,
            });
        }

        const notString = thumbnails.find(function(element) {
            return !(typeof(element) === 'string');
          });
          
          if(notString){
            return res.status(400).json({
                ok: false,
                message: `the thumbnails must be an array of string (${thumbnails})`,
              });
          } 
    }
    
    next();
}

mdlDeleteProduct = (req,res,next) =>{

    const pid = req.params.pid;

    let emptyId = (pid === undefined | pid === null | pid === "") ? true: false;
    if(emptyId){
        return res.status(400).json({
            ok: false,
            message: "properties id is required"
          });
    }

    if (isNaN(pid)) {
        return res.status(400).json({
          ok: false,
          message: `The id is an invalid value (${pid})`,
        });
    }

    next();
}





module.exports ={
    mdlGetProductById,
    mdlAddProduct,
    mdlUpdateProduct,
    mdlDeleteProduct
}




