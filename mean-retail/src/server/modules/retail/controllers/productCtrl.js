var express = require('express');
var status = require('http-status');
var _ = require('underscore');
var mongoose = require('mongoose');
var Product = require('../schemas/product')(mongoose);
var Category = mongoose.model('Category', require('../schemas/category'));
var helper = require('../services/helper');


exports.getAllProducts = function(req, res){
    var sort = { name: 1 };
    Product
    .find( {} )
    .sort(sort)
    .exec(helper.handleMany.bind(null, 'products', res) );   
};

exports.getProductById = function(req, res){
    Product
    .findOne({_id: req.params.id}, function(error, product){
        if(error){
         res.status(500).send('Nomething Went Wrong !');
         }
    res.json( { product: product } );
    } );       
};

exports.getCategoryById = function(req, res){
    Category
    .findOne( { _id: req.params.id })
    .exec(helper.handleOne.bind(null, 'category', res) );
};

exports.getCategoryByParentId = function(req, res){
    Category
    .find( { parent: req.params.id } )
    .sort( {_id: 1} )
    .exec(helper.handleMany.bind(null, 'categories', res) );
};

exports.getProductsByChildId = function(req, res){
var sort = { name: 1 };
    if(req.query.price === "1"){
      sort = { 'internal.approximatePriceUSD': 1 };
    }else if(req.query.price === "-1"){
      sort = { 'internal.approximatePriceUSD': -1 };
    }
            
     Product
     .find( { 'category.ancestors': req.params.id } )
     .sort(sort)
     .exec(helper.handleMany.bind(null, 'products', res) );
};



handleOne = function(property, res, error, doc){
  if(error){
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({ error: error.toString() });
  }
  if(!doc){
    return res.
      status(status.NOT_FOUND).
      json({ error: 'Not found'});
  }

  var json = {};
  json[property] = doc;
  res.json(json);
};