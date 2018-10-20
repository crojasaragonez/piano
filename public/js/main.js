var synth = new Tone.AMSynth().toMaster()

// reading
var es = new EventSource('/stream');
es.onmessage = function(e) {
  var msg = JSON.parse(e.data);
  synth.triggerAttackRelease(msg.note, "8n");
  $('#' + msg.note).addClass('active').delay(500).queue(function () {
    $(this).removeClass("active");
    $(this).dequeue();
  })
};

$('.key').click(function(event) {
  $.post('/', { note: $(this).attr('id') });
  //synth.triggerAttack($(this).attr('id'), "2n");
});

/*$('.key').mousedown(function(event) {
  synth.triggerAttack($(this).attr('id'));
});

$('.key').mouseup(function(event) {
  synth.triggerRelease()
});*/
