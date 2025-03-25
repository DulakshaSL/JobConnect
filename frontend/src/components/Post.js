// components/Community/Post.js
import React from 'react';
import { likePost, commentOnPost, sharePost } from '../utils/api';

const Post = ({ post }) => {
  const handleLike = () => {
    likePost(post.id);
  };

  const handleComment = (commentText) => {
    commentOnPost(post.id, commentText);
  };

  const handleShare = () => {
    sharePost(post.id);
  };

  return (
    <div className="post">
      <div className="post-header">
        <span className="post-user">{post.isAnonymous ? 'Anonymous' : post.userName}</span>
        <span className="post-date">{post.createdAt}</span>
      </div>
      <div className="post-content">
        {post.mediaUrl && <img src={post.mediaUrl} alt="media" />}
        <p>{post.content}</p>
      </div>
      <div className="post-actions">
        <button onClick={handleLike}>Like</button>
        <button onClick={() => handleComment(prompt('Enter comment:'))}>Comment</button>
        <button onClick={handleShare}>Share</button>
      </div>
    </div>
  );
};

export default Post;
