import { Button } from "@chakra-ui/button";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useBoolean,
} from "@chakra-ui/react";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { Layer, Line, Rect, Stage } from "react-konva";
import * as Tone from "tone";
import { MembraneSynth, Transport } from "tone";
import { Beat, beatColors } from "./beats";
import midiData from "./midiData";

interface PlayerProps {
  track: typeof midiData.tracks[0];
  metronome: any[];
  kicks: any[];
  snares: any[];
}

interface BeatGrid2DProps {
  beatGroup: Beat[][];
}

const AMinorScale = ["A", "B", "C", "D", "E", "F", "G"];
const addOctaveNumbers = (scale: string[], octaveNumber: number) =>
  scale.map((note) => {
    const firstOctaveNoteIndex =
      scale.indexOf("C") !== -1 ? scale.indexOf("C") : scale.indexOf("C#");
    const noteOctaveNumber =
      scale.indexOf(note) < firstOctaveNoteIndex
        ? octaveNumber - 1
        : octaveNumber;
    return `${note}${noteOctaveNumber}`;
  });
const AMinorScaleWithOctave = addOctaveNumbers(AMinorScale, 4);

const constructMajorChord = (
  scale: string[],
  octave: number,
  rootNote: string
) => {
  const scaleWithOctave = addOctaveNumbers(scale, octave);

  const getNextChordNote = (note: string, nextNoteNumber: number) => {
    const nextNoteInScaleIndex =
      scaleWithOctave.indexOf(note) + nextNoteNumber - 1;
    let nextNote;
    if (typeof scaleWithOctave[nextNoteInScaleIndex] !== "undefined") {
      nextNote = scaleWithOctave[nextNoteInScaleIndex];
    } else {
      nextNote = scaleWithOctave[nextNoteInScaleIndex - 7];
      const updatedOctave = parseInt(nextNote.slice(1)) + 1;
      nextNote = `${nextNote.slice(0, 1)}${updatedOctave}`;
    }

    return nextNote;
  };

  const thirdNote = getNextChordNote(rootNote, 3);
  const fifthNote = getNextChordNote(rootNote, 5);
  const chord = [rootNote, thirdNote, fifthNote];

  return chord;
};

const IChord = constructMajorChord(AMinorScale, 4, "A3");
// Output: ['A3', 'C4', 'E4']
const VChord = constructMajorChord(AMinorScale, 4, "E4");
// Output: ['E4', 'G4', 'B4']
const VIChord = constructMajorChord(AMinorScale, 3, "F3");
// Output: ['F3', 'A3', 'C3']
const IVChord = constructMajorChord(AMinorScale, 3, "D3");
// Output: ['D3', 'F3', 'A3']

IChord.push("A2", "G4");
VChord.push("E2", "G3");
VIChord.push("F2", "E4");
IVChord.push("D2", "C4");

