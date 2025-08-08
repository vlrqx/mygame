require('dotenv').config();
const jwt = require('jsonwebtoken');
const formatResponse = require('../utils/formatResponse');

function verifyRefreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;

    const { user } = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);

    res.locals.user = user;

    next();
  } catch ({ message }) {
    console.log('======= Invalid refresh token =======', message);
   
    res
      .status(401) 
      .clearCookie('refreshToken') 
      .json('Invalid refresh token')

  }
}

module.exports = verifyRefreshToken;
