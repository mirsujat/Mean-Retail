var express = require('express');
var status = require('http-status');
var _ = require('underscore');
var mongoose = require('mongoose');
//var Product = require('../modules/retail/schemas/product')(mongoose);
//var Category = mongoose.model('Category', require('../modules/retail/schemas/category'));
//var helper = require('../modules/retail/services/helper');
//var Stripe = require('../modules/retail/services/stripe');
var productCtrl = require('../modules/retail/controllers/productCtrl');
var userCtrl = require('../modules/user/controllers/userCtrl');

var router = express.Router();

    
router.get('/products', productCtrl.getAllProducts);
    
router.get('/product/:id', productCtrl.getProductById);
   
router.get('/category/id/:id', productCtrl.getCategoryById);
    
router.get('/category/parent/:id', productCtrl.getCategoryByParentId);
    
router.get('/product/category/:id', productCtrl.getProductsByChildId);
    
router.put('/me/cart', userCtrl.updateCart);
    
router.get('/me', userCtrl.me);

router.post('/checkout', userCtrl.checkout);
    
module.exports = router;



