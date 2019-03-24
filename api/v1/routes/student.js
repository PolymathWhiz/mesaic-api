/*
  This module handles the student controller routes
  @author Miracle Anyanwu
*/
const router = require('express').Router();
const StudentController = require('../Controllers/StudentsController');
const cloudinary = require('cloudinary');
const multer = require("multer");
const cloudinaryStorage = require("multer-storage-cloudinary");

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "mesaic",
  allowedFormats: ["jpg", "png"],
  transformation: [{
    width: 500,
    height: 500,
    crop: "limit"
  }]
});

const parser = multer({
  storage: storage
});


router.get('/', StudentController.getStudents);
router.post('/', parser.single("photo"), StudentController.addStudent);
router.patch('/:id', parser.single("photo"), StudentController.editStudent);
router.delete('/:id', StudentController.deleteStudent);

module.exports = router;