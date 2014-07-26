'use strict';

var traceur = require('traceur');
var Teacher = traceur.require(__dirname + '/../models/teacher.js');
var Student = traceur.require(__dirname + '/../models/student.js');

exports.index = (req, res)=>{
  res.render('home/index', {title: 'Node.js: Home'});
};

exports.logout = (req, res)=>{
  req.session = null;
  res.render('home/index', {title: 'Node.js: Home'});
};

exports.showRegister = (req, res)=>{
  res.render('home/register', {title: 'StudyBuddy: Register'});
};

exports.register = (req, res)=>{
  if(req.body.type === 'teacher'){
    var teacher = new Teacher(req.body);
    teacher.register(t=>{
      if(t){
        req.session.teacherId = t._id;
      } else {
        req.session.teacherId = null;
      }
      res.redirect('/teacher/dashboard');
    });

  } else {
    var student = new Student(req.body);
    student.register(s=>{
      if(s){
        req.session.studentId = s._id;
      } else {
        req.session.studentId = null;
      }
      res.redirect('/student/dashboard');
    });
  }

};
