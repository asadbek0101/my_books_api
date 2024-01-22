const { Router } = require("express");
const ResponseHandler = require("../helpers/ResponseHandler");
const AuthRepository = require("../services/AuthRepository");

const router = Router();

const authRep = new AuthRepository();

router.post("/Register", async (request, response) => {
    try {
      var _response = new ResponseHandler();
      _response.data = await authRep.register(request.body);
      response.status(200).json({
        ..._response.getResponse(),
      });
    } catch (ex) {
      response.status(202).json({
        error: ex.message,
      });
    }
  });

router.post("/Login", async (request, response) => {
  try {
    var _response = new ResponseHandler();
    _response.data = await authRep.login(request.body);
    response.status(200).json({
      ..._response.getResponse(),
    });
  } catch (ex) {
    response.status(202).json({
      error: ex.message,
    });
  }
});

module.exports = router;
