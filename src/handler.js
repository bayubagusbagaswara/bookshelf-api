const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  // ambil data dari request user
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  // validasi untuk data name
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // validasi readPage > pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // create data yang tidak dikirimkan oleh user
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  // create object book
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  // simmpan object newBook kedalam array books
  books.push(newBook);

  // filter books berdasarkan id, jika id length > 0, maka book berhasil disimpan
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  // response success create a book
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  // response generic error
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

module.exports = { addBookHandler };
