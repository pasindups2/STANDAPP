import React, { useState, useEffect } from 'react';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const EMOJIS = ['🌸', '🌊', '🍃', '☀️', '🦋', '🐚', '🎵', '🌟'];

const MindGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    // Duplicate emojis to create pairs
    const pairs = [...EMOJIS, ...EMOJIS];
    // Fisher-Yates shuffle
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    
    setCards(pairs.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false
    })));
    setFlippedCards([]);
    setMoves(0);
    setWon(false);
  };

  const handleCardClick = (id: number) => {
    // Prevent clicking if 2 are already flipped or card is already matched/flipped
    if (flippedCards.length === 2) return;
    const clickedCard = cards.find(c => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    // Flip the card
    const newCards = cards.map(c => 
      c.id === id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);
    
    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    // Check match if 2 cards flipped
    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const [firstId, secondId] = newFlipped;
      const firstCard = newCards.find(c => c.id === firstId);
      const secondCard = newCards.find(c => c.id === secondId);

      if (firstCard?.emoji === secondCard?.emoji) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isMatched: true, isFlipped: true } 
              : c
          ));
          setFlippedCards([]);
          
          // Check win condition
          if (newCards.filter(c => !c.isMatched).length <= 2) {
            setWon(true);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isFlipped: false } 
              : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 lg:p-8 overflow-y-auto">
      <div className="text-center mb-8 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white/50 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">මනස සන්සුන් කිරීමේ ක්‍රීඩාව</h2>
        <p className="text-neutral-600">සමාන රූප ගලපන්න. (Moves: {moves})</p>
      </div>

      {won ? (
        <div className="flex flex-col items-center animate-fade-in bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-xl text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-brand-600 mb-2">ඉතා විශිෂ්ටයි!</h3>
          <p className="text-neutral-600 mb-6">ඔබේ මනස දැන් වඩාත් සන්සුන්ය.</p>
          <button 
            onClick={shuffleCards}
            className="px-8 py-3 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition font-bold shadow-lg shadow-brand-200"
          >
            නැවත කරන්න
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-lg w-full">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                aspect-square rounded-2xl text-3xl sm:text-4xl flex items-center justify-center transition-all duration-500 transform
                ${card.isFlipped || card.isMatched 
                  ? 'bg-white rotate-y-180 shadow-md border-2 border-brand-100' 
                  : 'bg-brand-500 hover:bg-brand-600 text-transparent shadow-lg rotate-0'}
              `}
              disabled={card.isMatched}
            >
              <span className={`transition-opacity duration-300 ${card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'}`}>
                {card.emoji}
              </span>
            </button>
          ))}
        </div>
      )}
      
      <div className="mt-8 text-neutral-700 font-medium text-sm bg-white/60 px-4 py-2 rounded-full backdrop-blur-sm">
        හුස්ම ගන්න... සෙමින් ක්‍රීඩා කරන්න.
      </div>
    </div>
  );
};

export default MindGame;