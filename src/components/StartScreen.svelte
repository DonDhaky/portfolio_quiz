<script>
  import { fade } from 'svelte/transition';
</script>

<div class="start-screen" in:fade={{ duration: 500 }}>
  <h1>Quiz Histoire des Jeux Vidéo</h1>
  <p class="instructions">Vous avez 15 secondes par question. Bonne chance !</p>
  <button class="start-button" on:click>
    Démarrer le Quiz
  </button>
</div>

<style>
  .start-screen {
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
    font-size: 2rem;
    margin-bottom: 2rem;
    text-shadow: 2px 2px #000;
  }

  .instructions {
    font-size: 1rem;
    margin-bottom: 3rem;
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
  }

  .start-button:hover {
    transform: scale(1.1);
  }
</style> 