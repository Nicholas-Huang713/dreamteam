import React from 'react';
import AddPlayerButton from '../../components/AddPlayerButton/AddPlayerButton';

const PlayerProfile = ({ player }) => {

    return (
        <div className="container mx-auto p-4">
            <div className="w-full mb-2 relative">
                <div className='absolute right-0 top-0'>
                    <AddPlayerButton player={player} />
                </div>
                <img src={player.nbaComHeadshot} alt={player.nbaComName} className="w-full" />
            </div>
            <h2 className="text-2xl text-center font-semibold mb-2">{player.nbaComName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                <div className="w-full sm:w-1/2">
                    <h1 className="text-2xl font-bold">{player.name}</h1>
                    <p>Team: {player.team}</p>
                    <p>Position: {player.pos}</p>
                    <p>#: {player.jerseyNum}</p>
                    <p>Height: {player.height}</p>
                    <p>Weight: {player.weight} lbs</p>
                    <p>College: {player.college}</p>
                </div>
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Player Stats</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                        <p>PTS: {player.stats.pts}</p>
                    </div>
                    <div>
                        <p>REB: {player.stats.reb}</p>
                    </div>
                    <div>
                        <p>AST: {player.stats.ast}</p>
                    </div>
                    <div>
                        <p>STL: {player.stats.stl}</p>
                    </div>
                    <div>
                        <p>BLK: {player.stats.blk}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerProfile;
