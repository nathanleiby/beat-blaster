import {
  Box,
  ChakraProvider,
  Code,
  Grid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";
import _ from "lodash";
import BeatGrid2D from "./BeatGrid2D";
import { Beat, beat1, beat2 } from "./beats";
import midiData from "./midiData";
import midiDataAfrobeats from "./midiData-afrobeats";
import Sequencer from "./Sequencer";

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

// 3. extend the theme
const darkTheme = extendTheme({ config });

function transformJSON(data: typeof midiData): Beat[][] {
  const beatGroup = [beat1, beat2, beat2, beat2, beat1, beat2, beat1];

  const noteGroups = _.groupBy(data.tracks[0].notes, (n) => n.name);

  const totalTicks = data.tracks[0].endOfTrackTicks;
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

export const App = () => {
  const beatGroup = transformJSON(midiDataAfrobeats);
  const beatGroup2 = transformJSON(midiData);

  // Playing audio (https://tonejs.github.io/)
  // //create a synth and connect it to the main output (your speakers)
  // const synth = new Synth().toDestination();

  // //play a middle 'C' for the duration of an 8th note
  // const tNow = now();
  // // trigger the attack immediately
  // synth.triggerAttack("C4", tNow);
  // // wait one second before triggering the release
  // synth.triggerRelease(tNow + 1);

  return (
    <ChakraProvider theme={darkTheme}>
      <Sequencer />
      <BeatGrid2D beatGroup={beatGroup} />
      <BeatGrid2D beatGroup={beatGroup2} />
      <Box textAlign="center" fontSize="xl">
        <Grid minH="60vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
            </Text>
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
