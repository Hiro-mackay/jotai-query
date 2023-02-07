import { ChakraProvider as Provider } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { theme } from './theme';

export const ChakraProvider = ({ children }: PropsWithChildren) => (
  <Provider theme={theme}>{children}</Provider>
);
