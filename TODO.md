Basic Framework

- figure out how to update 1 note in a sequence while it's playing (looping sequencer)
- then build UI to click to add/remove beat from instrument

---

- [ ] midi
  - [ ] parse midi in code
    - [ ] blocked on loading a midi file via React app, so i can convert (file-loader, etc)
- [ ] play audio
  - [ ] play midi: https://codesandbox.io/s/tonejs-midi-vfwdz?file=%2FMIDI%2FLEAD.json%3A571-572
  - https://github.com/surikov/midi-sounds-react
  - sequencer example: https://github.com/surikov/midi-sounds-react-examples/tree/master/examples/midi-sounds-example6
- [ ] add a extra line to the grid for "user input events"
- [ ] track and display "user input events" (keypress)
  - [ ] https://dev.to/shimphillip/building-a-piano-with-tone-js-5c2f
- [ ] track multiple user input events, separately (e.g. different keypress per midi line)
- [ ] allow midi input, not just keyboard

https://github.com/cifkao/html-midi-player
https://codepen.io/cifkao/pen/WNwpLzL

Create a beat

- [ ] Allow user to add / remove beats from grid
  - https://github.com/jazz-soft/JZZ-midi-SMF

---

Ideas:

- audio visualizer https://github.com/philnash/react-web-audio
- parsing and writing midi:
  - https://www.npmjs.com/package/midi-file
  - https://github.com/Tonejs/Midi

Reference:

- https://www.npmjs.com/package/jzz
- https://github.com/cifkao/html-midi-player and https://codepen.io/cifkao/pen/GRZxqZN
- https://onlinesequencer.net/import2/b22c7eb74bf7bb2dd3053d17ae00d145?title=Afrobeats+%28100+BPM%29.mid
  - sounds nice for my ex drum loops as 909 drum kit

visual libs:

- https://editor.p5js.org/ , konva
- also some game libs? excaliburjs, etc

inspiration:

- https://onlinesequencer.net/import2/b22c7eb74bf7bb2dd3053d17ae00d145?title=Afrobeats+%28100+BPM%29.mid
- https://github.com/AskAlice/react-three-midi

--

learning about tonejs

- https://www.devbridge.com/articles/tonejs-coding-music-production-guide/
- https://observablehq.com/@tmcw/playing-with-tone-js
- https://redacademy.github.io/tonejs-starter/
- https://pdm.lsupathways.org/3_audio/2_synthsandmusic/

--
example sequencer likes

- https://codesandbox.io/s/tonejs-forked-9hs2y?file=%2Fsrc%2Findex.js
