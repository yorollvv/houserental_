let express = require('express')
let router = express.Router()
let house = require('../api/house/house')

router.post("/houseListByUser",house.getHouseList)
router.post("/starHouse",house.starHouse)
router.post("/cancelStarHouse",house.cancelStarHouse)
router.post("/lookStarHouse",house.lookStarHouse)
router.get("/HouseDetail",house.HouseDetail)
router.post("/upHouse",house.upHouse)
router.post("/lookMyHouse",house.lookMyHouse)
router.post("/updatePrice",house.updatePrice)
router.post("/signHouse",house.signHouse)
router.post("/tosignHouse",house.tosignHouse)
router.post("/MyRentHouse",house.MyRentHouse)

router.get("/searchHouse",house.searchHouse)

module.exports = router
