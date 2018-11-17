var synth = new Tone.AMSynth().toMaster();
var worker  = new Worker('/js/worker.js');

worker.onmessage = function(event){
  var msg = event.data;
  synth.triggerAttackRelease(msg.note, "8n");

  $('#' + msg.note).queue(function (next) {
    $(this).css('background-color', msg.color);
    next();
  }).delay(500).queue(function (next) {
    $(this).css('background-color', '');
    next();
  });
};

$('.key').click(function(event) {
  $.post('/', { note: $(this).attr('id') });
});
