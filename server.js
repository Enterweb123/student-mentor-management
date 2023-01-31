const express = require("express");
const app = express()

const connectDB = require("./config/db.js")
      connectDB();

app.use(express.json());

// import routers
const apiRouter = require("./routes")

app.get("/", (req,res)=>{
    res.send("api is working")
});

app.use("/api",apiRouter)

app.listen(4000,()=>{
    console.log("server is live on port 4000");
});