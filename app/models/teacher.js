'use strict';

var teachers = global.nss.db.collection('teachers');
var Mongo = require('mongodb');
var bcrypt = require('bcrypt');
var fs = require('fs');
var _ = require('lodash');
// var async = require('async');

class Teacher{
  constructor(obj){
    this.name= obj.name;
    this.email = obj.email;
    this.password = obj.password;
    this.avatar = {};
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


  save(fn){
    teachers.save(this, ()=>fn());
  }

  static findById(id, fn){
    id = Mongo.ObjectID(id);
    teachers.findOne({_id: id}, (err, teacher)=>{
      teacher = _.create(Teacher.prototype, teacher);
      console.log('--------------------');
      console.log(teacher);
      console.log('--------------------');
      fn(teacher);
    });
  }

  register(fn){
    teachers.findOne({email: this.email}, (err, teacher)=>{
      if(teacher){
        var isMatch = bcrypt.compareSync(this.password, teacher.password);
        if(isMatch){
          fn(teacher);
        } else {
          fn(null);
        }
      } else {
        this.password = bcrypt.hashSync(this.password, 8);
        teachers.save(this, (err, teacher)=>{
          fn(teacher);
        });
      }
    });
  }

  login(fn){
    teachers.findOne({email: this.email}, (err, teacher)=>{
      var isMatch = bcrypt.compareSync(this.password, teacher.password);
      if(isMatch){
        fn(teacher);
      } else {
        fn(null);
      }
    });
  }


}

module.exports = Teacher;
