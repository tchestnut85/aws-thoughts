import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';

const AWS = require("aws-sdk");
const awsConfig = {
  region: "us-east-2",
  endpoint: "http://localhost:8000",
};

AWS.config.update(awsConfig);

const Profile = props => {
  const { username: userParam } = useParams();

  // const [isLoaded, setIsLoaded] = useState(false);
  const [thoughts] = useState([{
    username: userParam, 
    createdAt: '1602003067054', 
    thought: 'Imagination, not knowledge is man\'s greatest gift'
  }]);

  useEffect( () => {
    const fetchData = () => {

    }
    fetchData();
  }, [thoughts])

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${thoughts[0].username}'s` : 'your'} profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList thoughts={thoughts} title={`${thoughts[0].username}'s thoughts...`} />
        </div>
      </div>
      <div className="mb-3"> <ThoughtForm name={userParam} /></div>
    </div>
  );
};

export default Profile;


// import FriendList from '../components/FriendList';

// import { useQuery, useMutation } from '@apollo/react-hooks';
// import { QUERY_USER, QUERY_ME } from '../utils/queries';
// import { ADD_FRIEND } from '../utils/mutations';
// import Auth from '../utils/auth';


  // redirect to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Redirect to="/profile" />;
  // }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!user?.username) {
  //   return (
  //     <h4>
  //       You need to be logged in to see this. Use the navigation links above to sign up or log in!
  //     </h4>
  //   );
  // }

  // const handleClick = async () => {
  //   try {
  //     await addFriend({
  //       variables: { id: user._id }
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
