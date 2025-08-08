const chatService = require('../services/chat.service');
const {Message,Chat} = require('../../db/models')

class ChatController {
  static async ask(req, res) {
    const { message } = req.body;
    const {id} = res.locals.user


    const response = await chatService.invoke(message);
  
    res.json({ response });
  }
}

module.exports = ChatController;