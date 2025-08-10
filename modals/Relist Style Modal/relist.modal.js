const mongoose = require("mongoose");

const relistStyleSchema = new mongoose.Schema({
    oldSku: {
        type: String,
        required: true,
        trim: true
    },
    newSku: {
        type: String,
        required: true,
        trim: true
    },
    imageLink: {
        type: String,
        trim: true,
    }
}, { timestamps: true });

const RelistStyle = mongoose.model("RelistStyle", relistStyleSchema);
module.exports = RelistStyle;
