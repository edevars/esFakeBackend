const axios = require("axios");
const express = require("express");
const { config } = require("../config");
const { AnalysisService } = require("../services/analysis");
const { NewsService } = require("../services/news");


function analysisApi(app) {
    const router = express.Router();
    app.use("/api/analysis", router);

    // Services
    const analysisService = new AnalysisService();
    const newsService = new NewsService()

    router.post('/predict', async function (req, res, next) {
        const { url, title, articleText } = req.body
        try {
            const newByUrl = await newsService.getNewByUrl(url)
            if (newByUrl) {
                const analysis = await analysisService.getAnalysis({ id: newByUrl.dataValues.analysisId })
                delete analysis.dataValues.id
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
            const analysisId = createdAnalysis.dataValues.id

            // Crea noticia con analisis
            await newsService.createNew({
                url,
                title,
                articleText,
                analysisId
            })

            // Devuelve analisis
            return res.status(200).json(analysis)
        } catch (error) {
            next(error)
        }
    })
}

module.exports = { analysisApi };
