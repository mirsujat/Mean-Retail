var express = require('express');
var status = require('http-status');
var _ = require('underscore');
var mongoose = require('mongoose');
var User = require('../schemas/user')(mongoose);
var helper = require('../../retail/services/helper');
var Stripe = require('../../retail/services/stripe');

exports.updateCart = function(req, res){
    try{
        var cart = req.body.data.cart;
    }catch(e){
    return res
    .status(status.BAD_REQUEST)
    .json( { error: 'No Cart Specified !' } );       
    }
            
    req.user.data.cart = cart;
    req.user.save(function(error, user){
        if(error){
          return res
          .status(status.INTERNAL_SERVER_ERROR)
          .json( { error: error.toString() } );
        }
    return res.json( { user: user } );
  } );
};

exports.me = function(req, res){
    if(!req.user){
     return res
     .status(status.UNAUTHORIZED)
     .json({ error: 'Not logged in'});
    }

     req.user.populate(
     { path: 'data.cart.product', model: 'Product' },
     handleOne.bind(null, 'user', res));
};

exports.checkout = function(req, res){
     if(!req.user){
        return res
         .status(status.UNAUTHORIZED)
         .json( { error: 'Not Loged In !' } );
     }
     req.user.populate(
     {path: 'data.cart.product', model: 'Product' },
     function(error, user){
     var totalCostUSD = 0;
     _.each('user.data.cart', function(item){
     totalCostUSD = item.product.internal.approximatePriceUSD * item.quantity;
     } );
     Stripe.charges.create(
     {
      amount: Math.ceil(totalCostUSD * 100),
      source: req.body.StripeToken,
      currency: 'usd',
      description: 'Example Charges !'
     },
     function(error, charge){
     if(error && error.type === 'StripeCardError'){
      return res
      .status(status.BAD_REQUEST)
      .json( { error: error.toString() } );
     }
     if(error){
     return res
     .status(status.INTERNAL_SERVER_ERROR)
     .json( { error: error.toString() } );

     }
     req.user.data.cart = [];
     req.user.save(function(error, user){
     return res.json( { id: charge._id } );
     });     
     }
    );
    });
};