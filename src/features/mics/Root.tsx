import { atom, useAtom } from 'jotai';
import { atomsWithInfiniteQuery } from 'jotai-tanstack-query';

const idAtom = atom(3);
const [userAtom] = atomsWithInfiniteQuery(get => ({
  queryKey: ['users', get(idAtom)],
  queryFn: async ({ queryKey: [, id] }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    return res.json();
  },
  // infinite queries can support paginated fetching
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
}));

export const Root = () => {
  const [data] = useAtom(userAtom);
  return (
    <>
      {data.pages.map((userData, index) => (
        <div key={index}>{JSON.stringify(userData)}</div>
      ))}
    </>
  );
};
