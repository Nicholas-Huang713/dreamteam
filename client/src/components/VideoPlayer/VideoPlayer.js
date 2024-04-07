import React from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId }) => {
    const opts = {
        height: 'auto',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };

    return <YouTube videoId={videoId} opts={opts} />;
};

export default VideoPlayer;
