const es = new EventSource('/stream');
es.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  self.postMessage(msg);
};
