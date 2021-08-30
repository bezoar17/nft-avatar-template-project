import { extendTheme } from '@chakra-ui/react';

export const baseTheme = extendTheme({
  colors: {
    base_green: '#039322',
    base_black_metamask: '#111',
    base_back_blue: '#000',
    base_darkerback_blue: '#07081d',
    base_tinge_blue: '#07081d',
    base_highlight_blue: '#7afffe',
    base_highlight_yellow: '#fde005',
  },
  fonts: {
    heading: "Nunito",
    body: "Nunito",
  },
  lineHeights: {
    "76": "76px",
  },
});
