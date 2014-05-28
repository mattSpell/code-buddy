'use strict';

var students = global.nss.db.collection('students');
var Mongo = require('mongodb');
var _ = require('lodash');
var bcrypt = require('bcrypt');
// var multiparty = require('multiparty');
var fs = require('fs');  //imports the fs module (this is built into node)
// var async = require('async');

class Student{
  constructor(obj){
    this.name= obj.name;
    this.email = obj.email;
    this.password = obj.password;
    this.completedCourses = [];
    this.avatar = {};
  }





  static findById(id, fn){
    id = Mongo.ObjectID(id);
    students.findOne({_id: id}, (err, student)=>{
      student = _.create(Student.prototype, student);
      fn(student);
    });
  }



  save(fn){
    students.save(this, ()=>fn());
  }



  addCompletedCourse(course, results, fn){
    var completedCourse = {};

    completedCourse.id = course._id;
    completedCourse.title = course.title;
    completedCourse.description = course.description;
    completedCourse.results = results;

    this.completedCourses.push(completedCourse);
    fn();
  }

  register(fn){

    students.findOne({email: this.email}, (err, student)=>{
      if(student){
        var isMatch = bcrypt.compareSync(this.password, student.password);
        if(isMatch){
          fn(student);
        } else {
          fn(null);
        }
      } else {
        this.password = bcrypt.hashSync(this.password, 8);
        students.save(this, (err, student)=>{
          fn(student);
        });
      }
    });
  }

  login(fn){
    students.findOne({email: this.email}, (err, student)=>{
      var isMatch = bcrypt.compareSync(this.password, student.password);
      if(isMatch){
        fn(student);
      } else {
        fn(null);
      }
    });
  }


addAvatar(form, req, fn){
  form.parse(req, (err, fields, files)=>{
    if (!fs.existsSync(`${__dirname}/../static/img/${this.name}`)) {
      var avatar = {};
      avatar.name = this.name;
      console.log(fields);
      console.log(files);
      files.avatar.forEach(p=>{
        fs.mkdirSync(`${__dirname}/../static/img/${this.name}`);
        fs.renameSync(p.path, `${__dirname}/../static/img/${this.name}/${p.originalFilename}`);
        avatar.photo = (p.originalFilename);
        this.avatar = avatar;

        console.log('this is the avatar');
        console.log(avatar);

        fn();
    });
  }
});
}
}
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
// //
//     albums.save(album, ()=>res.redirect('/albums'));
//     }else{
//     res.redirect('/');
//     }
//   });
//
// };

module.exports = Student;
