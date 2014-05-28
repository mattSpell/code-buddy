'use strict';

var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');
var Student = traceur.require(__dirname + '/../models/student.js');
var multiparty = require('multiparty');

exports.avatar = (req, res)=>{
  var form = new multiparty.Form();

  Student.findById(req.session.studentId, student=>{
    student.addAvatar(form, req, ()=>{
      student.save(()=>{
        res.render('students/dashboard', {student: student});
      });
    });
  });
};



exports.show = (req, res)=>{
  Course.findById(req.params.courseId, course=>{
    Student.findById(req.session.studentId, student=>{
      res.render('courses/show', {student:student, course: course});
    });
  });
};

exports.showTest = (req, res)=>{
  Course.findById(req.params.courseId, course=>{
    Student.findById(req.session.studentId, student=>{
      res.render('courses/test', {course:course, student: student});
    });
  });
};

exports.gradeTest = (req, res)=>{
  Course.findById(req.params.courseId, course=>{
    Student.findById(req.session.studentId, student=>{
      course.gradeTest(req.body, results=>{
        student.addCompletedCourse(course, results, ()=>{
          student.save(()=>{
            res.render('home/testresults', {student:student, course:course, results:results});
          });
        });
      });
    });
  });
};

exports.showAll = (req, res)=>{
  Course.findAll(courses=>{
    Student.findById(req.session.studentId, student=>{
      res.render('courses/showall', {student:student, courses: courses});
    });
  });
};
