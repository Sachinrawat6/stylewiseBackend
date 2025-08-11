const mongoose = require("mongoose");
const QurviiStyle = require("../../modals/Normal style Modal/normalstyle.modal");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");

// ***************** getting all styles list *****************

const getStyleList = async (_, res, next) => {
    try {
        const regularStyleList = await QurviiStyle.find();
        if (!regularStyleList || regularStyleList.length === 0) {
            return next(new ApiError(404, "Styles not found."));
        }
        res.status(200).json(new ApiResponse(200, "Styles fetched successfully", regularStyleList));
    } catch (error) {
        next(error);
    }
}


// ************************* getting single style **************

const getSingleStyle = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return next(new ApiError(400, "Please provide valid id"));
        }

        const styleDetails = await QurviiStyle.findById(id);
        if (!styleDetails) {
            return next(new ApiError(404, "Style not found."));
        }

        res.status(200).json(new ApiResponse(200, "Style fetched successfully.", styleDetails));
    } catch (error) {
        next(error);
    }
}

// **************************** updating single style *******************
const updateQurviiStyle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;

        // Validate ID
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return next(new ApiError(400, "Invalid or missing style id."));
        }

        // Validate Payload
        if (!payload || typeof payload !== "object" || Object.keys(payload).length === 0) {
            return next(new ApiError(400, "Payload must be a non-empty object."));
        }

        const updatedStyle = await QurviiStyle.findByIdAndUpdate(id, payload, { new: true });

        if (!updatedStyle) {
            return next(new ApiError(404, "Qurvii style not found for this id."));
        }

        res.status(202).json(
            new ApiResponse(202, `${updatedStyle.styleNumber} updated successfully.`, updatedStyle)
        );
    } catch (error) {
        next(error);
    }
};


// ************************** creating qurvii style ****************************

const createQurviiStyles = async (req, res, next) => {
    try {
        const styles = req.body;

        if (!Array.isArray(styles) || styles.length === 0) {
            return next(new ApiError(400, "Request body must be a non-empty array."));
        }

        // Extract incoming style numbers
        const incomingStyleNumbers = styles.map(s => s.styleNumber);

        // Check for existing styles with same styleNumber
        const existing = await QurviiStyle.find({
            styleNumber: { $in: incomingStyleNumbers }
        }).select("styleNumber");

        const existingNumbers = existing.map(s => s.styleNumber);

        // Filter out styles that already exist
        const newStyles = styles.filter(s => !existingNumbers.includes(s.styleNumber));

        if (newStyles.length === 0) {
            return next(new ApiError(400, "All provided styles already exist in the database."));
        }

        // Insert only non-duplicate styles
        const createdStyles = await QurviiStyle.insertMany(newStyles);

        res.status(201).json(
            new ApiResponse(201, `${createdStyles.length} styles created successfully.`, createdStyles)
        );

    } catch (error) {
        next(error);
    }
};


module.exports = { getStyleList, getSingleStyle, updateQurviiStyle, createQurviiStyles }
