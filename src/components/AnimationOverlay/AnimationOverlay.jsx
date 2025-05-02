import React, { useEffect } from 'react';
import './AnimationOverlay.css';
import { characterEmojis, praises } from '../../data/hiraganaData';

const AnimationOverlay = ({ character, onClose }) => {
  // ランダムな絵文字と褒め言葉を選択
  const randomEmoji = characterEmojis[Math.floor(Math.random() * characterEmojis.length)];
  const randomPraise = praises[Math.floor(Math.random() * praises.length)];
  
  // 一定時間後に自動的に閉じる
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className="animation-overlay" onClick={onClose}>
      <div className="animation-content">
        <div className="big-character">{character.char}</div>
        <div className="animation-emoji">{randomEmoji}</div>
        <div className="animation-praise">{randomPraise}</div>
      </div>
    </div>
  );
};

export default AnimationOverlay; 