const router =require("express").Router();

// const User = require("../models").User
const {Student,Mentor} = require("../models")

// 1) get all student
router.get("/", async(req,res)=>{
  const Students = await Student.find().populate("mentor","-student -age");
  res.json(Students);
});

// 2) get student by id
router.get("/student/:id", async(req,res)=>{
  const Students = await Student.findById(req.params.id).populate("mentor","-student -age");
  res.json(Students);
});

// 3) get all student mentor via
router.get("/studentmentor/:id", async(req,res)=>{
  const Students = await Student.findOne({mentor:req.params.id}).populate("mentor","name age");
  res.json(Students);
});

// 4) create new student
router.post("/add", async(req,res)=>{
 try {
   const StudentData = await Student.create(req.body);
   
   const MentorData = await Mentor.findByIdAndUpdate(
        req.body.mentor,
        { 
          $push:{ student:StudentData._id } 
        },
        { new:true }
       );

     res.json({ student:StudentData, mentor:MentorData });
   }
   catch (error) {
    res.json({msg:error.message});
   }
});    

//5) asign mentor
router.put("/asignmentor/:id", async(req,res)=>{
  try {
    const studentId = req.params.id;
    const asignmentorId = req.body.mentor;

    const asignMentor = await Student.findByIdAndUpdate(
      studentId,
      {"mentor":asignmentorId},
      { new:true }
      ).populate("mentor","name age");

    res.json({"studet":asignMentor});
  } catch (error) {
    console.log(error);
  }
 });

// 6) change student mentor
router.put("/changementor/:id", async(req,res)=>{

  try {
    const studentId = req.params.id;
    const newmentorId = req.body.newmentor;

  //1) get student data
    const getstudentdata = await Student.findById(studentId);

  //2) remove student from old mentor
    const UpdateOldmentorData = await Mentor.findByIdAndUpdate(
      getstudentdata.mentor,{
      $pull: { student: studentId }},
      { new: true });
  //3) if sucessfully remove add new mentor data

    if(UpdateOldmentorData){

  //4) update new mentor data to student
      const updatedstudent = await Student.findByIdAndUpdate(
        studentId,
        {mentor:newmentorId},
        { new: true }).select("name age contact_no department mentor").populate("mentor","name age");

  //5) add student data to new mentor
      const updateNewMentorData = await Mentor.findByIdAndUpdate(
          newmentorId,
            { 
              $push:{ student:updatedstudent._id } 
            },
            { new:true }
        ).select("-__v -createdAt -updatedAt").populate("student","name age department");

      res.send({
        "student":updatedstudent,
        "newmentor":updateNewMentorData
              })
    }
    else{
      console.log("update failed");
    }

  } catch (error) {
    console.log(error);
  }

 });
 


module.exports = router;