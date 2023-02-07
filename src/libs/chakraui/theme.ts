import { extendTheme } from '@chakra-ui/react';

// this is EXAMPLE
const colors = {};

const baseStyles = {
  global: {
    html: {
      height: '100%',
    },
    body: {
      height: '100%',
      margin: 0,
    },
    '#root': {
      height: '100%',
    },
  },
};

export const theme = extendTheme({
  styles: {
    ...baseStyles,
  },
  colors,
  components: {
    Table: {
      parts: ['th'],
      baseStyle: {
        th: {
          textTransform: 'none',
        },
      },
    },
  },
});
