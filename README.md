# Bookshelf API

# Library

- npm init --y
- npm install nodemon --save-dev
- npm install eslint --save-dev
- npx eslint --init
- npm install @hapi/hapi

# API Specification

## Data Book yang disimpan

```json
{
  "id": "string",
  "name": "string",
  "year": "number",
  "author": "string",
  "summary": "string",
  "publisher": "string",
  "pageCount": "number",
  "readPage": "number",
  "reading": "boolean"
}
```

## Example data Book 

```json
{
  "id": "Qbax5Oy7L8WKf74l",
  "name": "Buku A",
  "year": 2010,
  "author": "John Doe",
  "summary": "Lorem ipsum dolor sit amet",
  "publisher": "Dicoding Indonesia",
  "pageCount": 100,
  "readPage": 25,
  "finished": false,
  "reading": false,
  "insertedAt": "2021-03-04T09:11:44.598Z",
  "updatedAt": "2021-03-04T09:11:44.598Z"
}
```

# Create New Book

- Method : `POST`
- URL : `/books`
- Request Body :

```json
{
  "name": "string",
  "year": "number",
  "author": "string",
  "summary": "string",
  "publisher": "string",
  "pageCount": "number",
  "readPage": "number",
  "reading": "boolean"
}
```

### Response Failed (client tidak melampirkan property name)

- Status Code : `400`
- Response Body :

```json
{
  "status": "fail",
  "message": "Gagal menambahkan buku. Mohon isi nama buku"
}
```

### Response Failed (nilai readPage lebih besar dari nilai pageCount)

- Status Code : `400`
- Response Body

```json
{
  "status": "fail",
  "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
}
```

### Response Failed (Server gagal memasukkan buku karena alasan umum)

- Status Code : `500`
- Response Body :

```json
{
  "status": "fail",
  "message": "Buku gagal ditambahkan"
}
```

### Response Success (buku berhasil ditambahkan)

- Status Code : `201`
- Response Body :

```json
{
  "status": "success",
  "message": "Buku berhasil ditambahkan",
  "data": {
    "bookId": "1L7ZtDUFeGs7VlEt"
  }
}
```

# Get All Books

- Method : `GET`
- URL : `/books`
- Query Parameter:
    - Name : string, URL : `/books/?name="Dicoding"`
    - Reading : boolean, URL : `/books/?reading="0"` atau `/books/?reading="1"`
    - Finished : boolean, URL : `/books/?finished="0"` atau `/books/?finished="1"`

### Response Success

- Status Code : `200`
- Response Body :

```json
{
  "status": "success",
  "data": {
    "books": [
      {
        "id": "Qbax5Oy7L8WKf74l",
        "name": "Buku A",
        "publisher": "Dicoding Indonesia"
      },
      {
        "id": "1L7ZtDUFeGs7VlEt",
        "name": "Buku B",
        "publisher": "Dicoding Indonesia"
      },
      {
        "id": "K8DZbfI-t3LrY7lD",
        "name": "Buku C",
        "publisher": "Dicoding Indonesia"
      }
    ]
  }
}
```

### Response Success (jika belum ada data book yang tersimpan)

- Status Code : `200`
- Response Body :

```json
{
  "status": "success", 
  "data": {
    "books": []
  }
}
```

# Get Book By ID

- Method : `GET`
- URL : `/books/{bookId}`

### Response Failed (id book tidak ditemukan)

- Status Code : `404`
- Response Body :

```json
{
  "status": "fail",
  "message": "Buku tidak ditemukan"
}
```

### Response Success (id book berhasil ditemukan)

- Status Code : `200`
- Response Body:

```json
{
  "status": "success", 
  "data": {
    "book": {
      "id": "aWZBUW3JN_VBE-9I",
      "name": "Buku A Revisi",
      "year": 2011,
      "author": "Jane Doe",
      "summary": "Lorem Dolor sit Amet",
      "publisher": "Dicoding",
      "pageCount": 200,
      "readPage": 26,
      "finished": false,
      "reading": false,
      "insertedAt": "2021-03-05T06:14:28.930Z",
      "updatedAt": "2021-03-05T06:14:30.718Z"
    }
  }
}
```

# Update Book

- Method : `PUT`
- URL : `/books/{bookId}`
- Request Body :

```json
{
  "name": "string",
  "year": "number",
  "author": "string",
  "summary": "string",
  "publisher": "string",
  "pageCount": "number",
  "readPage": "number",
  "reading": "boolean"
}
```

### Response Failed (client tidak melampirkan properti name)

- Status Code : `400`
- Response Body : 

```json
{
  "status": "fail",
  "message": "Gagal memperbarui buku. Mohon isi nama buku"
}
```

### Response Failed (readPage lebih besar dari pageCount)

- Status Code : `400`
- Response Body :

```json
{
  "status": "fail",
  "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
}
```

### Response Failed (Id tidak ditemukkan oleh server)

- Status Code : `404`
- Response Body :

```json
{
  "status": "fail",
  "message": "Gagal memperbarui buku. Id tidak ditemukan"
}
```

### Response Success (book berhasil diperbarui)

- Status Code : `200`
- Response Body :

```json
{
  "status": "success",
  "message": "Buku berhasil diperbarui"
}
```

# Delete Book

- Method : `DELETE`
- URL : `/books/{bookId}`

### Response Failed (id book tidak ditemukan)

- Status Code : `404`
- Response Body :

```json
{
  "status": "fail",
  "message": "Buku gagal dihapus. Id tidak ditemukan"
}
```

### Response Success (id ditemukan, maka buku tersebut harus dihapus)

- Status Code : `200`
- Response Body :

```json
{
  "status": "success",
  "message": "Buku berhasil dihapus"
}
```