import React from 'react';
import './CharacterItem.css';
import { characterEmojis } from '../../data/hiraganaData';

const CharacterItem = ({ character, onClick }) => {
  // ランダムな絵文字を選択
  const randomEmoji = characterEmojis[Math.floor(Math.random() * characterEmojis.length)];
  
  return (
    <div 
      className="character-item"
      onClick={() => onClick(character)}
    >
      <div className="character-main">{character.char}</div>
      <div className="character-emoji">{randomEmoji}</div>
    </div>
  );
};

export default CharacterItem; 