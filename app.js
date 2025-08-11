require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.config");
const app = express();

// routes 
const globalErrorHandler = require("./middlewares/error/globalErrorHander");
const coordsStyleRoutes = require("./routes/cords/coords.routes");
const relistStyleRoutes = require("./routes/relist/relist.routes");
const PORT = process.env.PORT || 5000;

// middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// routes middlewares 

app.use("/api/v1/stylewise", coordsStyleRoutes);
app.use("/api/v1/stylewise/relist", relistStyleRoutes);


// Global Error Handler 
app.use(globalErrorHandler);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`The server is running on ${PORT} number.`);
    })
})