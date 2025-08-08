const ChatController = require('../controllers/chat.controller');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const chatRouter = require('express').Router();

chatRouter.post('/completions', verifyAccessToken, ChatController.ask);

module.exports = chatRouter;