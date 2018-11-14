var synth = new Tone.AMSynth().toMaster();
var worker  = new Worker('/js/worker.js');

worker.onmessage = function(event){
  var msg = event.data;
  synth.triggerAttackRelease(msg.note, "8n");
  $('#' + msg.note).addClass('active').delay(500).queue(function () {
    $(this).removeClass("active");
    $(this).dequeue();
  })
};

$('.key').click(function(event) {
  $.post('/', { note: $(this).attr('id') });
});
