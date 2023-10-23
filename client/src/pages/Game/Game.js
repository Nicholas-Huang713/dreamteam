import React, { useState } from 'react';

const Game = () => {
    const [score, setScore] = useState(0);

    const handleShoot = () => {
        // Simulate a shot and check if it goes through the hoop
        const isGoal = Math.random() < 0.5;
        if (isGoal) {
            setScore(score + 1);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">Basketball Shooting Game</h1>
            <p className="text-xl">Score: {score}</p>
            <div className="court bg-green-500 w-96 h-56 relative">
                <div className="hoop bg-red-500 w-24 h-4 absolute top-24 left-50 text-white text-center leading-8 cursor-pointer" onClick={handleShoot}>
                    Shoot
                </div>
            </div>
        </div>
    );
};

export default Game;
