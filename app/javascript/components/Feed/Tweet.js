// filepath: /d:/react-twitter-clone/app/javascript/components/Feed/Tweet.js
import React from 'react';
import { Link } from 'react-router-dom';

function Tweet({ tweet }) {
  return (
    <div>
      <Link to={`/${tweet.user.username}`}>{tweet.user.username}</Link>
      <p>{tweet.content}</p>
    </div>
  );
}

export default Tweet;