// components/Community/Channel.js
import React, { useState } from 'react';
import { followChannel, unfollowChannel } from '../utils/api';

const Channel = ({ channel }) => {
  const [isFollowed, setIsFollowed] = useState(channel.isFollowed);

  const handleFollow = () => {
    followChannel(channel.id).then(() => setIsFollowed(true));
  };

  const handleUnfollow = () => {
    unfollowChannel(channel.id).then(() => setIsFollowed(false));
  };

  return (
    <div className="channel">
      <div className="channel-header">
        <span className="channel-name">{channel.name}</span>
        <span className="channel-description">{channel.description}</span>
      </div>
      <div className="channel-actions">
        {isFollowed ? (
          <button onClick={handleUnfollow}>Unfollow</button>
        ) : (
          <button onClick={handleFollow}>Follow</button>
        )}
      </div>
    </div>
  );
};

export default Channel;
