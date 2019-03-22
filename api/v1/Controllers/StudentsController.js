/*
  This module handles the actions that can be taken on 
  the student resource
*/

// const Util = require('../helpers/util');

const db = require('../../../db/connect');

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
          photo_url: students[i].photo_url,
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

exports.addStudent = async (req, res) => {};

exports.editStudent = async (req, res) => {};

exports.deleteStudent = async (req, res) => {};