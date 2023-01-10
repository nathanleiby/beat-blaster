import { Box, ChakraProvider, Grid, Text, VStack } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

import { extendTheme } from "@chakra-ui/react";
import _ from "lodash";
import { useEffect } from "react";
import BeatGrid2D from "./BeatGrid2D";
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
}

type BeatGroup = Beat[][];

export const App = () => {
  let beatGroups: BeatGroup[] = [];
  const beatGroup = [beat1, beat2];
  beatGroups.push(beatGroup);
  useEffect(() => {
    console.log("Setup beat groups");
    beatGroups.push(beatGroup);
    console.log("Setup beat groups.. doine!");
  }, [beatGroup, beatGroups]);

  return (
    <ChakraProvider theme={darkTheme}>
      {/* <Sequencer /> */}
      <Box textAlign="center" fontSize="xl">
        <Grid minH="60vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Text fontSize={"3xl"}>Beat Blasters</Text>
            <>
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
