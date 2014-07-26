'use strict';

var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');
var Teacher = traceur.require(__dirname + '/../models/teacher.js');

exports.new = (req, res)=>{
  var course = new Course(req.body);
  course.save(()=>{
    Teacher.findById(req.session.teacherId, teacher=>{
      res.render('courses/new', {teacher:teacher, course: course});
    });
  });
};

exports.addLesson = (req, res)=>{
  Course.findById(req.params.courseId, course=>{
    course.addLesson(req.body, ()=>{
      course.save(()=>{
        res.render('courses/lesson-list', {course:course});
      });
    });
  });
};

exports.newTest = (req, res)=>{
  Course.findById(req.params.courseId, course=>{
    res.render('courses/test-builder', {course:course});
  });
};

exports.addTest = (req, res)=>{
  Course.findById(req.params.courseId, course=>{
    course.addTest(req.body, ()=>{
      course.save(()=>{
        res.redirect('/teacher/dashboard');
      });
    });
  });
};

exports.show = (req, res)=>{
  Course.findById(req.params.courseId, course=>{
    Teacher.findById(req.session.teacherId, teacher=>{
      res.render('courses/show', {teacher:teacher, course: course});
    });
  });
};

exports.showTest = (req, res)=>{
  Course.findById(req.params.courseId, course=>{
    Teacher.findById(req.session.teacherId, teacher=>{
      res.render('courses/test', {course:course, teacher: teacher});
    });
  });
};

exports.gradeTest = (req, res)=>{
  Course.findById(req.params.courseId, course=>{
    Teacher.findById(req.session.teacherId, teacher=>{
      course.gradeTest(req.body, results=>{
        res.render('home/testresults', {teacher:teacher, course:course, results:results});
      });
    });
  });
};

exports.showAll = (req, res)=>{
  Course.findAll(courses=>{
    Teacher.findById(req.session.teacherId, teacher=>{
      res.render('courses/showall', {teacher:teacher, courses: courses});
    });
  });
};
