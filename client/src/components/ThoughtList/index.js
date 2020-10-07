import React from 'react';
import { Link } from 'react-router-dom';

const ThoughtList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
      thoughts.map((thought) => (
        <div key={thought.createdAt} className="card mb-3">
          <p className="card-header">
          <Link
                to={`/profile/${thought.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
            {thought.username}'s thought on {new Date(thought.createdAt).toString()}
            </Link>{' '}
            </p>
            <p className="px-2">
            {thought.thought}
            </p>

          </div>
      ))}
    </div>
  );
};

export default ThoughtList;
