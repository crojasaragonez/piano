var thisp     = this;
var es  = new EventSource('/stream');
es.onmessage = function(e) {
  var msg = JSON.parse(e.data);
  thisp.postMessage(msg);
};
