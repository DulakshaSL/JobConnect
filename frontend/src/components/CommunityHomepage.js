import React, { useState, useEffect } from 'react';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);

  // Sample posts data (you can fetch this from an API)
  const fetchPosts = async () => {
    // Simulate fetching posts from API
    const response = await fetch('http://localhost:5000/api/community/post');
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const likePost = (postId) => {
    // Like post logic
    console.log(`Post ${postId} liked`);
  };

  const commentPost = (postId) => {
    // Comment post logic (prompt for input)
    const comment = prompt('Enter your comment:');
    console.log(`Comment on Post ${postId}: ${comment}`);
  };

  const sharePost = (postId) => {
    // Share post logic
    console.log(`Post ${postId} shared`);
  };

  return (
    <div className="post-feed-container">
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <div className="post-header">
            <div className="user-info">
              <img
                src={post.userAvatar}
                alt="User Avatar"
                className="user-avatar"
              />
              <span className="user-name">{post.userName}</span>
            </div>
            <span className="post-time">{post.time}</span>
          </div>

          <div className="post-content">
            <p>{post.content}</p>
            {post.mediaUrl && post.mediaType === 'image' && (
              <img src={post.mediaUrl} alt="Post media" className="post-media" />
            )}
            {post.mediaUrl && post.mediaType === 'video' && (
              <video
                src={post.mediaUrl}
                controls
                className="post-media"
              ></video>
            )}
          </div>

          <div className="post-footer">
            <button onClick={() => likePost(post.id)} className="like-btn">
              Like
            </button>
            <button onClick={() => commentPost(post.id)} className="comment-btn">
              Comment
            </button>
            <button onClick={() => sharePost(post.id)} className="share-btn">
              Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostFeed;
