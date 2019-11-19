/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

  let token = req.headers.authorization;

  if(!token) {
    return res.forbidden('Token ausente');
  }


  token = token.replace('Bearer ', '');
  console.log('Token:', token);

  try {
    var decoded = jwt.verify(token, 'capivara');
    console.log('Decoded: ', decoded);
    return next();
  } catch (err) {
    sails.log.error(err);
    return res.forbidden('Token invalido!');
  }

  return res.forbidden('Usuário não autenticado!');
};
