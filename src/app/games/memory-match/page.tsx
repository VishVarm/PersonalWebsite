'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const initializeGame = useCallback(() => {
    const symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    const gameCards = [...symbols, ...symbols].map((symbol, index) => ({
      id: index,
      value: symbol,
      isFlipped: false,
      isMatched: false,
    }));
    
    // Shuffle cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }
    
    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setGameWon(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || cards[cardId].isMatched || cards[cardId].isFlipped) {
      return;
    }

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      if (cards[newFlippedCards[0]].value === cards[newFlippedCards[1]].value) {
        // Match found
        newCards[newFlippedCards[0]].isMatched = true;
        newCards[newFlippedCards[1]].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);
        
        // Check if game is won
        if (newCards.every(card => card.isMatched)) {
          setGameWon(true);
        }
      } else {
        // No match, flip cards back after delay
        setTimeout(() => {
          newCards[newFlippedCards[0]].isFlipped = false;
          newCards[newFlippedCards[1]].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Memory Match</h1>
        <div className="flex justify-center items-center gap-6 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">Moves</p>
            <p className="text-2xl font-bold text-blue-600">{moves}</p>
          </div>
          <button
            onClick={initializeGame}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            New Game
          </button>
          <Link
            href="/games"
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Games
          </Link>
        </div>
      </div>

      {/* Rules */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-3">How to Play</h2>
        <div className="text-blue-800 space-y-2">
          <p>• Click on cards to flip them and reveal their symbols</p>
          <p>• Find matching pairs of the same symbol</p>
          <p>• Match all pairs to win the game</p>
          <p>• Try to complete the game with as few moves as possible!</p>
        </div>
      </div>

      {/* Game Board */}
      <div className="flex justify-center mb-8">
        <div className="grid grid-cols-4 gap-3">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`w-20 h-20 rounded-lg border-2 transition-all duration-300 transform ${
                card.isFlipped || card.isMatched
                  ? 'bg-white border-blue-500 scale-100'
                  : 'bg-blue-500 border-blue-600 hover:bg-blue-600 hover:scale-105'
              } ${card.isMatched ? 'opacity-75' : ''}`}
              disabled={card.isMatched}
            >
              <span className={`text-2xl ${card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'}`}>
                {card.value}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Win Message */}
      {gameWon && (
        <div className="text-center mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-900 mb-2">🎉 Congratulations! 🎉</h2>
            <p className="text-green-800 mb-4">You&apos;ve completed the game in {moves} moves!</p>
            <button
              onClick={initializeGame}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 