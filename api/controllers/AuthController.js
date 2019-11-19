const debug = sails.log.debug;
var jwt = require('jsonwebtoken');

module.exports = {
  async login(req, res) {
    const identification = req.body.identification;
    const password = req.body.password;

    debug('Tentativa de login: ');
    debug(`Identification: ${identification}`);
    debug(`Password: ${password}`);

    const user = await User.findOne({ username: identification});

    if(!user) {
      return res.notFound('Esta conta não existe'); // Retorna erro 404
    }

    if(password !== user.password) {
      return res.send(401, 'Senha inválida'); // Retorna erro 401
    }

    // Cria token
    const token = jwt.sign({ foo: 'bar' }, 'capivara')

    return res.ok({ token });
  }
}
