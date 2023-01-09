import {
  Box,
  ChakraProvider,
  Code,
  Grid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

import { extendTheme } from "@chakra-ui/react";
import _ from "lodash";
import { useEffect } from "react";
import BeatGrid2D, { Player } from "./BeatGrid2D";
import { Beat, beat1, beat2 } from "./beats";

import midiData from "./midiData";

// import boopSfx from "./afrobeats.mid";

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

// 3. extend the theme
const darkTheme = extendTheme({ config });

function transformJSON(trackZero: typeof midiData.tracks[0]): Beat[][] {
  const noteGroups = _.groupBy(trackZero.notes, (n) => n.name);

  const totalTicks = trackZero.endOfTrackTicks;
  if (!totalTicks) {
    throw "totalTicks must be set in track";
  }
  const scaleFactor = 16 / totalTicks;

  const tracks = _.map(noteGroups, (g) =>
    g.map((n) => {
      return {
        start: n.ticks * scaleFactor,
        duration: n.durationTicks * scaleFactor,
      };
    })
  );
  console.log({ tracks });
  return tracks;
  // return beatGroup;
}

// function parseFile(file: string) {
//   // const data = raw("src/midi/Afrobeats (100 BPM).mid");
//   const data = boopSfx;
//   // const data = readFileSync(file);
//   const midiData = new Midi(Buffer.from(data));
//   return transformJSON(midiData.tracks[0]);
// }

type BeatGroup = Beat[][];

const metronome = [{ time: "0:0" }];

const kicks = [
  { time: "0:0" },
  { time: "0:1" },
  { time: "0:2" },
  { time: "0:3" },
  // { time: "0:3:2" },
  // { time: "1:1" },
  // { time: "2:0" },
  // { time: "2:1:2" },
  // { time: "2:3:2" },
  // { time: "3:0:2" },
  // { time: "3:1:" },
  // { time: "4:0" },
  // { time: "4:3:2" },
  // { time: "5:1" },
  // { time: "6:0" },
  // { time: "6:1:2" },
  // { time: "6:3:2" },
  // { time: "7:0:2" },
  // { time: "7:1:" },
];

const snares = [
  { time: "0:2" },
  // { time: "1:2" },
  // { time: "1:3" },
  // { time: "2:2" },
  // { time: "3:2" },
  // { time: "4:2" },
  // { time: "5:2" },
  // { time: "6:2" },
  // { time: "7:2" },
];

export const App = () => {
  // const beatGroup = transformJSON(midiDataAfrobeats);
  // const beatGroup2 = transformJSON(midiData.tracks[0]);
  let beatGroups: BeatGroup[] = [];
  const beatGroup = [beat1, beat2];
  beatGroups.push(beatGroup);
  // beatGroups.push(beatGroup2);
  useEffect(() => {
    console.log("Setup beat groups");
    beatGroups.push(beatGroup);
    console.log("Setup beat groups.. doine!");
  }, [beatGroup, beatGroups]);
  // const beatGroup = parseFile(afrobeat);

  return (
    <ChakraProvider theme={darkTheme}>
      {/* <Sequencer /> */}
      <Box textAlign="center" fontSize="xl">
        <Grid minH="60vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Text>
              Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
            </Text>
            <>
              <Player
                track={midiData.tracks[0]}
                metronome={metronome}
                kicks={kicks}
                snares={snares}
              />
              <BeatGrid2D beatGroup={beatGroup} />
            </>
          </VStack>
        </Grid>
        {/* <MidiPlayer /> */}

        {/* <Grid minH="30vh">
          <BeatGrid3D beatGroup={beatGroup} />
        </Grid> */}
      </Box>
    </ChakraProvider>
  );
};
