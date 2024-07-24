const express = require('express');
const Router = express.Router();
const UserModel = require('../../Models/UserModel');
const bcrypt = require('bcryptjs');

Router.post('/signup', async (req,resp) => {
    try{
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashPassword;
        const data = new UserModel(req.body);
        const response = await data.save();
        delete response.password; // Delete the param in the json list
        resp.json(response);
    }catch(e){
        if (!(e instanceof Error)) {
            e = new Error(e);
          }
          resp.json(e.message);
    }
});


module.exports = Router;