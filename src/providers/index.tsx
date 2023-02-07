import { PropsWithChildren, Suspense } from 'react';
import { RootErrorBoundary } from '@components/error_boudary/RootErrorBoundary';
import { ChakraProvider } from '@libs/chakraui/Provider';
import { ReactQueryProvider } from '@libs/react_query';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RootErrorBoundary>
        <ReactQueryProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </ReactQueryProvider>
      </RootErrorBoundary>
    </Suspense>
  );
};
