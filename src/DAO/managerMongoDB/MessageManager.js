const  { messagesModel } = require('../models/messages');

class MessageManager{
    constructor(){}

    addMessage = async (message) =>{
        try {

             const newMessage = {...message};

             await messagesModel.create(newMessage) ;
 
             return {status:200, ok:true, message:"The new Message was added"};
             
         } catch (error) {
             return {status:500, ok:false, message:`Internal server error ${error}`};
         }
    }
    
}

module.exports ={
    MessageManager
}