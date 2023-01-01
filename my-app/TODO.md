Basic Framework

- [x] render a grid (4/4 measure)
- [...] render imported midi file onto grid
  - [x] manually converted here and outputted TS file for clear types https://tonejs.github.io/Midi/
  - [x] display JSON from parsed midi
  - [ ] parse midi in code.
- [ ] show moving bar on grid
- [ ] show moving bar in relation to midi position
  - [ ] https://animate.style/
  - [ ] https://www.react-spring.dev/docs/getting-started
- [ ] play midi file as audio
  - [ ] play midi: https://codesandbox.io/s/tonejs-midi-vfwdz?file=%2FMIDI%2FLEAD.json%3A571-572
  - https://github.com/surikov/midi-sounds-react
  - sequencer example: https://github.com/surikov/midi-sounds-react-examples/tree/master/examples/midi-sounds-example6
- [ ] add a extra line to the grid for "user input events"
- [ ] track and display "user input events" (keypress)
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
