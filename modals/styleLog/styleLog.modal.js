const mongoose = require("mongoose")
const styleLogSchema = new mongoose.Schema({
    season: {
        type: String,
        required: true,
    },
    totalStyles: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    logId: {
        type: Number,
        required: true,
    }
},
    { timestamps: true }
)

const StyleLog = mongoose.model("StyleLog", styleLogSchema);

module.exports = StyleLog;
