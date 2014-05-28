(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#logout').click(logout);
  }
  function logout() {
    ajax('/logout', 'get', null, (function(html) {
      console.log(html);
      document.location.replace('/');
    }));
  }
})();
function ajax(url, type) {
  'use strict';
  var data = arguments[2] !== (void 0) ? arguments[2] : {};
  var success = arguments[3] !== (void 0) ? arguments[3] : (function(r) {
    return console.log(r);
  });
  var dataType = arguments[4] !== (void 0) ? arguments[4] : 'html';
  $.ajax({
    url: url,
    type: type,
    dataType: dataType,
    data: data,
    success: success
  });
}

//# sourceMappingURL=main.map
