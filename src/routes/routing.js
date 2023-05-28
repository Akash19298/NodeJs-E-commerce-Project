const express = require('express');
const router = express.Router();
const setupdb = require('../model/setupdb');
const userService = require('../service/user');

router.get('/setupdb', async (req, res, next) => {
    try {
        let response = await setupdb();
        res.json(response);
    } catch (err) {
        next(err);
    }
});

router.post('/register', async (req, res, next) => {
    try {
        let response = await userService.registerUser(req.body);
        res.json(response)
    } catch (err) {
        next(err)
    }
});

router.post('/login', async (req, res, next)=>{
    try{
        let response = await userService.loginUser(req.body);
        res.json(response);
    }catch(err){
        next(err);
    }
});



module.exports = router;