'use client';

import Link from 'next/link';

export default function Games() {
  const games = [
                    {
                  id: 1,
                  title: "Memory Match",
                  description: "Test your memory by matching pairs of cards. Find all pairs to complete the game!",
                  thumbnail: "/images/memorymatch.png",
                  playUrl: "/games/memory-match"
                },
                {
                  id: 2,
                  title: "10 Queens Puzzle",
                  description: "Place 10 queens on a 10x10 board following chess rules and colored section constraints. A challenging logic puzzle!",
                  thumbnail: "/images/queen.png",
                  playUrl: "/games/ten-queens-puzzle"
                }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Games & Interactive Projects</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore a collection of fun games and interactive projects I&apos;ve built. 
          Click on any game to start playing!
        </p>
      </div>

      {/* Games List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Available Games</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {games.map((game) => (
            <div 
              key={game.id} 
              className="block hover:bg-gray-50 transition-colors"
            >
              <div className="px-6 py-4 flex items-center space-x-4">
                {/* Game Thumbnail and Info - Clickable for Play */}
                <Link 
                  href={game.playUrl}
                  className="flex items-center space-x-4 flex-1 min-w-0"
                >
                                                 <div className="flex-shrink-0">
                                 <div className="w-20 h-20 rounded-lg overflow-hidden">
                                   <img 
                                     src={game.thumbnail} 
                                     alt={`${game.title} thumbnail`}
                                     className="w-full h-full object-cover"
                                   />
                                 </div>
                               </div>
                  
                  {/* Game Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{game.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{game.description}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 