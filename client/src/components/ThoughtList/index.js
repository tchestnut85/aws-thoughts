import React from 'react';

const ThoughtList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
      thoughts.map((user, index) => (
        
        <div key={user.email} className="card mb-3">
          <p className="card-header">
            {user.username} {" "}
            </p>
            {user.thoughts[0]}
            

          </div>
      ))}
    </div>
  );
};

export default ThoughtList;


//       {thoughts &&
//         thoughts.map(user => (
//           <div key={thought._id} className="card mb-3">
//             <p className="card-header">
//               {user.username}
//               thought on {user.createdAt}
//             </p>
//             <div className="card-body">
//               <p>{thought.thoughtText}</p>
//               <p className="mb-0">
//                 Reactions: {thought.reactionCount} || Click to{' '}
//                 {thought.reactionCount ? 'see' : 'start'} the discussion!
//               </p>
//             </div>
//           </div>
//         ))}