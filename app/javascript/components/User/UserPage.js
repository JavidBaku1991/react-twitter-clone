// filepath: /d:/react-twitter-clone/app/javascript/components/User/UserPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tweet from '../Feed/Tweet';

function UserPage({ match }) {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchUserTweets = async () => {
      const response = await axios.get(`/user/${match.params.username}`);
      setTweets(response.data);
    };
    fetchUserTweets();
  }, [match.params.username]);

  return (
    <div>
      <h1>{match.params.username}'s Tweets</h1>
      {tweets.map(tweet => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}

export default UserPage;