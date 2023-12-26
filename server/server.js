require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectDb = require("./utiles/db");
const errorMiddleware = require("./middlewares/error-middleware");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");



//lets tackle cors
var corsOptions = {
    origin: 'http://localhost:5173',
    method:"GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials:true,
  };

app.use(cors(corsOptions));

app.use(express.json());

//mount the router
app.use("/api/auth",authRoute);
app.use("/api/form",contactRoute);
app.use("/api/data",serviceRoute);

//lets define admn route
app.use("/api/admin",adminRoute);

app.use(errorMiddleware);

const PORT = 5000;

 connectDb().then(() =>{
    app.listen(PORT, () => {
        console.log(`server is running at port : ${PORT}`);
    });
 });