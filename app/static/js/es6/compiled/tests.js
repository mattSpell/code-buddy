(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#addtest').click(addTest);
    $('#builder').on('click', '#addquestion', addQuestion);
    $('#builder').on('click', '#savetest', saveTest);
  }
  function saveTest() {
    $('#test').submit();
  }
  var count = 1;
  function addQuestion() {
    var newQuestion = $('#test > .question:first-child').clone();
    $('#test').append(newQuestion);
  }
  function addTest() {
    var courseId = $('#course').attr('data-id');
    ajax(("/course/" + courseId + "/newTest"), 'get', null, (function(html) {
      console.log(html);
      $('#builder').append(html);
    }));
  }
})();

//# sourceMappingURL=tests.map
