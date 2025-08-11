const express = require("express");
const { getRelistedList, getRelistStyle, updateRelistStyle, createRelistStyle } = require("../../controllers/relist/relistStyle.controller");
const router = express.Router();

router.route("/relisted").get(getRelistedList);
router.route("/relist-details/:id").get(getRelistStyle);
router.route("/update/:id").post(updateRelistStyle);
router.route("/create").post(createRelistStyle);


module.exports = router;
