import { useState } from 'react';

const PlayerCard = ({ player, setOpenModal }) => {
    const handleModalOpen = () => {
        setOpenModal(player);
    };

    return (
        <>
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
                        {player.stats.pts === undefined || (player.stats.pts === '0.0' && player.stats.reb === '0.0') ?
                            <>Not Active</>
                            : <>
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
                            </>

                        }

                    </div>
                </div>
            </button>
        </>
    );
};

export default PlayerCard;
