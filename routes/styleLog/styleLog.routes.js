const express = require("express");
const { getStyleLogs, createStyleLogs } = require("../../controllers/styleLog/styleLog.controller");
const router = express.Router();

router.route("/style-log").get(getStyleLogs);
router.route("/create-log").post(createStyleLogs);

module.exports = router;
