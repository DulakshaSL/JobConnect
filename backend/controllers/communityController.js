

const communityModel = require('../models/Community');

async function createPost(req, res) {
  try {
    const { content, mediaUrl, mediaType, anonymous, channelId } = req.body;
    
    if (!content || !mediaUrl || !mediaType || !channelId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const userId = req.session.jobSeekerId; // Retrieve user ID from session

    if (!userId) {
      return res.status(401).json({ message: 'User is not logged in' });
    }

    const postId = await communityModel.createPost(userId, content, mediaUrl, mediaType, anonymous, channelId);
    return res.status(201).json({ message: 'Post created successfully', postId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating post' });
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await communityModel.getAllPosts(); // Assuming this method is implemented in your model
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching posts' });
  }
}

// Get all posts with likes, comments, and shares
async function getFullPosts(req, res) {
  try {
    const posts = await communityModel.getFullPosts();
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching posts' });
  }
}

// Like a post
async function likePost(req, res) {
  try {
    const { postId } = req.params;
    const userId = req.session.jobSeekerId;

    if (!userId) {
      return res.status(401).json({ message: 'User is not logged in' });
    }

    await communityModel.likePost(postId, userId);
    return res.status(200).json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error liking post' });
  }
}

// Add comment to post
async function addComment(req, res) {
  try {
    const { postId } = req.params;
    const { commentText } = req.body;
    const userId = req.session.jobSeekerId;

    if (!userId) {
      return res.status(401).json({ message: 'User is not logged in' });
    }

    const commentId = await communityModel.addComment(postId, userId, commentText);
    return res.status(201).json({ message: 'Comment added successfully', commentId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error adding comment' });
  }
}

// Share a post
async function sharePost(req, res) {
  try {
    const { postId } = req.params;
    const userId = req.session.jobSeekerId;

    if (!userId) {
      return res.status(401).json({ message: 'User is not logged in' });
    }

    await communityModel.sharePost(postId, userId);
    return res.status(200).json({ message: 'Post shared successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error sharing post' });
  }
}

// Create a new channel
async function createChannel(req, res) {
  try {
    const { channelName } = req.body;
    const userId = req.session.jobSeekerId;

    if (!userId) {
      return res.status(401).json({ message: 'User is not logged in' });
    }

    const channelId = await communityModel.createChannel(userId, channelName);
    return res.status(201).json({ message: 'Channel created successfully', channelId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating channel' });
  }
}

// Follow a channel
async function followChannel(req, res) {
  try {
    const { channelId } = req.params;
    const userId = req.session.jobSeekerId;

    if (!userId) {
      return res.status(401).json({ message: 'User is not logged in' });
    }

    await communityModel.followChannel(channelId, userId);
    return res.status(200).json({ message: 'Channel followed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error following channel' });
  }
}

// Unfollow a channel
async function unfollowChannel(req, res) {
  try {
    const { channelId } = req.params;
    const userId = req.session.jobSeekerId;

    if (!userId) {
      return res.status(401).json({ message: 'User is not logged in' });
    }

    await communityModel.unfollowChannel(channelId, userId);
    return res.status(200).json({ message: 'Channel unfollowed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error unfollowing channel' });
  }
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
  unfollowChannel
};
