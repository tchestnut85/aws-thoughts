import React from 'react';

const ThoughtList = ({title}) => {
// props:  { thoughts, title }

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

  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map(thought => (
          <div key={thought._id} className="card mb-3">
            <p className="card-header">
              {thought.username}
              thought on {thought.createdAt}
            </p>
            <div className="card-body">
              <p>{thought.thoughtText}</p>
              <p className="mb-0">
                Reactions: {thought.reactionCount} || Click to{' '}
                {thought.reactionCount ? 'see' : 'start'} the discussion!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
