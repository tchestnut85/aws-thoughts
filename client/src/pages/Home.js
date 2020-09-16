import React from 'react';
import ThoughtList from '../components/ThoughtList';

// import { useQuery } from '@apollo/react-hooks';
// import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  // const { loading, data } = useQuery(QUERY_THOUGHTS);
  // const thoughts = data?.thoughts || [];
  const thoughts = [
    {
      _id: 1,
      thoughtText: 'deep thoughts',
      createdAt: Date.now(),
      reactionCount: 4,
      username: 'Grep' 
    },
    {
      _id: 2,
      thoughtText: 'shallow thoughts',
      createdAt: Date.now(),
      reactionCount: 2,
      username: 'Groot' 
    }
  ];

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts = {thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
