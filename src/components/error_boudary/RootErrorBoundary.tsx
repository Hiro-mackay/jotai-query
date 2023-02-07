import { Button } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export const RootErrorBoundary = ({ children }: PropsWithChildren) => (
  <ErrorBoundary
    fallback={
      <div role="alert">
        <h2>Ooops, something went wrong :( </h2>
        <Button colorScheme="green" onClick={() => window.location.assign(window.location.origin)}>
          Refresh
        </Button>
      </div>
    }
  >
    {children}
  </ErrorBoundary>
);
