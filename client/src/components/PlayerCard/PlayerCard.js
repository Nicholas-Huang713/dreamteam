import { useState } from 'react';

const PlayerCard = ({ player }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
            <img
                src={player.espnHeadshot}
                alt={player.bRefName}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">{player.bRefName}</h2>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <span className="text-gray-600">Pts:</span>{' '}
                        <span className="font-semibold">{player.stats.pts}</span>
                    </div>
                    <div>
                        <span className="text-gray-600">Reb:</span>{' '}
                        <span className="font-semibold">{player.stats.reb}</span>
                    </div>
                    <div>
                        <span className="text-gray-600">Ast:</span>{' '}
                        <span className="font-semibold">{player.stats.ast}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;
