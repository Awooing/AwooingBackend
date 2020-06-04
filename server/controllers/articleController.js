const Article = require('../models/Article')
const mongoose = require('mongoose')

async function articleController(fastify, options) {

    fastify.get('/article/:id', async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Content-Type", "application/json")
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const article = await Article.findOne({_id: req.params.id})
                if (article === null) {
                    res.status(404)
                    return {statusCode: 404, error: 'image doesn\'t exist'}
                } else {
                    return article
                }
        } else {
            res.status(400)
            return {statusCode: 400, error: 'id is invalid'}
        }
    })

    fastify.post('/article', async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Content-Type", "application/json")
        const article = req.body;

        if (article != null && article.title != null && article.content != null) {
            const article = new Article({
                title: req.body.title,
                content: req.body.content,
                userId: new mongoose.Types.ObjectId(),
                createdAt: new Date()
            })
            article.save()
            // todo: auth
            return {message: "success"}
        } else {
            res.status(400)
            return {statusCode: 400, error: 'invalid request'}
        }
    })

}

module.exports = articleController