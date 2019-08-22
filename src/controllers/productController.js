'use strict'
const mongoose = require('mongoose');
const Product = require('../models/productModel');

//List all Products
exports.get = (req, res, next) => {
    Product
        .find({ 
            active: true 
        }, 'title price slug ')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}; 
//List all Products

//List Products by Slug
exports.getBySlug = (req, res, next) => {
    Product
        .findOne({
            slug: req.params.slug, 
            active: true 
        }, 'title description price slug tags ')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}; //List Products by Slug

//List Products by Id
exports.getById = (req, res, next) => {
    Product
        .findById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}; 
//List Products by Id

//List Products by Tag
exports.getByTag = (req, res, next) => {
    Product
        .find({
            tags: req.params.tags,
            active: true
        }, 'title decription price slug tags')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
};
//List Products by Tag

// Creat Products
exports.post = (req, res, next) => {
    var product = new Product();
    product.title = req.body.title;
    product.slug = req.body.slug;
    product.description = req.body.description;
    product.price = req.body.price;
    product.active = req.body.active;
    product.tags = req.body.tags;

    product
        .save()
        .then(x => {
            res.status(201).send({ message: 'Produto criado com sucesso!' });
        }).catch(e => {
            res.status(400).send({ 
                message: 'Falha ao criar o produto.', 
                data: e 
            });
        });
};
//Create Products

//Update Products
exports.put = (req, res, next) => {
    Product
    .findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
    }).then(x => {
        res.status(200).send({
            message: 'Produto atualizado com sucesso'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao atualizar o produto'
        });
    });
};
// Update Products


//Delete Products
exports.delete = (req, res, next) => {
    Product
    .findOneAndRemove(req.params.id)
    .then(x => {
        res.status(200).send({
            message: 'Produto removido com sucesso'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao remover o produto'
        });
    });
};
// Delete Products