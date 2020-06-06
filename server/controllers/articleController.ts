const Article = require('../models/Article')
const mongoose = require('mongoose')
import express, { Router } from 'express'
const slugify = require('slugify')
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')

const router = Router()

router.get('/byId/:id', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "application/json")
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const article = await Article.findOne({_id: req.params.id})
            if (article === null) {
                res.status(404)
                res.send({statusCode: 404, error: 'article doesn\'t exist'})
            } else {
                res.send(article)
            }
    } else {
        res.status(400)
        res.send({statusCode: 400, error: 'id is invalid'})
    }
})

router.get('/bySlug/:slug', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "application/json")
    if (req.params.slug != null) {
        const article = await Article.findOne({slug: req.params.slug})
            if (article === null) {
                res.status(404)
                res.send({statusCode: 404, error: 'article doesn\'t exist'})
            } else {
                res.send(article)
            }
    } else {
        res.status(400)
        res.send({statusCode: 400, error: 'slug is missing'})
    }
})

router.post('/', adminMiddleware, async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Content-Type", "application/json")
    const article = req.body;
    if (article != null && article.title != null && article.content != null) {
        const possible = Article.findOne({slug: slugify(req.body.title, { lower: true })});
        if (possible === null) {
            const article = new Article({
                title: req.body.title,
                content: req.body.content,
                userId: new mongoose.Types.ObjectId(),
                createdAt: new Date(),
                slug: slugify(req.body.title, { lower: true })
            })
            article.save()
            res.send({message: "success"})
        } else {
            res.status(400)
            res.send({statusCode: 400, error: 'article by that name already exists'})
        }
    } else {
        res.status(400)
        res.send({statusCode: 400, error: 'invalid request'})
    }
})

module.exports = router