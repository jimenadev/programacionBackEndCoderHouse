const mongoose = require('mongoose');

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
   title:{
    type:String,
    required: true,
   },
   status:{
    type:Boolean,
    required:true,
   },
   description:{
    type:String,
    required: true,
   },
   price:{
    type:Number,
    required:true,
   },
   code:{
    type:String,
    required:true,
   },
   stock:{
    type:Number,
    required:true,
   },
   category:{
    type:String,
    required:true
   },
   thumbnails:{
    type: Array,
    default:[],
   }
    
});


productsSchema.method('toJSON', function(){
    const {__v,_id, ...object} = this.toObject();
    object.pid=_id
    return object;
});


const productModel = mongoose.model(productsCollection, productsSchema);

module.exports = {
    productModel
}



