const mongoose = require("mongoose");
const RelistStyle = require("../../modals/Relist Style Modal/relist.modal");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// *********************** geting all relisted style ***************************
const getRelistedList = async (_, res, next) => {
    try {
        const relistedList = await RelistStyle.find();
        if (!relistedList) {
            return next(new ApiError(404, "Relisted style not found."));
        }

        res.status(200).json(new ApiResponse(200, "Relisted style fetched successfully.", relistedList));
    } catch (error) {
        next(error)
    }
}

// ******************* getting single relisted style ****************************
const getRelistStyle = async (req, res, next) => {
    try {
        const { oldSku, status, createdBy, newSku } = req.query;

        // At least one filter should be provided
        if (!oldSku && !newSku && !status && !createdBy) {
            return next(new ApiError(400, "At least one filter (oldSku, newSku, status, createdBy) is required."));
        }

        // Build dynamic filter object
        const filter = {};
        if (oldSku) filter.oldSku = oldSku;
        if (newSku) filter.newSku = newSku;
        if (status) filter.status = status;
        if (createdBy) filter.createdBy = createdBy;

        const relistStyle = await RelistStyle.findOne(filter);

        if (!relistStyle) {
            return next(new ApiError(404, "Relist style not found with given filters"));
        }

        res.status(200).json(
            new ApiResponse(200, `Style fetched for ${relistStyle.oldSku}`, relistStyle)
        );
    } catch (error) {
        next(error);
    }
};


// ******************** updating relist style ***********************************

const updateRelistStyle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return next(new ApiError(400, "Invalid id provided or id not provided"));
        }
        const updatedStyle = await RelistStyle.findByIdAndUpdate(id, payload, { new: true });
        res.status(202).json(new ApiResponse(202, `${updatedStyle.oldSku} updated successfully.`, updatedStyle));

    } catch (error) {
        next(error);
    }
}


// ***************************** create relist style *****************************

const createRelistStyle = async (req, res, next) => {
    try {
        const styleForRelisting = req.body;

        if (styleForRelisting.length === 0 || !Array.isArray(styleForRelisting)) {
            return next(new ApiError(400, "Request body must be a non-empty array"));
        }
        const payload = styleForRelisting.map((style) => ({
            oldSku: style.oldSku || null,
            newSku: style.newSku || null,
            imageLink: style.imageLink || "",
            createdBy: style.createdBy,
        }))

        const incommingOldsku = payload.map((style) => style.oldSku);

        // ****************** Check duplicate ********************
        const existing = await RelistStyle.find({
            oldSku: { $in: incommingOldsku }
        }).select("oldSku");

        const existingNumbers = existing.map(s => s.oldSku);

        // ******************** // fitering existing styles ******************
        const newStyles = payload.filter(p => !existingNumbers.includes(p.oldSku));

        if (newStyles.length === 0) {
            return next(new ApiError(400, "All styles already exist in database"));
        }
        // ********************** inserting new styles *****************************

        const createdRelist = await RelistStyle.insertMany(newStyles);

        res.status(201).json(new ApiResponse(201, `${createdRelist.length} relist styles created successfully`, createdRelist));

    } catch (error) {
        next(error);
    }
}

module.exports = { getRelistStyle, getRelistedList, updateRelistStyle, createRelistStyle }

