import React, { useState, useEffect } from 'react';
import './HiraganaDisplay.css';
import CharacterItem from '../CharacterItem';
import AnimationOverlay from '../AnimationOverlay';
import ScoreBoard from '../ScoreBoard';
import { hiraganaGroups } from '../../data/hiraganaData';
import { playSound, playCorrectSound, playCheerSound, playStarSound } from '../../utils/soundPlayer';
import { triggerConfetti, triggerColorfulConfetti, triggerFireworks } from '../../utils/confettiEffect';

const HiraganaDisplay = () => {
  const [selectedChar, setSelectedChar] = useState(null);
  const [score, setScore] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(0);

  // 文字がクリックされたときの処理
  const handleCharacterClick = (character) => {
    // 文字の音声を再生
    playSound(character.char);
    
    // 選択された文字を設定
    setSelectedChar(character);
    
    // アニメーションを表示
    setShowAnimation(true);
    
    // スコアを増やす
    const newScore = score + 1;
    setScore(newScore);
    
    // 5の倍数のスコアでお祝いエフェクト
    if (newScore % 5 === 0) {
      // 星獲得時の音声を再生
      playStarSound();
      
      // スコアに応じて異なるエフェクト
      if (newScore % 15 === 0) {
        triggerFireworks();
        playCheerSound(); // 応援音声を再生
      } else if (newScore % 10 === 0) {
        triggerColorfulConfetti();
        playCheerSound(); // 応援音声を再生
      } else {
        triggerConfetti();
      }
    } else {
      // 通常時は正解音を再生
      playCorrectSound();
    }
  };

  // アニメーションを閉じる
  const closeAnimation = () => {
    setShowAnimation(false);
  };

  // 行を切り替える
  const changeGroup = (index) => {
    setCurrentGroup(index);
  };

  return (
    <div className="hiragana-display">
      <h1 className="title">ひらがなであそぼう！</h1>
      
      <ScoreBoard score={score} />
      
      <div className="group-tabs">
        {hiraganaGroups.map((group, index) => (
          <button 
            key={index}
            className={`group-tab ${currentGroup === index ? 'active' : ''}`}
            onClick={() => changeGroup(index)}
          >
            {group.name}
          </button>
        ))}
      </div>
      
      <div className="characters-grid">
        {hiraganaGroups[currentGroup].characters.map((char, index) => (
          <CharacterItem 
            key={index}
            character={char}
            onClick={handleCharacterClick}
          />
        ))}
      </div>
      
      {showAnimation && selectedChar && (
        <AnimationOverlay 
          character={selectedChar}
          onClose={closeAnimation}
        />
      )}
    </div>
  );
};

export default HiraganaDisplay; 