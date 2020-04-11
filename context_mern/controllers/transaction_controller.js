// in tut, fisierul asta e numit transactions.js

const Transaction = require("../models/Transaction");

// @route GET /api/v1/transactions
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

//add transaction
// @route POST /api/v1/transactions
exports.addTransaction = async (req, res, next) => {
  try {
    //when we send data from a client, it will be in req.body.ceva
    //to use req.body tre sa ai ceva middleware in server.js (body parser de ex)
    // app.use(express.json())
    // const { text, amount } = req.body;

    // Transaction is my model
    //indiferent ce incerci sa trimiti cu create,
    //doar ce e in model va fi transmis prin req.body
    //vrei sa trimiti si altceva, modifici MODEL
    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      succes: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      //pui toate mesajele de eroare intr-un arr
      const messages = Object.values(err.errors).map((val) => val.message);
      res.status(400).json({
        success: false,
        error: messages,
      }); //client error
    } else {
      return res.status(500).json({
        success: false,
        error: "Server error",
      });
    }
  }
};

//delete
// @route  DELETE /api/v1/transactions/:id
exports.deleteTransaction = async (req, res, next) => {
  try {
    //req.params.id allows access to what is passed afther transactions/...
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "no transaction found",
      });
    }
    await transaction.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
