var es  = new EventSource('/stream');
es.onmessage = function(e) {
  var msg = JSON.parse(e.data);
  self.postMessage(msg);
};
