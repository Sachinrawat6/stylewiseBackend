require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.config");
const cors = require("cors");
const app = express();

// routes 
const globalErrorHandler = require("./middlewares/error/globalErrorHander");
const coordsStyleRoutes = require("./routes/cords/coords.routes");
const relistStyleRoutes = require("./routes/relist/relist.routes");
const regularStyleRoutes = require("./routes/qurviiStyle/qurviiStyle.routes");
const styleLogRoutes = require("./routes/styleLog/styleLog.routes.js");
const PORT = process.env.PORT || 5000;

// middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());


// routes middlewares 

app.use("/api/v1/stylewise", coordsStyleRoutes);
app.use("/api/v1/stylewise/relist", relistStyleRoutes);
app.use("/api/v1/stylewise/regular-style", regularStyleRoutes);
app.use("/api/v1/stylewise", styleLogRoutes);


// Global Error Handler 
app.use(globalErrorHandler);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`The server is running on ${PORT} number.`);
    })
})