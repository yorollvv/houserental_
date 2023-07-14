let express = require('express')
let router = express.Router()
let feedback = require('../api/feedback/feedbackApi')

router.get('/get', feedback.getFeedBackDetail)
router.post('/saveFeedBack', feedback.saveFeedBack)
router.post('/list', feedback.getFeedBackList)
router.post("/listByUser",feedback.getFeedBackListByUser)
router.post('/repFeedBack', feedback.saveFeedBackRep)

module.exports = router
