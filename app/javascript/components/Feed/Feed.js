// filepath: /d:/react-twitter-clone/app/javascript/components/Feed/Feed.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tweet from './Tweet';

function Feed() {
  const [tweets, setTweets] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await axios.get('/tweets');
      setTweets(response.data);
    };
    fetchTweets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/tweets', { content }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTweets([response.data, ...tweets]);
      setContent('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's happening?" />
        <button type="submit">Tweet</button>
      </form>
      {tweets.map(tweet => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}

export default Feed;