# white_noise_sleep_mixer
HTML5 White-Noise Sleep Mixer: standalone, browser-only tool blending rain/fire loops and customizable binaural beats. No external dependencies; audio embedded via Base64 URIs. Toggle loops, adjust volumes, set base/beat frequencies. Open index.html locally (file://), no server needed. Created with AI.

# HTML5 White-Noise Sleep Mixer

A self-contained, browser-only tool for mixing ambient loops (rain, fire) and generating binaural beats—no servers or external dependencies required.

---

## 🚀 Features

* **Rain & Fire Loops**: Toggle each loop on/off
* **Volume Control**: Independent sliders for each loop
* **Binaural Beats**: Adjustable beat frequency and volume
* **Pure Web Audio API**: All audio processing runs locally in your browser

---

## 📋 Prerequisites

* Modern browser with [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) support
* Three files in one folder:

  ```
  /index.html
  /style.css
  /script.js
  ```
* Base64-encoded rain & fire MP3 loops (you supply these)

---

## 🗂️ File Structure

```
.
├── index.html    ← Main UI + embedded README
├── style.css     ← Layout & control styling
└── script.js     ← SleepMixer class & UI bindings
```

---

## 🛠️ Getting Started

1. **Encode loops**: Convert your `rain.mp3` and `fire.mp3` to Base64 (e.g. `base64 rain.mp3 > rain.b64`).
2. **Insert data**: Open `index.html`, replace each `INSERT_BASE64_HERE` with the appropriate Base64 string.
3. **Open in browser**: Load `file://…/index.html` in Chrome, Firefox, or Edge.
4. **Mix & relax**: Use the checkboxes & sliders to craft your soundscape.

---

## 🎛️ UI & Controls

| Control            | Element IDs       | Description                           |
| ------------------ | ----------------- | ------------------------------------- |
| Rain Loop toggle   | `#rainToggle`     | Start/stop rain audio                 |
| Rain volume slider | `#rainVolume`     | Adjust rain loop volume (0.0–1.0)     |
| Fire Loop toggle   | `#fireToggle`     | Start/stop fire audio                 |
| Fire volume slider | `#fireVolume`     | Adjust fire loop volume (0.0–1.0)     |
| Binaural toggle    | `#binauralToggle` | Enable/disable binaural beat          |
| Beat frequency     | `#binauralDiff`   | Difference between two tones (Hz)     |
| Binaural volume    | `#binauralVolume` | Adjust binaural beat volume (0.0–1.0) |

---

## ⚙️ Implementation Details

* **`SleepMixer` class** in `script.js` handles:

  * `AudioContext` initialization
  * Ambient loops via `MediaElementSourceNode` + `GainNode`
  * Binaural beats via two `OscillatorNode`s + `StereoPannerNode`
  * UI event binding for toggles & sliders

---

## ✨ Extending & Customization

* **Add more loops**:

  1. Duplicate a control block in `index.html`
  2. Add a matching hidden `<audio>` tag with Base64 source
  3. Wire up in `SleepMixer.setupAmbient('yourId')` and UI bindings

---

## 🛠️ Troubleshooting

* **No sound?** Ensure your Base64 strings are valid and not truncated.
* **AudioContext errors?** Confirm your browser supports Web Audio API and you’re not in an iframe with restrictive CSP.
* **Console logs** in Developer Tools help trace initialization or playback issues.

---

## ❓ FAQ

**Q:** Can I use my own loops?
**A:** Yes—just Base64-encode them and insert into `index.html`.

**Q:** Why isn’t the binaural beat audible?
**A:** Check that `#binauralToggle` is enabled and the diff & volume are set above zero.

---

## ⚖️ Usage Rights & Warranty

This tool, written heavily with the use of AI, comes with **no warranties** and may or may not work as intended. Use at your own risk.

---

## 📚 References

* [MDN Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
* [AudioContext on MDN](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)

## SCREENSHOTS
![image](https://github.com/user-attachments/assets/b1850976-c3a3-4c9f-bc6f-781564339bed)
