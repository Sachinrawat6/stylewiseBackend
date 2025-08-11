const express = require("express");
const { getStyleList, getSingleStyle, updateQurviiStyle, createQurviiStyles } = require("../../controllers/qurviistyle/qurviiStyle.controller");
const router = express.Router();

router.route("/qurvii-styles").get(getStyleList);
router.route("/style-details/:id").get(getSingleStyle);
router.route("/update/:id").post(updateQurviiStyle);
router.route("/create").post(createQurviiStyles);

module.exports = router;