const mentorRoute = require("./mentor");
const studentRoute = require("./student");
const router = require("express").Router();

router.get("/", (req,res)=>{
    res.send("Router index is woking");
});

router.use("/mentor",mentorRoute);
router.use("/student",studentRoute);

module.exports = router;