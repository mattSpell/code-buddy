'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var students = traceur.require(__dirname + '/../routes/students.js');
  var teachers = traceur.require(__dirname + '/../routes/teachers.js');
  var teacherCourses = traceur.require(__dirname + '/../routes/teacher-courses.js');
  var studentCourses = traceur.require(__dirname + '/../routes/student-courses.js');


  app.get('/', dbg, home.index);

  app.get('/register', dbg, home.showRegister);
  app.post('/register', dbg, home.register);

  app.get('/student/login', dbg, students.new);
  app.post('/student/login', dbg, students.login);

  app.get('/teacher/login', dbg, teachers.new);
  app.post('/teacher/login', dbg, teachers.login);

  app.get('/teacher/dashboard', dbg, teachers.dashboard);
  app.get('/student/dashboard', dbg, students.dashboard);

  app.post('/course/new', dbg, teacherCourses.new);
  app.post('/course/:courseId/addLesson', dbg, teacherCourses.addLesson);

  app.get('/teacher/courses/all', dbg, teacherCourses.showAll);
  app.get('/student/courses/all', dbg, studentCourses.showAll);

  app.get('/course/:courseId/newTest', dbg, teacherCourses.newTest);
  app.post('/course/:courseId/addTest', dbg, teacherCourses.addTest);

  app.get('/course/:courseId/show', dbg, teacherCourses.show);
  app.get('/student/course/:courseId/show', dbg, studentCourses.show);

  app.get('/course/:courseId/test', dbg, teacherCourses.showTest);
  app.get('/student/course/:courseId/test', dbg, studentCourses.showTest);

  app.post('/course/:courseId/test', dbg, teacherCourses.gradeTest);
  app.post('/student/course/:courseId/test', dbg, studentCourses.gradeTest);

  app.get('/logout', dbg, home.logout);

  console.log('Routes Loaded');
  fn();
}
