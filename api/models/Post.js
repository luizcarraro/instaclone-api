/**
 * Post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    image: 'string',
    text: 'string',

    user: {
      model: 'user'
    },

    comments: {
      collection: 'comment',
      via: 'banana'
    }

  }
};

