'use strict';

var students = global.nss.db.collection('students');
var Mongo = require('mongodb');
var _ = require('lodash');
var bcrypt = require('bcrypt');
var fs = require('fs');

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

module.exports = Student;
