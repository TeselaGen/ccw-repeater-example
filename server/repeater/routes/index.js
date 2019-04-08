require("dotenv").config();
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {
    title: "Echo",
    url: req.baseUrl,
    host: req.headers.host
  });
});

router.post("/", function(req, res, next) {});

module.exports = router;
