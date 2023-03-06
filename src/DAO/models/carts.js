const mongoose = require('mongoose');

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    products:{
        type: Array,
        default:[],
    }
});



cartsSchema.method('toJSON', function(){
    const {_id, ...object} = this.toObject();
    object.cid=_id
    return object;
});


const cartModel = mongoose.model(cartsCollection, cartsSchema);

module.exports = {
    cartModel
}



