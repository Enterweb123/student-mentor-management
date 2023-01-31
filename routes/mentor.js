const router = require("express").Router();

const Mentor = require("../models").Mentor;
// const {Mentor} = require("../models");

router.get("/", async(req,res)=>{
  try {
    // const mentors = await Mentor.find();
    // const mentors = await Mentor.find().populate("student");
    const mentors = await Mentor.find().populate("student", "name age contact_no");
    // const mentors = await Mentor.find().populate("student", "-mentor -createdAt -updatedAt -department -_id -__v -age");

    res.json(mentors);
  } 
  catch (error) {
    res.json({"msg":error.message});
  }
});

// router.get("/mentor/:id", async(req,res)=>{
//   try {
//     // const users = await Mentor.find();
//     // const users = await Mentor.find().populate("student");
//     const mentors = await Mentor.findById(req.params.id).populate("student", "name age contact_no");
//     // const users = await Mentor.find().populate("student", "-mentor -createdAt -updatedAt -department -_id -__v -age");

//     res.json(mentors);
//   } 
//   catch (error) {
//     res.json({"msg":error.message});
//   }
// });

// router.post("/add", async(req,res)=>{
//   try {
//       const user = new Mentor(req.body);
//       const data = await user.save();
//         return res.json(data);
//   } 
//   catch (error) {
//       return res.json({msg: error.message });
//   } 
// });

module.exports = router; 