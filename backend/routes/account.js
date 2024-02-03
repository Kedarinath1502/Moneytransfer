const express = require('express');
const authmiddleware = require('../middlewares');
const { Account } = require('../db');
const mongoose = require('mongoose')
const router = express.Router();

router.get('/balance', authmiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: account.balance
    })

})

router.post('/transfer', authmiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "no account found"
        })
    }

    const toaccount = await Account.findOne({ userId: to }).session(session);

    if (!toaccount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "invalid account"
        })
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();

    res.json({
        msg: " Transfer successful"
    })

})

module.exports = router;