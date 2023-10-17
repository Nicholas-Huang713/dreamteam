import { useState } from 'react';

const PlayerCard = ({ player, setOpenModal, children }) => {
    const handleModalOpen = () => {
        setOpenModal(player);
    };

    return (
        <div>
            <button
                className="bg-white shadow-md rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4 hover:opacity-75 transition duration-300 ease-in-out"
                onClick={handleModalOpen}
            >
                <img
                    src={player.nbaComHeadshot}
                    alt={player.bRefName}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                />
                <div className="p-4">
                    <h2 className="text-2xl font-semibold mb-2">{player.nbaComName}</h2>
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
            </button>
        </div>
    );
};

export default PlayerCard;
