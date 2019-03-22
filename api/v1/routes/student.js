/*
  This module handles the student controller routes
*/
const router = require('express').Router();
const StudentController = require('../Controllers/StudentsController');

router.get('/', StudentController.getStudents);
router.post('/', StudentController.addStudent);
router.patch('/student/:id', StudentController.editStudent);
router.delete('/student/:id', StudentController.deleteStudent);

module.exports = router;