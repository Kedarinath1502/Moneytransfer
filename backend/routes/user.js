const express = require('express')
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { User, Account } = require('../db');
const { JWT_SECRET } = require('../config');
const authmiddleware = require('../middlewares');

const router = express.Router();

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})

router.post('/signup', async (req, res, next) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(body);
    if (!success) {
        return res.status(411).json({
            msg: "invalid inputs"
        })
    }

    const existinguser = await User.findOne({
        username: body.username
    })
    if (existinguser) {
        res.status(412).json({
            msg: "already a user exist with that username"
        })
    }
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    });
    const userId = user._id;

    await Account.create({
        userId: userId,
        balance: 1 + Math.random() * 1000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        msg: "user created successfully",
        token: token
    })
})

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post('/signin', async (req, res, next) => {
    const body = req.body;
    const { success } = signinSchema.safeParse(body);
    if (!success) {
        return res.status(411).json({
            msg: "invalid inputs"
        })
    }
    const user = await User.findOne({
        username: body.username,
        password: body.password
    })

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
        res.json({
            token: token
        })
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    })
})


const updatebodySchema = zod.object({
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string(),

})

router.put('/', authmiddleware, async (req, res) => {
    const body = req.body;
    const { success } = updatebodySchema.safeParse(body);
    if (!success) {
        return res.status(411).json({
            msg: "invalid inputs"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "updated successfully"
    })
})

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            },
            lastname: [{
                "$regex": filter
            }]
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            _id: user._id
        }))
    })
})
module.exports = router;