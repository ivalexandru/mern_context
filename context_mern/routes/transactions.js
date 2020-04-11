const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
} = require("../controllers/transaction_controller");

//if get request to that route, call getTransactions function
//the route will not be / , but what you've set up in app.use()
router.route("/").get(getTransactions).post(addTransaction);

//delete needs an id in the route, de asta il pun separat:
router.route("/:id").delete(deleteTransaction);

module.exports = router;
