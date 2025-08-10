const express = require("express");
const router = express.Router();
const { uploadStyles, getCoordsList, getSingleCoords, updateCoordsStyle } = require("../../controllers/coords/coords.controller");

router.route("/coords/uploads").post(uploadStyles);
router.route("/coords/update/:id").post(updateCoordsStyle);
router.route("/coords/all-coords").get(getCoordsList);
router.route("/coords/coords-details/:id").get(getSingleCoords);


module.exports = router;