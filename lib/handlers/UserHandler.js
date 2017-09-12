const User = require('../models/User')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

module.exports.UserCreate = async (event, context, callback) => {

  const user = JSON.parse(event.body).User
  user.Password = bcrypt.hashSync(user.Password, 10)
  user.NewPassword = 0

  const result = await User.create(user)

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};

