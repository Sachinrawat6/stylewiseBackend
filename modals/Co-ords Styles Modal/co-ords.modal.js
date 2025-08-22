const mongoose = require("mongoose");

const coordSetSchema = new mongoose.Schema(
    {
        coordStyleNumber: {
            type: Number,
            required: true,

        },
        styleNumbers: [
            {
                type: Number,
                required: true,
            }
        ],
        coordSetName: {
            type: String,
            required: true,
            trim: true
        },
        colors: [
            {
                type: String,
                trim: true
            }
        ],
        createdBy: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const CoordStyle = mongoose.model("CoordStyle", coordSetSchema);
module.exports = CoordStyle;
