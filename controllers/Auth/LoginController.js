const express = require('express');
const Router = express.Router();
const UserModel = require('../../Models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtKey = "e-comm-nodejs";

Router.post('/login', async (req, resp) => {
    try {
        // const hashPassword = await bcrypt.hash(req.body.password, 10);
        // req.body.password = hashPassword;
        const data = await UserModel.find({ email: req.body.email });
        if (data.length != 0) {
            if (bcrypt.compare(req.body.password, data[0].password)) {
                jwt.sign({ data }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                    if (!err) {
                        resp.status(200).json({
                            status: 200,
                            message: "Login Successfully",
                            data: data,
                            _token : token
                        });
                    }
                    resp.json({ 'status': 400, 'message': 'Something went wrong..' });
                })

            } else {
                resp.status(400).json({
                    message: 'Password not match, Check your password'
                });
            }
        } else {
            resp.status(400).json({
                message: 'User not found, Check your email'
            });
        }
        // const response = await data.save();
        // delete response.password; // Delete the param in the json list

    } catch (e) {
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        resp.json(e.message);
    }
});


module.exports = Router;