'use strict';

var traceur = require('traceur');
var Teacher = traceur.require(__dirname + '/../models/teacher.js');
var Student = traceur.require(__dirname + '/../models/student.js');

exports.index = (req, res)=>{
  res.render('home/index', {title: 'Node.js: Home'});
};

exports.logout = (req, res)=>{
  console.log('MADE IT TO LOGOUT ROUTE');
  req.session = null;
  res.render('home/index', {title: 'Node.js: Home'});
};

exports.showRegister = (req, res)=>{
  console.log('MADE IT TO NODE--------');
  res.render('home/register', {title: 'StudyBuddy: Register'});
};

// exports.create = (req, res)=>{
//   var form = new multiparty.Form();
//   form.parse(req, (err, fields, files)=>{
//
//     if (!fs.existsSync(`${__dirname}/../static/img/${fields.name[0]}`)) {
//       var album = {};
//       album.name = fields.name[0];
//
//       files.coverArt.forEach(p=>{
//         fs.mkdirSync(`${__dirname}/../static/img/${fields.name[0]}`);
//         fs.renameSync(p.path, `${__dirname}/../static/img/${fields.name[0]}/${p.originalFilename}`);
//         album.coverArt = (p.originalFilename);
//     });
//
//     albums.save(album, ()=>res.redirect('/albums'));
//     }else{
//     res.redirect('/');
//     }
//   });
//
// };

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
