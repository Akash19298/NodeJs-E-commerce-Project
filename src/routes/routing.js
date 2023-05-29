const express = require('express');
const router = express.Router();
const setupdb = require('../model/setupdb');
const userService = require('../service/user');
const productService = require('../service/product');

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

router.post('/login', async (req, res, next) => {
    try {
        let response = await userService.loginUser(req.body);
        res.json(response);
    } catch (err) {
        next(err);
    }
});

router.post('/add-product', async (req, res, next) => {
    try {
        let response = await productService.addProduct(req.body);
        res.json(response)
    } catch (err) {
        next(err)
    }
});

router.get('/products', async (req, res, next) => {
    try {
        let response = await productService.getAllProducts();
        res.json(response);
    } catch (err) {
        next(err)
    }
});



module.exports = router;