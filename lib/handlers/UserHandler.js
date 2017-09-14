const User = require('../models/User')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const config = require('../config/config')

module.exports.UserCreate = async (event, context, callback) => {

  const user = JSON.parse(event.body).User
  user.Password = bcrypt.hashSync(user.Password, 10)
  user.NewPassword = 0

  const result = await User.create(user)

  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      message: 'Create successfully!',
      input: event,
    }),
  });
};



module.exports.UserLogin = async (event, context, callback) => {

  const user = JSON.parse(event.body).User

  if (!user.Email || !user.Password) {
    callback(null, {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Ingresa el email y la contraseña.',
        input: event,
      }),
    });
  }

  const UserFind = await User.findOne({ Email: user.Email })

  if (!UserFind) {
    callback(null, {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Ingresa el email y la contraseña.',
        input: event,
      }),
    });
  }
  
  if (await bcrypt.compare(user.Password, UserFind.Password) ){
    console.log("paso")
        const Response = {
          user: {
            email: UserFind.Email,
            _id: UserFind._id
          },
          token: await JWT.sign({ id: UserFind._id }, config.SECRET)
        }

        callback(null, {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(Response),
        });

    } else {
      callback(null, {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          message: 'Ingresa el email y la contraseña.',
          input: event,
        }),
      });
    }



}