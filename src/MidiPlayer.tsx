import { PlayerElement, VisualizerElement } from "html-midi-player";

export default function MidiPlayer() {
  return (
    <>
      {/* @ts-ignore */}
      <PlayerElement
        src="https://magenta.github.io/magenta-js/music/demos/melody.mid"
        sound-font
        visualizer="#myVisualizer"
      />
      {/* @ts-ignore */}
      <VisualizerElement type="piano-roll" id="myVisualizer" />
    </>
  );
}
