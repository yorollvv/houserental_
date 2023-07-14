let express = require('express')
let router = express.Router()
let user = require('../api/user/user')

router.post('/user', user.getUser)
router.post('/saveUser', user.saveUser)
router.post('/list', user.getUserList)
router.post('/userCheck', user.addCheckUser)


module.exports = router
