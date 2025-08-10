const mongoose = require("mongoose");

const fabricSchema = new mongoose.Schema({
    name: String,
    status: String,
    quantityMeters: Number,
    ratePerMeter: Number,
    number: String
}, { _id: false });

const accessorySchema = new mongoose.Schema({
    type: String,
    status: String,
    quantity: Number,
    rate: Number,
    number: String
}, { _id: false });

const measurementSchema = new mongoose.Schema({
    bustXS: Number,
    chestXS: Number,
    frontLengthXS: Number,
    hips: Number,
    waistXS: Number,
    acrossShoulderXS: Number,
    sleeveLengthXS: Number
}, { _id: false });

const discountSchema = new mongoose.Schema({
    discountPercent: Number,
    discountRupees: Number,
    targetSPINR: Number,
    firstDiscountedPrice: Number,
    firstDiscountRs: Number,
    secondDiscountedPrice: Number,
    secondDiscountRs: Number,
    clearancePrice: Number,
    clearanceDiscountRs: Number,
    outletPrice: Number
}, { _id: false });

const costSchema = new mongoose.Schema({
    fabricCost: Number,
    accessoryCost: Number,
    laborCost: Number,
    dyeingCost: Number,
    packingCost: Number,
    totalCostUSD: Number,
    totalCostINR: Number
}, { _id: false });

const styleSchema = new mongoose.Schema({
    styleNumber: String,
    styleSketchImageLink: String,
    line: String,
    patternNumber: String,
    sleevePatternNumber: String,
    styleType: String,
    stylePrimaryColor: String,
    styleSecondaryColor: String,
    primaryColorShade: String,
    fabricType: String,
    styleName: String,
    styleDescription: String,

    fabrics: [fabricSchema],
    accessories: [accessorySchema],

    dyeingCost: Number,
    laborHours: Number,
    prints: String,
    occasion: String,
    neckStyle: String,
    mainTrend: String,
    fittingType: String,
    collarType: String,
    sleeveType: String,
    sleeveLength: String,
    season: String,
    hemline: String,
    transparency: String,
    lining: String,
    washCare: String,
    closure: String,

    measurements: measurementSchema,

    organicSustainable: Boolean,
    dressType: String,
    shirtType: String,
    dressLength: String,
    emailAddress: String,

    cost: costSchema,
    discounts: discountSchema,

    mrp: Number,
    styleStatus: String,
    msrpUSD: Number,
    discountPercentage: Number,
    premiumStyle: Boolean,
    exactInventory: Number,
    inactive: Boolean,
    checked: Boolean,

    photo: String
}, { timestamps: true });

const QurviiStyle = mongoose.model("QurviiStyle", styleSchema);

module.exports = QurviiStyle;
