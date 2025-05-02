// 音声を再生する関数（Web Speech API使用バージョン）
export const playSound = (character) => {
  try {
    // Web Speech APIを使用して音声合成
    const utterance = new SpeechSynthesisUtterance(character);
    utterance.lang = 'ja-JP'; // 日本語に設定
    utterance.volume = 1.0;   // 音量（0.0〜1.0）
    utterance.rate = 0.8;     // 速度（0.1〜10.0、デフォルトは1）
    utterance.pitch = 1.2;    // 音程（0〜2、デフォルトは1）
    
    // 音声合成を実行
    window.speechSynthesis.speak(utterance);
    
    // コンソールにも表示
    console.log(`「${character}」の音声を再生します`);
  } catch (error) {
    console.error('音声の再生に失敗しました:', error);
  }
};

// 効果音を再生する関数（代替バージョン）
export const playEffect = (effectName) => {
  try {
    // 簡易的な効果音をブラウザのAudio Context APIで生成
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // 効果音の種類によって音を変える
    switch (effectName) {
      case 'click':
        oscillator.type = 'sine';
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.1;
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start();
        setTimeout(() => oscillator.stop(), 100);
        break;
      case 'correct':
        oscillator.type = 'sine';
        oscillator.frequency.value = 1200;
        gainNode.gain.value = 0.1;
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start();
        setTimeout(() => {
          oscillator.frequency.value = 1600;
          setTimeout(() => oscillator.stop(), 150);
        }, 150);
        break;
      case 'cheer':
      case 'star':
        // 複数の音を重ねる
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        osc1.type = 'triangle';
        osc2.type = 'sine';
        osc1.frequency.value = 800;
        osc2.frequency.value = 1200;
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.gain.value = 0.1;
        gainNode.connect(audioContext.destination);
        osc1.start();
        osc2.start();
        setTimeout(() => {
          osc1.frequency.value = 1000;
          osc2.frequency.value = 1500;
          setTimeout(() => {
            osc1.stop();
            osc2.stop();
          }, 200);
        }, 200);
        break;
      default:
        console.log(`効果音「${effectName}」を再生します`);
    }
  } catch (error) {
    console.error('効果音の再生に失敗しました:', error);
  }
};

// 正解時の音声と効果音を再生
export const playCorrectSound = () => {
  playEffect('correct');
};

// 達成時の音声を再生
export const playCheerSound = () => {
  playEffect('cheer');
};

// 星獲得時の音声を再生
export const playStarSound = () => {
  playEffect('star');
}; 