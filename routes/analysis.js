const axios = require("axios");
const express = require("express");
const boom = require("@hapi/boom");
const { config } = require("../config");
const { AnalysisService } = require("../services/analysis");
const { NewsService } = require("../services/news");
const { UserService } = require("../services/user");


function analysisApi(app) {
    const router = express.Router();
    app.use("/api/analysis", router);

    // Services
    const analysisService = new AnalysisService();
    const newsService = new NewsService()
    const userService = new UserService()

    router.post('/predict', async function (req, res, next) {
        const { url, title, articleText, email } = req.body
        try {
            const user = await userService.getUserByEmail(email)
            if (!user) {
                next(boom.unauthorized("User not found"))
            }
            const newByUrl = await newsService.getNewByUrl(url)
            if (newByUrl) {
                const analysis = await analysisService.getAnalysis({ id: newByUrl.dataValues.analysisId })
                return res.status(200).json(analysis.dataValues)
            }

            const { data } = await axios.post(config.modelUrl, { article_text: articleText })
            const analysis = {
                avgWordLen: data.avg_word_len,
                sentimentTxt: data.sentiment_txt,
                numWords: data.num_words,
                numDiffWords: data.num_diff_words,
                numStopwords: data.num_stopwords,
                rateStopwordsWords: data.rate_stopwords_words,
                rateDiffwordsWords: data.rate_diffwords_words,
                predictionResult: data.prediction_result,
            }
            // Crea analisis
            const createdAnalysis = await analysisService.createAnalysis(analysis)
            await user.addAnalysis(createdAnalysis, { through: { selfGranted: false } })
            const analysisId = createdAnalysis.dataValues.id

            // Crea noticia con analisis
            await newsService.createNew({
                url,
                title,
                articleText,
                analysisId
            })

            // Devuelve analisis
            return res.status(201).json(createdAnalysis.dataValues)
        } catch (error) {
            next(error)
        }
    })

    router.get('/', async function (req, res, next) {
        const { id } = req.body

        try {
            const { dataValues: analysis } = await analysisService.getAnalysis({ id })
            return res.status(200).json(analysis)
        }
        catch (error) {
            next(error)
        }
    })

    router.get('/user-analyses', async function (req, res, next) {
        try {
            const { email } = req.body
            const { analyses } = await userService.getUserWithAnalyses(email)
            const newsPromises = analyses.map(({id}) => newsService.getNewByAnalysesId(id))
            const news = await Promise.all(newsPromises)
            res.status(200).json({news})
        } catch (error) {
            next(error)
        }
    })
}

module.exports = { analysisApi };
