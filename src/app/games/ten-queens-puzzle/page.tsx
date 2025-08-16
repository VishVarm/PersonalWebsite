'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type CellState = 'empty' | 'x' | 'queen';
type CellColor = number; // 0-9 for different colored sections

interface Cell {
  state: CellState;
  color: CellColor;
  isWrong: boolean;
}

export default function TenQueensPuzzle() {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const colors = [
    'bg-red-300', 'bg-blue-300', 'bg-green-300', 'bg-yellow-300', 
    'bg-purple-300', 'bg-pink-300', 'bg-indigo-300', 'bg-teal-300',
    'bg-orange-300', 'bg-cyan-300'
  ];

  // Load a random valid 10-queens solution from the JSON file
  // This file contains all 30,410 valid solutions to the 10-queens problem
  const generateSolution = async (): Promise<number[][]> => {
    try {
      const response = await fetch('/10-queens-solutions.json');
      const solutions = await response.json();
      
      // Select a random solution from the 30,410 available solutions
      const randomIndex = Math.floor(Math.random() * solutions.length);
      return solutions[randomIndex];
    } catch (error) {
      console.error('Error loading solutions:', error);
      // Fallback to a known valid solution if JSON loading fails
      return [
        [0, 0], [1, 2], [2, 4], [3, 6], [4, 8],
        [5, 1], [6, 3], [7, 5], [8, 7], [9, 9]
      ];
    }
  };

  // Generate colored sections around the solution positions (but don't place queens)
  const generateColoredSections = (queens: number[][]): Cell[][] => {
    const newBoard: Cell[][] = Array(10).fill(null).map(() => 
      Array(10).fill(null).map(() => ({
        state: 'empty',
        color: -1, // -1 means unassigned
        isWrong: false
      }))
    );

    // Assign colors to sections based on solution positions (but don't place queens)
    queens.forEach(([row, col], index) => {
      newBoard[row][col].color = index;
    });

    // Create contiguous colored sections for each queen
    queens.forEach(([queenRow, queenCol], colorIndex) => {
      const sectionSize = Math.floor(Math.random() * 4) + 3; // 3-6 cells per section
      const sectionCells: [number, number][] = [[queenRow, queenCol]];
      
      // Generate random directions for section expansion (only horizontal and vertical)
      const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1] // up, down, left, right only
      ];
      
      // Shuffle directions for randomness
      for (let i = directions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [directions[i], directions[j]] = [directions[j], directions[i]];
      }

      // Expand section in random directions
      let attempts = 0;
      const maxAttempts = 50;
      
      while (sectionCells.length < sectionSize && attempts < maxAttempts) {
        // Pick a random cell from current section to expand from
        const expandFrom = sectionCells[Math.floor(Math.random() * sectionCells.length)];
        const [expandRow, expandCol] = expandFrom;
        
        // Try each direction
        for (const [dr, dc] of directions) {
          const newRow = expandRow + dr;
          const newCol = expandCol + dc;
          
          if (newRow >= 0 && newRow < 10 && 
              newCol >= 0 && newCol < 10 && 
              newBoard[newRow][newCol].color === -1) {
            
            newBoard[newRow][newCol].color = colorIndex;
            sectionCells.push([newRow, newCol]);
            break;
          }
        }
        attempts++;
      }
    });

    // Fill remaining unassigned cells with random colors from existing sections
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (newBoard[row][col].color === -1) {
          // Find the nearest colored section
          let minDistance = Infinity;
          let nearestColor = 0;
          
          for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
              if (newBoard[r][c].color !== -1) {
                const distance = Math.abs(row - r) + Math.abs(col - c);
                if (distance < minDistance) {
                  minDistance = distance;
                  nearestColor = newBoard[r][c].color;
                }
              }
            }
          }
          
          newBoard[row][col].color = nearestColor;
        }
      }
    }

    return newBoard;
  };

  // Initialize game
  useEffect(() => {
    const initGame = async () => {
      setIsLoading(true);
      const newSolution = await generateSolution();
      setSolution(newSolution);
      const newBoard = generateColoredSections(newSolution);
      setBoard(newBoard);
      setGameWon(false);
      setIsLoading(false);
    };
    
    initGame();
  }, []);

  // Check if a queen placement is valid
  const isValidPlacement = (row: number, col: number): boolean => {
    // Check if there's already a queen in the same row, column, or color section
    for (let r = 0; r < 10; r++) {
      if (r !== row && board[r][col].state === 'queen') return false;
    }
    for (let c = 0; c < 10; c++) {
      if (c !== col && board[row][c].state === 'queen') return false;
    }
    
    const currentColor = board[row][col].color;
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        if ((r !== row || c !== col) && 
            board[r][c].color === currentColor && 
            board[r][c].state === 'queen') {
          return false;
        }
      }
    }
    
    return true;
  };

  // Check all queen placements and mark conflicts
  const checkAllQueenConflicts = (currentBoard: Cell[][]) => {
    const newBoard = [...currentBoard];
    
    // Reset all wrong flags first
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (newBoard[row][col].state === 'queen') {
          newBoard[row][col].isWrong = false;
        }
      }
    }
    
    // Check each queen for conflicts
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (newBoard[row][col].state === 'queen') {
          // Check row conflicts
          for (let r = 0; r < 10; r++) {
            if (r !== row && newBoard[r][col].state === 'queen') {
              newBoard[row][col].isWrong = true;
              newBoard[r][col].isWrong = true;
            }
          }
          
          // Check column conflicts
          for (let c = 0; c < 10; c++) {
            if (c !== col && newBoard[row][c].state === 'queen') {
              newBoard[row][col].isWrong = true;
              newBoard[row][c].isWrong = true;
            }
          }
          
          // Check diagonal conflicts
          for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
              if ((r !== row || c !== col) && 
                  newBoard[r][c].state === 'queen') {
                // Check if queens are diagonally adjacent
                const rowDiff = Math.abs(row - r);
                const colDiff = Math.abs(col - c);
                if (rowDiff === 1 && colDiff === 1) {
                  newBoard[row][col].isWrong = true;
                  newBoard[r][c].isWrong = true;
                }
              }
            }
          }
          
          // Check color section conflicts
          const currentColor = newBoard[row][col].color;
          for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
              if ((r !== row || c !== col) && 
                  newBoard[r][c].color === currentColor && 
                  newBoard[r][c].state === 'queen') {
                newBoard[row][col].isWrong = true;
                newBoard[r][c].isWrong = true;
              }
            }
          }
        }
      }
    }
    
    return newBoard;
  };

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    // Allow clicking on any cell

    const newBoard = [...board];
    
    if (newBoard[row][col].state === 'empty') {
      newBoard[row][col].state = 'x';
    } else if (newBoard[row][col].state === 'x') {
      newBoard[row][col].state = 'queen';
    } else if (newBoard[row][col].state === 'queen') {
      newBoard[row][col].state = 'empty';
    }

    // Check all queen conflicts after any state change
    const updatedBoard = checkAllQueenConflicts(newBoard);
    setBoard(updatedBoard);
    checkWinCondition(updatedBoard);
  };

  // Check if the game is won
  const checkWinCondition = (currentBoard: Cell[][]) => {
    // Check if user has placed 10 non-conflicting queens
    if (checkValidSolution(currentBoard)) {
      setGameWon(true);
    }
  };

  // Reset game
  const resetGame = async () => {
    setIsLoading(true);
    const newSolution = await generateSolution();
    setSolution(newSolution);
    const newBoard = generateColoredSections(newSolution);
    setBoard(newBoard);
    setGameWon(false);
    setIsLoading(false);
  };

  // Check if user has placed 10 non-conflicting queens
  const checkValidSolution = (currentBoard: Cell[][]) => {
    let queenCount = 0;
    let hasConflicts = false;
    
    // Count queens and check for conflicts
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (currentBoard[row][col].state === 'queen') {
          queenCount++;
          if (currentBoard[row][col].isWrong) {
            hasConflicts = true;
          }
        }
      }
    }
    
    // Win condition: exactly 10 queens with no conflicts
    return queenCount === 10 && !hasConflicts;
  };

  // Clear user's changes and return to default board
  const clearBoard = () => {
    const newBoard = [...board];
    
        // Reset all user-placed queens and X's back to empty
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        newBoard[row][col].state = 'empty';
        newBoard[row][col].isWrong = false;
      }
    }
    
    // Clear all conflict flags
    const updatedBoard = checkAllQueenConflicts(newBoard);
    setBoard(updatedBoard);
    setGameWon(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">10 Queens Puzzle</h1>
      </div>

      {/* Rules */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-3">How to Play</h2>
        <div className="text-blue-800 space-y-2">
          <p>• Place 10 queens on the board following these rules:</p>
          <p>• Only 1 queen per row and column</p>
          <p>• Queens cannot be diagonally adjacent</p>
          <p>• Only 1 queen per colored section</p>
          <p>• Click any square to place an &apos;X&apos;, click &apos;X&apos; to place a queen</p>
          <p>• Click a queen to remove it</p>
          <p>• Conflicting queens show a red ! instead of 👑</p>
          <p>• Place 10 non-conflicting queens to win!</p>
        </div>
      </div>

      {/* Game Controls */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-6 mb-6">
          <button
            onClick={() => resetGame()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            disabled={gameWon}
          >
            New Game
          </button>
          <button
            onClick={clearBoard}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            disabled={gameWon}
          >
            Clear Board
          </button>
          <Link
            href="/games"
            className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Games
          </Link>
        </div>
      </div>

      {/* Game Board */}
      {isLoading ? (
        <div className="flex justify-center mb-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading puzzle...</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-10 gap-1 border-2 border-gray-300 bg-gray-300 p-1">
            {board.map((row, rowIndex) => 
              row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`w-12 h-12 border border-gray-400 flex items-center justify-center text-lg font-bold transition-all ${
                    colors[Math.max(0, cell.color)]
                  } ${
                    gameWon
                      ? 'cursor-not-allowed' 
                      : 'cursor-pointer hover:opacity-80'
                  }`}
                  disabled={gameWon}
                >
                                                    {cell.state === 'queen' ? 
                    (cell.isWrong ? <span className="text-red-600 text-2xl font-bold">!</span> : '👑') : 
                   cell.state === 'x' ? '❌' : ''}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Win Message */}
      {gameWon && (
        <div className="text-center mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-900 mb-2">🎉 Congratulations! 🎉</h2>
            <p className="text-green-800 mb-4">You&apos;ve solved the 10 Queens puzzle!</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              New Puzzle
            </button>
          </div>
        </div>
      )}

      {/* Game Info */}
      <div className="text-center">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Game Information</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium">Game Board</p>
              <p>Start with an empty board</p>
            </div>
            <div>
              <p className="font-medium">Your Queens</p>
              <p>Place queens in valid positions</p>
            </div>
            <div>
              <p className="font-medium">Colored Sections</p>
              <p>Only 1 queen per color section</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 