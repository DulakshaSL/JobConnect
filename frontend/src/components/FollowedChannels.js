// components/Community/FollowedChannels.js
import React, { useState, useEffect } from 'react';
import Channel from './Channel';
import { getFollowedChannels } from '../utils/api';

const FollowedChannels = () => {
  const [followedChannels, setFollowedChannels] = useState([]);

  useEffect(() => {
    getFollowedChannels().then(response => {
      setFollowedChannels(response.data.channels);
    });
  }, []);

  return (
    <div className="followed-channels">
      {followedChannels.length > 0 ? (
        followedChannels.map(channel => <Channel key={channel.id} channel={channel} />)
      ) : (
        <p>No followed channels.</p>
      )}
    </div>
  );
};

export default FollowedChannels;
