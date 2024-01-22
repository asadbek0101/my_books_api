const helper = require("../helpers/helper");
const db = require("../db/db");

class BookRepository {
  async getAllBooks() {
    const rows = await db.query(`SELECT * FROM books`);
    const data = helper.emptyOrRows(rows);
    return data;
  }

  async getBookById(query) {
    const { bookId } = query;
    const book = await db.query(`SELECT * FROM books WHERE id=${bookId}`);
    const data = helper.emptyOrRows(book);
    return data[0];
  }

  async createBook(query) {
    const { title, cover, published, pages, isbn, eben } = query;
    const added = await db.query(
      `INSERT INTO books(title, cover, published, pages, isbn, eben, status)
        values ('${title}', '${cover}', '${published}', '${pages}', '${isbn}', '${eben}', '1')
        `
    );
    if (added.affectedRows) {
      return "Book added succesfully!";
    } else {
      return "Something went wrong!";
    }
  }

  async updateBook(query) {
    const { id, title, cover, published, pages, isbn, eben } = query;
    const updated = await db.query(
      `UPDATE books
        SET 
        title='${title}', 
        cover='${cover}', 
        published='${published}', 
        pages='${pages}',
        isbn='${isbn}',
        eben='${eben}'
        WHERE id=${id}
        `
    );
    if (updated.affectedRows) {
      return "Book updated succesfully!";
    } else {
      return "Something went wrong!";
    }
  }

  async deleteBook(query) {
    const { bookId } = query;
    const deleted = await db.query(`DELETE FROM books WHERE id=${bookId}`);
    let message = "";
    if (deleted.affectedRows) {
      message = "Book deleted succesfully!";
    } else {
      message = "Something went wrong!";
    }
    return message;
  }
}

module.exports = BookRepository;
