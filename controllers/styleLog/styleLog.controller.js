const StyleLog = require("../../modals/styleLog/styleLog.modal");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

const getStyleLogs = async (req, res, next) => {
    try {
        const logs = await StyleLog.find();
        if (!logs || logs.length === 0) {
            return next(new ApiError(404, "Style logs not found."));
        }
        res.status(200).json(new ApiResponse(200, "Style logs fetched successfully.", logs));
    } catch (error) {
        next(error);
    }
}


const createStyleLogs = async (req, res, next) => {
    try {
        const { season, createdBy, totalStyles, logId } = req.body;
        if (!season || !totalStyles || !createdBy || !logId) {
            return next(new ApiError(409, "All fields are required."));
        }
        const createdLog = await StyleLog.create({
            season, totalStyles: Number(totalStyles), createdBy, logId
        })

        if (!createdLog) {
            return next(new ApiError(500, "Server error while creating style log"))
        }

        res.status(201).json(new ApiResponse(201, "Style log created successfully.", createdLog));

    } catch (error) {
        next(error);
    }
}

module.exports = { getStyleLogs, createStyleLogs };