const MessageManager = require("../DAO/managerMongoDB/MessageManager");
const messageManager = new MessageManager.MessageManager();

addMessage = async (data) =>{

    await messageManager.addMessage(data);
    
}
  


module.exports ={
    addMessage
}