const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 8000;

mongoose.connect("mongodb+srv://senthilnathan:thalapathyvijay@cluster0.r8cdbfm.mongodb.net/?appName=Cluster0")
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});

const userRouter = require("./routers/studentRoutes");

// middleware
app.use(express.json());

// mount routes at root so requests like GET /users work
app.use('/', userRouter);

// simple 404 for unmatched routes
app.use((req, res) => {
    res.status(404).json({ msg: "Not Found" });
});

app.listen(port, ()=>{
    console.log(`server running in http://localhost:${port}`);
});
