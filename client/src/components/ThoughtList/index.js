import React from 'react';

const ThoughtList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
      thoughts.map((user) => (
        
        <div key={user.createdAt} className="card mb-3">
          <p className="card-header">
            {user.username}'s thought on {new Date(user.createdAt).toString()}
            </p>
            <p className="px-2">
            {user.thought}
            </p>

          </div>
      ))}
    </div>
  );
};

export default ThoughtList;
