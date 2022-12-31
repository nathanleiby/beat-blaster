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
import BeatGrid2D from "./BeatGrid2D";
import { beat1, beat2 } from "./beats";
import Sequencer from "./Sequencer";

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

// 3. extend the theme
const darkTheme = extendTheme({ config });

export const App = () => {
  const beatGroup = [beat1, beat2, beat2, beat2, beat1, beat2, beat1];

  return (
    <ChakraProvider theme={darkTheme}>
      <Sequencer />
      <BeatGrid2D beatGroup={beatGroup} />
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

        {/* <Grid minH="30vh">
          <BeatGrid3D beatGroup={beatGroup} />
        </Grid> */}
      </Box>
    </ChakraProvider>
  );
};
