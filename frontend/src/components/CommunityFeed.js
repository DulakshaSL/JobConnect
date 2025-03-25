// components/Community/CommunityFeed.js
import React, { useState, useEffect } from 'react';
import Post from './Post';
import { createPost } from '../utils/api';

const CommunityFeed = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostMediaUrl, setNewPostMediaUrl] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    // Fetch posts from API
    // For demonstration, replace with an actual fetch call
    setPosts([{ id: 1, userName: 'John Doe', content: 'This is a post', createdAt: '2024-11-11', mediaUrl: '', isAnonymous: false }]);
  }, []);

  const handleCreatePost = () => {
    createPost(newPostContent, newPostMediaUrl, isAnonymous)
      .then(response => {
        setPosts([response.data.post, ...posts]); // Update with new post
        setNewPostContent('');
        setNewPostMediaUrl('');
      })
      .catch(error => console.error('Error creating post:', error));
  };

  return (
    <div className="community-feed">
      <div className="create-post">
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Write a new post..."
        />
        <input
          type="text"
          value={newPostMediaUrl}
          onChange={(e) => setNewPostMediaUrl(e.target.value)}
          placeholder="Media URL (optional)"
        />
        <label>
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
          />
          Post anonymously
        </label>
        <button onClick={handleCreatePost}>Post</button>
      </div>
      
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default CommunityFeed;
