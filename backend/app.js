const mongoose= require("mongoose");
const express = require("express");
const app = express();
require('dotenv').config()
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/authentication")
const invoiceRoute = require("./routes/invoice")
const userRoute = require("./routes/user")
//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//DB connection
mongoose.connect('mongodb://meera:meerameera@cluster0-shard-00-00.hjjuo.mongodb.net:27017,cluster0-shard-00-01.hjjuo.mongodb.net:27017,cluster0-shard-00-02.hjjuo.mongodb.net:27017/InvoiceTracker?ssl=true&replicaSet=atlas-icvlkp-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=> {
    console.log("DB CONNECTED");
});

//routes
app.use("/api", authRoute);
app.use("/api", invoiceRoute);
app.use("/api", userRoute);

//port
const port = process.env.PORT || 8000;

//starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});