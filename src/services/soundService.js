class SoundService {
  constructor() {
    this.sounds = {
      correct: new Audio('public/assets/sfx/correct.wav'),
      wrong: new Audio('public/assets/sfx/wrong.wav'),
      hover: new Audio('public/assets/sfx/hover.wav'),
      transition: new Audio('public/assets/sfx/transition.wav')
    };
    
    // Précharger les sons
    Object.values(this.sounds).forEach(sound => {
      sound.load();
    });
  }

  play(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].currentTime = 0;
      this.sounds[soundName].play();
    }
  }

  playHover() {
    this.play('hover');
  }

  playCorrect() {
    this.play('correct');
  }

  playWrong() {
    this.play('wrong');
  }

  playTransition() {
    this.play('transition');
  }
}

export const soundService = new SoundService(); 