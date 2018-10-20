// reading
var es = new EventSource('/stream');
es.onmessage = function(e) {
  var msg = JSON.parse(e.data);
  $('#chat').append(msg.user + ": " + msg.msg + "\n");
};

// writing
$("form").on('submit',function(e) {
  $.post('/', {msg: $('#msg').val()});
  $('#msg').val(''); $('#msg').focus();
  e.preventDefault();
});
