/*
  This module handles the actions that can be taken on 
  the student resource
*/

const Util = require('../helpers/util');

const db = require('../../../db/connect');

const cloudinary = require('cloudinary');

exports.getStudents = async (req, res) => {
  try {
    const [students] = await db.execute("SELECT * from student");
    const studentLength = students.length;

    let _students = [];

    if (studentLength > 0) {
      for (let i = 0; i < studentLength; i++) {
        const studentObj = {
          id: students[i].id,
          first_name: students[i].first_name,
          last_name: students[i].last_name,
          birth_date: students[i].birth_date,
          hobbies: students[i].hobbies,
          photo_url: students[i].photo,
          created_at: students[i].created_at,
          updated_at: students[i].updated_at
        }
        _students.push(studentObj);
      }

      return res.status(200).json({
        success: true,
        message: 'Successfully fetched students',
        meta: {
          total: studentLength
        },
        data: {
          students: _students
        }
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Successfully fetched',
        meta: {
          total: studentLength
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

exports.addStudent = async (req, res) => {
  try {

    if (req.file === undefined) {
      return res.status(400).json({
        status: false,
        message: 'Invalid file submitted.'
      });
    }

    const fileObj = req.file;
    const filePublicID = fileObj.public_id;
    const secureURL = fileObj.secure_url;

    if (Util.trim(req.body.first_name) && Util.trim(req.body.last_name) && Util.trim(req.body.birth_date) && Util.trim(req.body.hobbies)) {

      const firstName = Util.trim(req.body.first_name);
      const lastName = Util.trim(req.body.last_name);
      const birthDate = Util.trim(req.body.birth_date);
      const hobbies = Util.trim(req.body.hobbies);

      if (!Util.isValidDate(birthDate)) {
        cloudinary.v2.uploader.destroy(filePublicID)
        return res.status(400).json({
          success: false,
          message: 'Invalid date'
        });
      }

      await db.execute("INSERT INTO student (first_name, last_name, birth_date, hobbies, photo, created_at) VALUES (?, ?, ?, ?, ?, NOW()) ", [firstName, lastName, birthDate, hobbies, secureURL]);

      return res.status(201).json({
        success: true,
        message: 'Successfully created record',
      });

    } else {
      cloudinary.v2.uploader.destroy(filePublicID)
      return res.status(400).json({
        success: false,
        message: 'Invalid parameters specified'
      });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

exports.editStudent = async (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).json({
        status: false,
        message: 'Invalid file submitted.'
      });
    }

    const fileObj = req.file;
    const filePublicID = fileObj.public_id;
    const secureURL = fileObj.secure_url;

    if (Util.trim(req.params.id) && Util.trim(req.body.first_name) && Util.trim(req.body.last_name) && Util.trim(req.body.birth_date) && Util.trim(req.body.hobbies)) {
      const id = Util.trim(req.params.id);
      const firstName = Util.trim(req.body.first_name);
      const lastName = Util.trim(req.body.last_name);
      const birthDate = Util.trim(req.body.birth_date);
      const hobbies = Util.trim(req.body.hobbies);

      if (!Util.isValidDate(birthDate)) {
        cloudinary.v2.uploader.destroy(filePublicID)
        return res.status(400).json({
          success: false,
          message: 'Invalid date'
        });
      }

      // validate student
      const [isValidStudent] = await db.execute("SELECT id FROM student WHERE id = ? ", [id]);

      if (isValidStudent.length === 0) {
        cloudinary.v2.uploader.destroy(filePublicID);
        return res.status(404).json({
          success: false,
          message: 'The requested student was not found'
        });
      }

      //  student is valid
      await db.execute("UPDATE student SET first_name = ?, last_name = ?, birth_date = ?, hobbies = ?, photo = ?", [firstName, lastName, birthDate, hobbies, secureURL]);

      return res.status(200).json({
        success: true,
        message: 'Successfully updated student'
      });

    } else {
      cloudinary.v2.uploader.destroy(filePublicID)
      return res.status(400).json({
        success: false,
        message: 'Invalid parameters specified'
      });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    if (Util.trim(req.params.id)) {
      const id = Util.trim(req.params.id);

      // validate student
      const [isValid] = await db.execute("SELECT id FROM student WHERE id = ?", [id]);

      if (isValid.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'The requested student was not found'
        });
      }

      // delete
      await db.execute("DELETE FROM student WHERE id = ?", [id]);

      return res.sendStatus(204);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid parameters specified'
      });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};