mdlAddCart = (req,res,next) =>{

    const { products } = req.body;

    let emptyProducts = (products === undefined | products === null | products === "") ? true: false;
    if(emptyProducts){
        return res.status(400).json({
            ok: false,
            message: "properties products is required",
          });
    }

    if( !(Array.isArray(products) )){
        return res.status(400).json({
            ok: false,
            message: `the products must be a array  (${products})`,
        });
    }

    const notString = products.find(function(element) {
        return !(typeof(element.product) === 'number') | !(typeof(element.quantity) === 'number') ;
      });
      
      if(notString){
        return res.status(400).json({
            ok: false,
            message: `the products must be an array of number (${products})`,
          });
      } 

    next();
}

mdlGetCartById = (req,res,next) =>{

    const cid = req.params.cid;

    let emptyId = (cid === undefined | cid === null | cid === "") ? true: false;
    if(emptyId){
        return res.status(400).json({
            ok: false,
            message: "properties cid is required"
          });
    }

    if (isNaN(cid)) {
        return res.status(400).json({
          ok: false,
          message: `The cid is an invalid value (${cid})`,
        });
    }

    next();
}

mdlProductInCart = (req,res,next) =>{

    const cid = req.params.cid;
    const pid = req.params.pid;
    const { product } = req.body;

    let emptyCid = (cid === undefined | cid === null | cid === "") ? true: false;
    if(emptyCid){
        return res.status(400).json({
            ok: false,
            message: "properties cid is required"
          });
    }

    let emptyPid = (pid === undefined | pid === null | pid === "") ? true: false;
    if(emptyPid){
        return res.status(400).json({
            ok: false,
            message: "properties pid is required"
          });
    }


    if (isNaN(cid)) {
        return res.status(400).json({
          ok: false,
          message: `The cid is an invalid value (${cid})`,
        });
    }

    if (isNaN(pid)) {
        return res.status(400).json({
          ok: false,
          message: `The pid is an invalid value (${pid})`,
        });
    }

    if(product !== Number(pid)){
        return res.status(400).json({
            ok: false,
            message: `The pid is not equal id product (in body) (${pid})`,
          });
    }

    next();
}

module.exports={
    mdlAddCart,
    mdlGetCartById,
    mdlProductInCart
}