/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  uploadPicture: function (req, res) {
    console.log(req.body);
    // don't allow the total upload size to exceed ~10MB
    req.file('picture').upload({ maxBytes: 10000000 }, whenDone);

    async function whenDone(err, uploadedFiles) {
      if (err) {
        return res.negotiate(err);
      }

      // Se nenhum arquivo foi recebido, retorne erro
      if (uploadedFiles.length === 0) {
        return res.badRequest('Nenhum arquivo foi enviado');
      }
      // require('util').format('%s/user/avatar/%s', sails.config.appUrl, req.session.me),
      console.log(uploadedFiles[0]);

      const post = await Post.create({
        user: req.body.user,
        text: req.body.text,
        image: uploadedFiles[0].fd
      });

      return res.ok({post});
    }
  },

  picture: async function (req, res) {

    try {
      const post = await Post.findOne(req.param('id'));

      // Se o post não existe retorne 404
      // Se o post não tem imagem, retorne 404
      if (!post || !post.image) return res.notFound();

      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk(/* optional opts */);

      // set the filename to the same file as the user uploaded
      res.set("Content-disposition", "attachment; filename='image.jpg'");

      // Stream the file down
      console.log(`sails.config.appPath`, sails.config.appPath);
      fileAdapter
        .read(sails.config.appPath + '/.tmp/uploads/'+ post.image)
        .on('error', function (err) {
          return res.serverError(err);
        })
        .pipe(res);

    } catch(err) {
      if (err) return res.negotiate(err);
    }
  }
};

