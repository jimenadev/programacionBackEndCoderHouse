const mongoose = require('mongoose');

const messagesCollection = 'messages';

const messagesSchema = new mongoose.Schema({
    user:{
        type:String,
        required: true,
    },
    message:{
        type:String,
        required:true,
    }
});



messagesSchema.method('toJSON', function(){
    const {_id, ...object} = this.toObject();
    object.mid=_id
    return object;
});


const messagesModel = mongoose.model(messagesCollection, messagesSchema);

module.exports = {
    messagesModel
}



