const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

// Post routes
router.post('/post', communityController.createPost);
router.get('/allposts', communityController.getAllPosts); // Route to get all post
router.get('/fullposts', communityController.getFullPosts);
router.post('/post/:postId/like', communityController.likePost);
router.post('/post/:postId/comment', communityController.addComment);
router.post('/post/:postId/share', communityController.sharePost);

// Channel routes
router.post('/channel', communityController.createChannel);
router.post('/channel/:channelId/follow', communityController.followChannel);
router.post('/channel/:channelId/unfollow', communityController.unfollowChannel);

module.exports = router;
