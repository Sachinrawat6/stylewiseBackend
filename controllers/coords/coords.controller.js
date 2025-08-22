const mongoose = require("mongoose");
const CoordStyle = require("../../modals/Co-ords Styles Modal/co-ords.modal");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");


// **********************  coords style creation *************************
const uploadStyles = async (req, res, next) => {
    try {
        const coordsStyles = req.body;

        if (!Array.isArray(coordsStyles) || coordsStyles.length === 0) {
            return next(new ApiError(400, "Request body must be a non-empty array"));
        }

        // Format payload
        const payload = coordsStyles.map((style) => ({
            coordStyleNumber: style.coordStyleNumber || null,
            styleNumbers: Array.isArray(style.styleNumbers) ? style.styleNumbers.filter(Boolean) : [],
            coordSetName: style.coordSetName || "",
            createdBy: style.createdBy || "Admin",
            colors: Array.isArray(style.colors) ? style.colors.filter(Boolean) : [],
        }));

        // Extract all coordStyleNumbers from payload
        const incomingNumbers = payload.map(p => p.coordStyleNumber);

        // Check duplicates in DB
        const existing = await CoordStyle.find({
            coordStyleNumber: { $in: incomingNumbers }
        }).select("coordStyleNumber");

        const existingNumbers = existing.map(e => e.coordStyleNumber);

        // Filter out existing
        const newStyles = payload.filter(p => !existingNumbers.includes(p.coordStyleNumber));

        if (newStyles.length === 0) {
            return next(new ApiError(400, "All styles already exist in the database"));
        }

        // Insert only new ones
        const createdCoords = await CoordStyle.insertMany(newStyles);

        res.status(201).json(
            new ApiResponse(
                201,
                `${createdCoords.length} coords styles created successfully.`,
                createdCoords
            )
        );

    } catch (error) {
        next(error);
    }
};

// *************** get all list of coords set ****************************

const getCoordsList = async (req, res, next) => {
    try {
        const coordsStyles = await CoordStyle.find();

        // *********************** checking for coords style **********************
        if (coordsStyles.length === 0) {
            return res.status(404).json(new ApiError(404, "No coords style found."));
        }

        //  ********************************** sending response to client ***********************

        res.status(200).json(new ApiResponse(200, `${coordsStyles.length} coords fetched successfully`, coordsStyles));


    } catch (error) {
        next(error);
    }
}


// *************************** get particular coords **********************

const getSingleCoords = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return next(new ApiError(400, "id required"));
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new ApiError(400, "invalid Id format"))
        }

        const coords = await CoordStyle.findById(id);
        if (!coords) {
            return next(new ApiError(404, "Coords not found for this id"));
        }

        res.status(200).json(new ApiResponse(200, `Coords fetched successfully for ${id}`, coords));

    } catch (error) {
        next(error)
    }
}


// ************************* update doucment *********************************


const updateCoordsStyle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body.payload;

        // 1. ID required check
        if (!id) {
            return next(new ApiError(400, "ID is required"));
        }

        // 2. Valid ObjectId check
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new ApiError(400, "Invalid ID format"));
        }

        // 3. Payload check
        if (!payload || typeof payload !== "object" || Object.keys(payload).length === 0) {
            return next(new ApiError(400, "Payload is required and must be a non-empty object"));
        }

        // 4. Find existing
        const foundCoords = await CoordStyle.findById(id);
        if (!foundCoords) {
            return next(new ApiError(404, "Coords style not found"));
        }

        // 5. Update
        const updatedCoordsStyle = await CoordStyle.findByIdAndUpdate(id, payload, {
            new: true, // return updated document
            runValidators: false, // ensure schema validation
        });

        // 6. Response
        res.status(200).json(
            new ApiResponse(
                200,
                `Coords style ${foundCoords.coordStyleNumber} updated successfully`,
                updatedCoordsStyle
            )
        );
    } catch (error) {
        next(error);
    }
};
module.exports = { uploadStyles, getCoordsList, getSingleCoords, updateCoordsStyle };


