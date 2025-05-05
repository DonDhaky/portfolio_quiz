class ScoreService {
  constructor() {
    this.storageKey = 'quiz_high_scores';
    this.maxScores = 5;
  }

  getHighScores() {
    const scores = localStorage.getItem(this.storageKey);
    return scores ? JSON.parse(scores) : [];
  }

  saveScore(name, score) {
    const scores = this.getHighScores();
    scores.push({ name, score, date: new Date().toISOString() });
    
    // Trier par score décroissant et garder seulement les 5 meilleurs
    const sortedScores = scores.sort((a, b) => b.score - a.score).slice(0, this.maxScores);
    
    localStorage.setItem(this.storageKey, JSON.stringify(sortedScores));
    return sortedScores;
  }

  isHighScore(score) {
    const scores = this.getHighScores();
    return scores.length < this.maxScores || score > scores[scores.length - 1]?.score;
  }
}

export const scoreService = new ScoreService(); 