const pool = require('../config/db'); // Import the MySQL connection pool

async function createPost(userId, content, media_Url, media_Type, anonymous, channel_Id) {
  console.log('SQL Values:', userId, content, media_Url, media_Type, anonymous, channel_Id); // Log SQL parameters
  
  const [result] = await pool.query(
    `INSERT INTO Posts (user_id, content, media_type, media_url, anonymous, channel_id, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())`,
    [userId, content, media_Type, media_Url, anonymous, channel_Id]
  );
  return result.insertId;
}

// In models/Community.js
async function getAllPosts() {
  const [posts] = await pool.query('SELECT * FROM Posts');
  return posts;
}

// Fetch all posts with likes, comments, shares, and media details
async function getFullPosts() {
  const [posts] = await pool.query(
   `SELECT p.post_id, p.user_id, p.content, p.media_url, p.media_type, p.anonymous, p.channel_id, p.created_at, 
            (SELECT COUNT(*) FROM Likes WHERE post_id = p.post_id) AS like_count,
            (SELECT COUNT(*) FROM Comments WHERE post_id = p.post_id) AS comment_count,
            (SELECT COUNT(*) FROM Shares WHERE post_id = p.post_id) AS share_count
     FROM Posts p
     ORDER BY p.created_at DESC`
  );

  // Get all comments for each post
  const [comments] = await pool.query(
    `SELECT c.post_id, c.user_id, c.comment_text, c.created_at
     FROM Comments c
     ORDER BY c.created_at ASC`
  );

  // Map comments to each post
  const postMap = posts.map(post => {
    return {
      ...post,
      comments: comments.filter(comment => comment.post_id === post.post_id)
    };
  });

  return postMap;
}

// Like a post
async function likePost(postId, userId) {
  await pool.query(
    `INSERT INTO Likes (post_id, user_id, created_at) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE created_at = NOW()`,
    [postId, userId]
  );
}

// Comment on a post
async function addComment(postId, userId, commentText) {
  const [result] = await pool.query(
    `INSERT INTO Comments (post_id, user_id, comment_text, created_at) VALUES (?, ?, ?, NOW())`,
    [postId, userId, commentText]
  );
  return result.insertId;
}

// Share a post
async function sharePost(postId, userId) {
  const [result] = await pool.query(
    `INSERT INTO Shares (post_id, user_id, created_at) VALUES (?, ?, NOW())`,
    [postId, userId]
  );
  return result.insertId;
}

// Create a channel
async function createChannel(userId, channelName) {
  const [result] = await pool.query(
    `INSERT INTO Channels (channel_name, created_by, created_at) VALUES (?, ?, NOW())`,
    [channelName, userId]
  );
  return result.insertId;
}

// Follow a channel
async function followChannel(channelId, userId) {
  await pool.query(
    `INSERT INTO ChannelFollowers (user_id, channel_id, followed_at) VALUES (?, ?, NOW())`,
    [userId, channelId]
  );
}

// Unfollow a channel
async function unfollowChannel(channelId, userId) {
  await pool.query(
    `DELETE FROM ChannelFollowers WHERE channel_id = ? AND user_id = ?`,
    [channelId, userId]
  );
}

// Fetch user's followed channels
async function getFollowedChannels(userId) {
  const [channels] = await pool.query(
    `SELECT c.* FROM Channels c JOIN ChannelFollowers cf ON c.channel_id = cf.channel_id WHERE cf.user_id = ?`,
    [userId]
  );
  return channels;
}

module.exports = {
  createPost,
  getAllPosts,
  getFullPosts,
  likePost,
  addComment,
  sharePost,
  createChannel,
  followChannel,
  unfollowChannel,
  getFollowedChannels
};
