const { addBookHandler, getBookByIdHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getBookByIdHandler,
  },
];

module.exports = { routes };
