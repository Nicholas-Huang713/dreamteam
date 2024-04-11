import React from 'react';
import backgroundImg from '../../images/bballbackground.jpg';

const About = () => {
    return (
        <div
            style={{ backgroundImage: `url(${backgroundImg})` }}
            className="bg-cover bg-fixed bg-center h-screen flex items-center overflow-hidden mb-[-20px] justify-center"
        >
            <div className="relative bg-opacity-70 bg-white w-full h-full min-h-screen flex flex-col justify-center items-center"
            // className="min-h-screen bg-gray-100 flex flex-col justify-center items-center"
            >
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">Welcome to DreamTeam </h1>
                    <p className="text-lg text-gray-700 mb-8">
                        There's always something new going on in the NBA. DreamTeam let's you stay up to date on the latest news around the league.
                    </p>
                    <p className="text-lg text-gray-700 mb-8">
                        Whether you're a diehard or casual fan, there's guaranteed to be something here for you.
                    </p>
                    <p className="text-lg text-gray-700 mb-8">
                        View team highlights, get updates on player injuries, and even build your own roster to see where you rank among the rest.
                    </p>
                </div>
            </div>
        </div >
    );
}

export default About;