export const Player = (props: PlayerProps) => {
  let [playing, setPlaying] = useBoolean(false);
  let [bpm, setBPM] = useState(145);
  const { track, kicks, snares, metronome } = props;

  let loopRef = useRef<Tone.Loop>();

  useEffect(() => {
    const metronomeSynth = new Tone.DuoSynth().toDestination();

    const kickDrum = new MembraneSynth({
      volume: 6,
    }).toDestination();

    const lowPass = new Tone.Filter({
      frequency: 8000,
    }).toDestination();

    const snareDrum = new Tone.NoiseSynth({
      volume: 5,
      noise: {
        type: "white",
        playbackRate: 3,
      },
      envelope: {
        attack: 0.001,
        decay: 0.2,
        sustain: 0.15,
        release: 0.03,
      },
    }).connect(lowPass);

    // const loopStart = Tone.now() + "1m";
    const loopDuration = "1m";
    const makeLoop = () => {
      // let lt = "0";
      //schedule all of the events
      if (loopRef?.current) {
        loopRef.current.cancel();
      }
      loopRef.current = new Tone.Loop(function (looptime) {
        console.log("loop:", looptime);
        metronome.forEach((note) => {
          metronomeSynth.triggerAttackRelease(
            "C5",
            "32n",
            Tone.Time(note.time).toSeconds() + looptime
          );
        });
        kicks.forEach((note) => {
          kickDrum.triggerAttackRelease(
            "C1",
            "8n",
            Tone.Time(note.time).toSeconds() + looptime
          );
        });
        snares.forEach((note) => {
          snareDrum.triggerAttackRelease(
            "4n",
            Tone.Time(note.time).toSeconds() + looptime
          );
        });
        // const kickPart = new Part(function (time) {
        //   console.log("kick:", time, looptime);
        // }, kicks).start(loopStart);
        // const snarePart = new Tone.Part(function (time) {
        //   console.log("snare:", time, looptime);
        //   snareDrum.triggerAttackRelease("4n", time + looptime);
        // }, snares).start(0);
      }, loopDuration).start();
    };
    makeLoop();
  }, []);

  useEffect(() => {
    Transport.bpm.value = bpm;
  }, [bpm]);

  useEffect(() => {
    if (playing) {
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
    }
  }, [playing]);

  return (
    <>
      <Button onClick={() => setPlaying.toggle()}>
        {playing ? "Stop" : "Play"}
      </Button>
      <div>{Tone.Transport.position.toString()}</div>
      <div>{Tone.Transport.loop.toString()}</div>
      <div>{Tone.Transport.loopStart.toString()}</div>
      <NumberInput
        value={bpm}
        onChange={(s, n) => setBPM(n)}
        min={60}
        max={200}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </>
  );
};

export default function BeatGrid2D(props: BeatGrid2DProps) {
  const beatWidth = 50;
  // todo: solve left offset and veritical offset via CSS positioning of grid on the page
  const xOffset = 0;
  const ySpacing = 1;
  const yOffset = 0;
  const yTotal = props.beatGroup.length * beatWidth;

  useEffect(() => {
    const interval = setInterval(() => Date.now(), 25);

    return () => clearInterval(interval);
  }, []);

  const { beatGroup } = props;
  return (
    <Stage width={800} height={yTotal + 10}>
      <Layer>
        {/* background */}
        <Rect
          x={yOffset * beatWidth}
          y={xOffset * beatWidth}
          width={16 * beatWidth}
          height={yTotal}
          fill="lightgray"
        />
        {_.range(16).map((n) => (
          <Line
            key={n}
            x={xOffset * beatWidth}
            y={yOffset * beatWidth}
            points={[n * beatWidth, 0, n * beatWidth, yTotal]}
            tension={0.5}
            closed
            stroke="black"
            fillLinearGradientStartPoint={{ x: -50, y: -50 }}
            fillLinearGradientEndPoint={{ x: 50, y: 50 }}
            fillLinearGradientColorStops={[0, "red", 1, "yellow"]}
          />
        ))}

        {_.range(beatGroup.length).map((n) => (
          <Line
            key={n}
            x={xOffset * beatWidth}
            y={yOffset * beatWidth}
            points={[
              0,
              (yOffset + n * ySpacing) * beatWidth,
              16 * beatWidth,
              (yOffset + n * ySpacing) * beatWidth,
            ]}
            tension={0.5}
            closed
            stroke="black"
            fillLinearGradientStartPoint={{ x: -50, y: -50 }}
            fillLinearGradientEndPoint={{ x: 50, y: 50 }}
            fillLinearGradientColorStops={[0, "red", 1, "yellow"]}
          />
        ))}

        {beatGroup.map((beats, bgIdx) => {
          return beats.map((beat, bIdx) => {
            return (
              <>
                <Rect
                  key={`${bgIdx}-${bIdx}`}
                  x={(xOffset + beat.start) * beatWidth}
                  y={(yOffset + bgIdx * ySpacing) * beatWidth}
                  width={beat.duration * beatWidth}
                  height={beatWidth / 2}
                  fill={beatColors[bgIdx % beatColors.length]}
                  stroke={"black"}

                  // shadowBlur={beatWidth / 10}
                />
              </>
            );
          });
        })}
      </Layer>
    </Stage>
  );
}
