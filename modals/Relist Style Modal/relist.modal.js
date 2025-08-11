const mongoose = require("mongoose");

const relistStyleSchema = new mongoose.Schema({
    oldSku: {
        type: Number,
        required: true,
    },
    newSku: {
        type: Number,
        required: true,
    },
    imageLink: {
        type: String,
        trim: true,
    },
    createdBy: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true });

const RelistStyle = mongoose.model("RelistStyle", relistStyleSchema);
module.exports = RelistStyle;
