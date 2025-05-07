<script>
  import { fade } from 'svelte/transition';

  function handleEmailClick() {
    window.location.href = 'mailto:erickthonon@gmail.com.com';
  }

  function handleDownloadCV() {
    window.open('https://dondhaky.github.io/portfolio_quiz/assets/cv.pdf', '_blank');
  }
</script>

<nav class="nav-bar">
  <button class="nav-button" on:click={handleDownloadCV}>
    Télécharger CV
  </button>
  <button class="nav-button" on:click={handleEmailClick}>
    Me Contacter
  </button>
</nav>

<div class="start-screen" in:fade={{ duration: 500 }}>
  <div class="quiz-container">
    <h1>Un brin d'histoire sur les jeux vidéo</h1>
    <p class="instructions">Vous avez 90 secondes. Bonne chance !</p>
    <button class="start-button" on:click>
      Démarrer le Quiz
    </button>
  </div>
</div>

<style>
  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    background-color: #2a2a2a;
    border-bottom: 2px solid #00ff00;
  }

  .nav-button {
    background-color: #2a2a2a;
    color: #00ff00;
    border: 2px solid #00ff00;
    padding: 0.5rem 1rem;
    margin-left: 1rem;
    font-family: 'Press Start 2P', monospace;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-button:hover {
    background-color: #00ff00;
    color: #2a2a2a;
    transform: scale(1.05);
  }

  .quiz-container {
    background-color: #2a2a2a;
    border: 3px solid #00ff00;
    border-radius: 10px;
    padding: 2rem;
    max-width: 800px;
    width: 90%;
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
    display: grid;
    grid-template-rows: auto auto auto;
    gap: 2rem;
    margin: 2rem;
  }

  .start-screen {
    display: grid;
    place-items: center;
    min-height: 100vh;
    background-color: #1a1a1a;
    color: #00ff00;
    font-family: 'Press Start 2P', monospace;
    text-align: center;
    padding: 2rem;
  }

  h1 {
    font-size: 2rem;
    margin: 0;
    text-shadow: 2px 2px #000;
    line-height: 1.4;
  }

  .instructions {
    font-size: 1rem;
    margin: 0;
    line-height: 1.5;
  }

  .start-button {
    background-color: #00ff00;
    color: #000;
    border: none;
    padding: 1rem 2rem;
    font-family: 'Press Start 2P', monospace;
    font-size: 1.2rem;
    cursor: pointer;
    transition: transform 0.2s;
    justify-self: center;
    width: fit-content;
  }

  .start-button:hover {
    transform: scale(1.1);
  }
</style> 