/* exported ajax */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#logout').click(logout);
  }

  function logout(){
    ajax('/logout', 'get', null, html=>{
      console.log(html);
      document.location.replace('/');
    });
  }

})();

function ajax(url, type, data={}, success=r=>console.log(r), dataType='html'){
  'use strict';
  $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
}
