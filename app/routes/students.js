'use strict';

var traceur = require('traceur');
var Student = traceur.require(__dirname + '/../models/student.js');

exports.index = (req, res)=>{
  res.render('home/index', {title: 'Node.js: Home'});
};

exports.new = (req, res)=>{
  res.render('students/login', {title: 'StudyBuddy: Student Login'});
};

exports.login = (req, res)=>{

  var student = new Student(req.body);
  student.login(s=>{
    if(s){
      req.session.studentId = s._id;
      req.session.teacherId = null;
      res.redirect('/student/dashboard');
    } else {
      res.redirect('/');
    }
  });
};

exports.dashboard = (req, res)=>{
  Student.findById(req.session.studentId, student=>{
    res.render('students/dashboard', {student: student, title: 'StudyBuddy: Student Dash'});
  });
};
