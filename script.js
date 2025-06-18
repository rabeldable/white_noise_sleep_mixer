// script.js
// Main JavaScript for HTML5 White-Noise Sleep Mixer

let audioCtx;

// --- AmbientLoop: wraps a <audio> element in Web Audio for volume & play/pause ---
class AmbientLoop {
  constructor(audioEl) {
    this.audioEl = audioEl;
    this.source = audioCtx.createMediaElementSource(audioEl);
    this.gainNode = audioCtx.createGain();
    this.source
      .connect(this.gainNode)
      .connect(audioCtx.destination);
  }
  setVolume(v) { this.gainNode.gain.value = v; }
  start()      { this.audioEl.play(); }
  stop() {
    this.audioEl.pause();
    this.audioEl.currentTime = 0;
  }
}

// --- BinauralBeat: generates two oscillators panned L/R for binaural effect ---
class BinauralBeat {
  constructor() {
    this.gainNode = audioCtx.createGain();
    this.merger   = audioCtx.createChannelMerger(2);
    this.oscA     = audioCtx.createOscillator();
    this.oscB     = audioCtx.createOscillator();
    // connect left/right
    this.oscA.connect(this.merger, 0, 0);
    this.oscB.connect(this.merger, 0, 1);
    this.merger
      .connect(this.gainNode)
      .connect(audioCtx.destination);
    this.playing = false;
  }
  setFrequencies(baseHz, beatHz) {
    this.oscA.frequency.value = baseHz;
    this.oscB.frequency.value = baseHz + beatHz;
  }
  setVolume(v) { this.gainNode.gain.value = v; }
  start() {
    if (this.playing) return;
    this.oscA.start();
    this.oscB.start();
    this.playing = true;
  }
  stop() {
    if (!this.playing) return;
    this.oscA.stop();
    this.oscB.stop();
    this.playing = false;
    // recreate for next session
    this.oscA = audioCtx.createOscillator();
    this.oscB = audioCtx.createOscillator();
    this.oscA.connect(this.merger, 0, 0);
    this.oscB.connect(this.merger, 0, 1);
  }
}

// --- Wire up UI on page load ---
document.addEventListener('DOMContentLoaded', () => {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // instantiate loops & binaural
  const rain = new AmbientLoop(document.getElementById('rain-audio'));
  const fire = new AmbientLoop(document.getElementById('fire-audio'));
  const binaural = new BinauralBeat();

  // rain controls
  document.getElementById('rain-toggle')
    .addEventListener('change', e => e.target.checked ? rain.start() : rain.stop());
  document.getElementById('rain-volume')
    .addEventListener('input', e => rain.setVolume(e.target.value));

  // fire controls
  document.getElementById('fire-toggle')
    .addEventListener('change', e => e.target.checked ? fire.start() : fire.stop());
  document.getElementById('fire-volume')
    .addEventListener('input', e => fire.setVolume(e.target.value));

  // binaural toggle & params
  const bt = document.getElementById('binaural-toggle');
  bt.addEventListener('change', e => {
    if (e.target.checked) {
      const bHz = parseFloat(document.getElementById('base-freq').value);
      const tHz = parseFloat(document.getElementById('beat-freq').value);
      binaural.setFrequencies(bHz, tHz);
      binaural.start();
    } else {
      binaural.stop();
    }
  });
  document.getElementById('base-freq')
    .addEventListener('change', e => binaural.setFrequencies(
      parseFloat(e.target.value),
      parseFloat(document.getElementById('beat-freq').value)
    ));
  document.getElementById('beat-freq')
    .addEventListener('change', e => binaural.setFrequencies(
      parseFloat(document.getElementById('base-freq').value),
      parseFloat(e.target.value)
    ));
  document.getElementById('binaural-volume')
    .addEventListener('input', e => binaural.setVolume(e.target.value));
});

