<script>
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import { scoreService } from '../services/scoreService';
  import { soundService } from '../services/soundService';
  
  const dispatch = createEventDispatcher();

  export let quizScore = { score: 0, total: 0, type: 'games' };

  function getQuizTitle() {
    switch(quizScore.type) {
      case 'games':
        return 'Quiz Jeux Vidéo';
      case 'basketball':
        return 'Quiz Basketball';
      case 'tech':
        return 'Quiz Technologies';
      default:
        return 'Quiz';
    }
  }

  function restart() {
    dispatch('restart');
  }

  let highScores = scoreService.getHighScores();
  let showNameInput = scoreService.isHighScore(quizScore.score);
  let playerName = '';
  
  function handleSubmit() {
    if (playerName.trim()) {
      scoreService.saveScore(playerName.trim(), quizScore.score);
      highScores = scoreService.getHighScores();
      showNameInput = false;
    }
  }
  
  function handleContact() {
    window.location.href = 'mailto:erickthonon@gmail.com';
  }
  
  function handleDownloadCV() {
    window.open('https://dondhaky.github.io/portfolio_quiz/assets/cv.pdf', '_blank');
  }
</script>

<div class="final-screen" in:fade={{ duration: 500 }}>
  <h1>Quiz Terminé !</h1>
  <h2>{getQuizTitle()}</h2>
  <div class="score-container">
    <p class="score">Score : {quizScore.score}/{quizScore.total}</p>
    <p class="percentage">
      {Math.round((quizScore.score / quizScore.total) * 100)}% de bonnes réponses
    </p>
  </div>
  
  {#if showNameInput}
    <div class="name-input">
      <p>Nouveau meilleur score !</p>
      <input
        type="text"
        bind:value={playerName}
        placeholder="Entrez votre nom"
        aria-label="Entrez votre nom pour le meilleur score"
        on:keydown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <button on:click={handleSubmit}>Enregistrer</button>
    </div>
  {/if}
  
  <div class="high-scores" role="region" aria-label="Meilleurs scores">
    <h2>Meilleurs Scores</h2>
    <ol>
      {#each highScores as { name, score, date }, i}
        <li>
          <span class="rank">{i + 1}.</span>
          <span class="name">{name}</span>
          <span class="score">{score}</span>
        </li>
      {/each}
    </ol>
  </div>
  
  <div class="actions">
    <button
      class="action-button"
      on:click={restart}
      on:mouseenter={() => soundService.playHover()}
      aria-label="Rejouer le quiz"
    >
      Rejouer
    </button>
    
    <button
      class="action-button"
      on:click={handleContact}
      on:mouseenter={() => soundService.playHover()}
      aria-label="Me contacter par email"
    >
      Contact
    </button>
    
    <button
      class="action-button"
      on:click={handleDownloadCV}
      on:mouseenter={() => soundService.playHover()}
      aria-label="Télécharger mon CV"
    >
      Télécharger CV
    </button>
  </div>
</div>

<style>
  .final-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #1a1a1a;
    color: #00ff00;
    font-family: 'Press Start 2P', monospace;
    text-align: center;
    padding: 2rem;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px #000;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: #00ff00;
  }

  .score-container {
    background-color: #2a2a2a;
    border: 3px solid #00ff00;
    border-radius: 10px;
    padding: 2rem;
    margin-bottom: 2rem;
  }

  .score {
    font-size: 2rem;
    margin: 0;
    margin-bottom: 1rem;
  }

  .percentage {
    font-size: 1.2rem;
    margin: 0;
    opacity: 0.8;
  }

  .name-input {
    margin-bottom: 2rem;
  }

  .name-input input {
    padding: 0.5rem;
    margin-right: 1rem;
    font-family: 'Press Start 2P', monospace;
    background-color: #2a2a2a;
    color: #00ff00;
    border: 2px solid #00ff00;
  }

  .high-scores {
    background-color: #2a2a2a;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 2rem;
  }

  .high-scores h2 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .high-scores ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .high-scores li {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    border-bottom: 1px solid #3a3a3a;
  }

  .actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .action-button {
    background-color: #00ff00;
    color: #000;
    border: none;
    padding: 1rem 2rem;
    font-family: 'Press Start 2P', monospace;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .action-button:hover {
    transform: scale(1.1);
  }

  .action-button:focus {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.2rem;
    }

    .score {
      font-size: 1.5rem;
    }

    .percentage {
      font-size: 1rem;
    }
  }
</style> 