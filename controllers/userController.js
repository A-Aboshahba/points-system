const database = require("../database");
const CryptoJS = require("crypto-js");

module.exports.newTransaction = async (request, response, next) => {
  try {
    const { sender_id, receiver_id, amount } = request.body;
    // prevent user from send to himself
    if (sender_id == receiver_id) {
      throw new Error("Cant send points to yourself..!");
    }
    await database.query("START TRANSACTION");
    // check if sender exists
    const senderPointsQuery =
      "SELECT points FROM users WHERE user_id = ? FOR UPDATE";
    const [senderRows] = await database.query(senderPointsQuery, [sender_id]);
    if (senderRows.length === 0) {
      throw new Error("No such sender_id");
    }
    // check if receiver exists
    const receiverQuery =
      "SELECT points FROM users WHERE user_id = ? FOR UPDATE";
    const [receiverRows] = await database.query(receiverQuery, [receiver_id]);
    if (senderRows.length === 0) {
      throw new Error("No such receiver_id");
    }
    // check sufficient points
    const senderPoints = senderRows[0].points;
    if (senderPoints < amount) {
      throw new Error("Insufficient points");
    }
    // create transcation
    const insertQuery = `INSERT INTO transactions (sender_id, receiver_id, amount) VALUES (?, ?, ?)`;
    const createdTransaction = await database.query(insertQuery, [
      sender_id,
      receiver_id,
      amount,
    ]);
    await database.query("COMMIT");
    response.status(200).json(createdTransaction);
  } catch (err) {
    console.log(err);
    let error = new Error(err);
    error.status = 401;
    next(error);
  }
};
module.exports.confirmTransaction = async (request, response, next) => {
  try {
    const { transaction_id } = request.body;
    await database.query("START TRANSACTION");
    // check transaction exists
    const transactionQuery =
      "SELECT * FROM transactions WHERE transaction_id = ? FOR UPDATE";
    const [transactionRows] = await database.query(transactionQuery, [
      transaction_id,
    ]);
    if (transactionRows.length === 0) {
      throw new Error("No such transaction");
    }
    // check transaction isn't confirmed before
    const transaction = transactionRows[0];
    const { sender_id, receiver_id, amount } = transaction;
    if (transaction.confirmed_at != null) {
      throw new Error("Transaction already confirmed");
    }
    // check sufficient points
    const senderPointsQuery = "SELECT points FROM users WHERE user_id = ?";
    const [senderRows] = await database.query(senderPointsQuery, [sender_id]);
    const senderPoints = senderRows[0].points;
    if (senderPoints < amount) {
      throw new Error("Insufficient points");
    }
    // Deduct points from the sender
    const deductPointsQuery =
      "UPDATE users SET points = points - ? WHERE user_id = ?";
    await database.query(deductPointsQuery, [amount, sender_id]);

    // Add points to the receiver
    const addPointsQuery =
      "UPDATE users SET points = points + ? WHERE user_id = ?";
    await database.query(addPointsQuery, [amount, receiver_id]);

    // Update the transaction to mark it as confirmed
    const confirmQuery =
      "UPDATE transactions SET confirmed_at = CURRENT_TIMESTAMP WHERE transaction_id = ?";
    await database.query(confirmQuery, [transaction_id]);

    // Commit the transaction
    await database.query("COMMIT");
    response.status(200).json("transfer confirmed");
  } catch (err) {
    console.log(err);
    let error = new Error(err);
    error.status = 401;
    next(error);
  }
};
module.exports.getUserPoints = async (request, response, next) => {
  try {
    const insertQuery = `SELECT points FROM users WHERE user_id = ? `;
    const [rows] = await database.query(insertQuery, [request.params.id]);
    if (rows.length == 0) {
      let error = new Error("NO such user_id");
      error.status = 401;
      next(error);
    } else {
      [points] = rows;
      response.status(200).json(points);
    }
  } catch (err) {
    console.log(err);
    let error = new Error(err);
    error.status = 401;
    next(error);
  }
};
module.exports.allTransactions = async (request, response, next) => {
  try {
    const insertQuery = `SELECT * FROM transactions `;
    const [allTransactions] = await database.query(insertQuery);
    if (allTransactions.length == 0) {
      let error = new Error("NO transactions");
      error.status = 401;
      next(error);
    } else {
      response.status(200).json(allTransactions);
    }
  } catch (err) {
    console.log(err);
    let error = new Error(err);
    error.status = 401;
    next(error);
  }
};
