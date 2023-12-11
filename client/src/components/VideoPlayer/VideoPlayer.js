import React from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId }) => {
    const opts = {
        height: 'auto',
        // height: '315',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    return <YouTube videoId={videoId} opts={opts} />;
};

export default VideoPlayer;
