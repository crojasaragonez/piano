var synth = new Tone.AMSynth().toMaster();
var worker  = new Worker('/js/worker.js');

worker.onmessage = function(event) {
  var msg = event.data;
  synth.triggerAttackRelease(msg.note, "8n");

  $('#' + msg.note).css('background-color', msg.color)
                   .delay(500)
                   .queue(function () {
                      $(this).css('background-color', '').dequeue();
                    });
};

$('.key').click(function() {
  $.post('/', { note: $(this).attr('id'), color: $('#color').val() });
});
