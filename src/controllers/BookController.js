const { Router } = require("express");
const CheckUser = require("../helpers/CheckUser");
const ResponseHandler = require("../helpers/ResponseHandler");
const BookRepository = require("../services/BookRepository");

const router = Router();

const bookRep = new BookRepository();

router.get("/GetAllBooks", async (request, response) => {
  if (await CheckUser(request.headers)) {
    try {
      CheckUser(request.headers);
      var _response = new ResponseHandler();
      _response.data = (await bookRep.getAllBooks(request.query)) || [];
      response.status(200).json({
        ..._response.getResponse(),
      });
    } catch (ex) {
      response.status(202).json({
        error: ex.message,
      });
    }
  } else {
    response.status(401).json({
      error: "Unauthorized",
    });
  }
});

router.get("/GetBook/:bookId", async (request, response) => {
  if (await CheckUser(request.headers)) {
    try {
      var _response = new ResponseHandler();
      _response.data = (await bookRep.getBookById(request.params)) || [];
      response.status(200).json({
        data: _response.getResponse(),
      });
    } catch (ex) {
      response.status(202).json({
        error: ex.message,
      });
    }
  } else {
    response.status(401).json({
      error: "Unauthorized",
    });
  }
});

router.post("/CreateBook", async (request, response) => {
  if (await CheckUser(request.headers)) {
    try {
      var _response = new ResponseHandler();
      _response.message = await bookRep.createBook(request.body);
      response.status(200).json({
        ..._response.getResponse(),
      });
    } catch (ex) {
      response.status(202).json({
        error: ex.message,
      });
    }
  } else {
    response.status(401).json({
      error: "Unauthorized",
    });
  }
});

router.put("/UpdateBook", async (request, response) => {
  if (await CheckUser(request.headers)) {
    try {
      var _response = new ResponseHandler();
      _response.message = await bookRep.updateBook(request.body);
      response.status(200).json({
        ..._response.getResponse(),
      });
    } catch (ex) {
      response.status(202).json({
        error: ex.message,
      });
    }
  } else {
    response.status(401).json({
      error: "Unauthorized",
    });
  }
});

router.delete("/DeleteBook/:bookId", async (request, response) => {
  if (await CheckUser(request.headers)) {
    try {
      var _response = new ResponseHandler();
      _response.message = await bookRep.deleteBook(request.params);
      response.status(200).json({
        ..._response.getResponse(),
      });
    } catch (ex) {
      response.status(202).json({
        error: ex.message,
      });
    }
  } else {
    response.status(401).json({
      error: "Unauthorized",
    });
  }
});

module.exports = router;
