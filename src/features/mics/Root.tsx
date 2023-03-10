import { Button } from '@chakra-ui/react';
import { useAtom, useSetAtom } from 'jotai/react';
import { atom } from 'jotai/vanilla';
import { atomsWithMutation, atomsWithQuery } from 'jotai-tanstack-query';
import { ErrorBoundary } from 'react-error-boundary';
import type { FallbackProps } from 'react-error-boundary';

const idAtom = atom(1);

const [userAtom] = atomsWithQuery(get => ({
  queryKey: ['users', get(idAtom)],
  queryFn: async ({ queryKey: [, id] }) => {
    const res = await fetch(`https://reqres.in/api/users/${id}`);
    return res.json();
  },
}));

const [, statusAtom] = atomsWithMutation(() => ({
  mutationKey: ['posts'],
  mutationFn: async ({ title }: { title: string }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body: 'body',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await res.json();
    return data;
  },
}));

const GenUserData = () => {
  const [status, dispatch] = useAtom(statusAtom);
  return (
    <div style={{ marginTop: 50 }}>
      <Button colorScheme="blue" onClick={() => dispatch([{ title: 'foo' }])}>
        Mutation
      </Button>
      <pre>{JSON.stringify(status, null, 2)}</pre>
    </div>
  );
};

const UserData = () => {
  const [{ data }, dispatch] = useAtom(userAtom);

  return (
    <div>
      <ul>
        <li>ID: {data.id}</li>
        <li>First Name: {data.first_name}</li>
        <li>Last Name: {data.last_name}</li>
      </ul>
      <Button colorScheme="green" onClick={() => dispatch({ type: 'refetch' })}>
        refetch
      </Button>
    </div>
  );
};

const Controls = () => {
  const [, setId] = useAtom(idAtom);
  return (
    <div>
      <Button colorScheme="gray" type="button" onClick={() => setId(c => c - 1)}>
        Prev
      </Button>
      <Button colorScheme="blue" type="button" onClick={() => setId(c => c + 1)}>
        Next
      </Button>
    </div>
  );
};

const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const setId = useSetAtom(idAtom);
  const dispatch = useSetAtom(userAtom);
  const retry = () => {
    setId(1);
    dispatch({ type: 'refetch', force: true });
    resetErrorBoundary();
  };
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <Button colorScheme="green" type="button" onClick={retry}>
        Try again
      </Button>
    </div>
  );
};

export const Root = () => (
  <ErrorBoundary FallbackComponent={Fallback}>
    <Controls />
    <UserData />
    <GenUserData />
  </ErrorBoundary>
);
