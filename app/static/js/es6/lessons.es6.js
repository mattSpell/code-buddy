/* global ajax */
/* jshint unused:false */
/* jshint undef:false */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#lessons').hide();
    $('#addlesson').click(showLessonForm);
    $('#savelesson').click(saveLesson);
    loadEditor();
     //$( '#accordion' ).accordion();
  }

  function showLessonForm(){
    $('#lessons').slideToggle();
  }

  function saveLesson(){
    var title = $('#title').val();
    var description = $('#description').val();
    var courseId = $('#course').attr('data-id');
    var content = fullEditor.getHTML();

    ajax(`/course/${courseId}/addLesson`, 'post', {title:title, description:description, content:content}, html=>{
      console.log(html);
      $('#lesson-list').empty().append(html);
      $('input#title').val('');
      $('#description').val('');
      fullEditor.deleteText(0,9999);
    });
  }

  var fullEditor;
  function loadEditor(){
    fullEditor = new Quill('#full-editor', {
      modules: {
        'authorship': { enabled: true },
        'multi-cursor': true,
        'toolbar': { container: '#full-toolbar' },
        'image-tooltip': true,
        'link-tooltip': true
      },
      theme: 'snow'
    });
  }

})();
