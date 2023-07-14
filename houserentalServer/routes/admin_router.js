let express = require('express')
let router = express.Router()
let user = require('../api/admin/admin')

router.get('/adminList', user.getAdminList)
router.post('/adminLogin', user.adminLogin)
router.post('/saveAdmin', user.saveAdminUser)
router.post("/logout",user.logout)
module.exports = router
