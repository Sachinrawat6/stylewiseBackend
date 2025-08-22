const express = require("express");
const { getStyleList, getSingleStyle, updateQurviiStyle, createQurviiStyles, getAllRegularStyles, uploadAndGetStyles } = require("../../controllers/qurviistyle/qurviiStyle.controller");
const router = express.Router();
router.route("/qurvii-styles").get(getStyleList);
router.route("/style-details").get(getSingleStyle);
router.route("/all-styles").get(getAllRegularStyles);
router.route("/upload-styles").post(uploadAndGetStyles);
router.route("/update/:id").post(updateQurviiStyle);
router.route("/create").post(createQurviiStyles);

module.exports = router;