import { Button } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { atomsWithInfiniteQuery } from 'jotai-tanstack-query';

const [postsAtom] = atomsWithInfiniteQuery(() => ({
  queryKey: ['posts'],
  queryFn: async ({ pageParam = 1 }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${pageParam}`);
    const data: { id: number; title: string } = await res.json();
    return data;
  },
  getNextPageParam: lastPage => lastPage.id + 1,
}));
export const Root = () => {
  const [data, dispatch] = useAtom(postsAtom);
  const handleFetchNextPage = () => dispatch({ type: 'fetchNextPage' });
  return (
    <>
      <Button onClick={handleFetchNextPage}>Next</Button>
      {data.pages.map((userData, index) => (
        <div key={index}>{JSON.stringify(userData)}</div>
      ))}
    </>
  );
};
