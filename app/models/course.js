/* jshint sub:true */
/* jshint unused:false */

'use strict';

var courses = global.nss.db.collection('courses');
var Mongo = require('mongodb');
var _ = require('lodash');
// var async = require('async');

class Course{
  constructor(obj){
    this.title= obj.title;
    this.description = obj.description;
    this.material = [];
    this.test = [];
  }

  save(fn){
    courses.save(this, ()=>fn());
  }

  addTest(data, fn){
    var problems = [];
    var problem = {};
    var wrongAnswersArray = [];
    var wrongChoicesArray = [];

    if(!Array.isArray(data.question)){

      problem = {};

      problem.question = data.question;
      problem.solution = data.solution;
      problem.wronganswers = data.wronganswer;
      problem.choices = [];
      problem.choices = problem.wronganswers;
      problem.choices.push(problem.solution);
      problem.choices = _(problem.choices).shuffle();
      problem.choices = problem.choices.value();

      problems.push(problem);

    } else {

      for(var j = 0; j< data.wronganswer.length; j+=3){
        var wrongAnswers = [];
        wrongAnswers = data.wronganswer.slice(j, j+3);
        wrongAnswersArray.push(wrongAnswers);
        wrongChoicesArray.push(wrongAnswers);
      }

      for(var i = 0; i<data.question.length; i++){

        problem = {};
        problem.question = data.question[i];
        problem.solution = data.solution[i];

        problem.wronganswers = [];
        problem.wronganswers = wrongAnswersArray[i];

        problem.choices = [];
        problem.choices = wrongChoicesArray[i];
        problem.choices.push(data.solution[i]);
        problem.choices = _(problem.choices).shuffle();
        problem.choices = problem.choices.value();

        problems.push(problem);
      }
    }

    this.test = problems;
    fn();

  }

  addLesson(data, fn){
    var lesson = {};
    lesson.title = data.title;
    lesson.description = data.description;
    lesson.content = data.content;

    this.material.push(lesson);
    fn();
  }

  gradeTest(data, fn){

    var numRight = 0;
    var numWrong = 0;

    for(var i=0; i<this.test.length; i++){
      var question = this.test[i].question;

      if(data[`${question}`] === this.test[i].solution){
        console.log('WINNING');
        numRight++;
      } else if(data[`${question}`] !== this.test[i].solution) {
        console.log('LOSING');
        numWrong++;
      }
    }

    var total = numRight + numWrong;
    var grade = (numRight / total) * 100;
    grade = Math.round(grade);

    var results = {};
    results.numRight = numRight;
    results.numWrong = numWrong;
    results.grade = grade;

    fn(results);
  }

  static findById(courseId, fn){
    courseId = Mongo.ObjectID(courseId);
    courses.findOne({_id: courseId}, (err, course)=>{
      course = _.create(Course.prototype, course);
      fn(course);
    });
  }

  static findAll(fn){
    courses.find().toArray((err, courses)=>{
      fn(courses);
    });
  }



}

module.exports = Course;
