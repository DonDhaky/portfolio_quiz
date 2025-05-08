<script>
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handleEmailClick() {
    window.location.href = 'mailto:erickthonon@gmail.com';
  }

  function handleDownloadCV() {
    window.open('https://dondhaky.github.io/portfolio_quiz/assets/cv.pdf', '_blank');
  }

  function startQuiz(quizType) {
    dispatch('startQuiz', { type: quizType });
  }
</script>

<nav class="nav-bar">
  <div class="personal-info">
    <h2>Erick THONON</h2>
    <p>Développeur Web & Mobile</p>
  </div>
  <div class="personal-speech">
    <p>Disponible pour vos projets d'apps mobiles FlutterFlow</p>
  </div>
  <div class="nav-buttons">
    <button class="start-button" on:click={handleDownloadCV}>
      Télécharger mon CV
    </button>
    <button class="start-button" on:click={handleEmailClick}>
      Me Contacter
    </button>
  </div>
</nav>

<div class="start-screen" in:fade={{ duration: 500 }}>
  <h1 class="section-title">Les Quizz</h1>
  <div class="quizzes-grid">
    <div class="quiz-container">
      <h1>Un brin d'histoire sur les jeux vidéo</h1>
      <p class="instructions">Fan de gaming ? Prouvez-le !</p>
      <button class="start-button" on:click={() => startQuiz('games')}>
        Démarrer le Quiz
      </button>
    </div>

    <div class="quiz-container">
      <h1>L'évolution des nouvelles technologies</h1>
      <p class="instructions">"Oh non, l'IA c'est nul, un dev qui utilise l'IA n'est pas un bon dev..."</p>
      <button class="start-button" on:click={() => startQuiz('tech')}>
        Démarrer le Quiz
      </button>
    </div>

    <div class="quiz-container">
      <h1>L'histoire du basketball</h1>
      <p class="instructions">Grand fan de basketball, montrez moi que vous n'êtes pas un "basketix" !</p>
      <button class="start-button" on:click={() => startQuiz('basketball')}>
        Démarrer le Quiz
      </button>
    </div>
  </div>
</div>

<style>
  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #2a2a2a;
    border-bottom: 2px solid #00ff00;
    z-index: 1000;
  }

  .personal-info {
    color: #00ff00;
    font-family: 'Press Start 2P', monospace;
  }

  .personal-info h2 {
    font-size: 2rem;
    margin: 0;
    margin-bottom: 0.5rem;
  }

  .personal-info p {
    font-size: 1rem;
    margin: 0;
    opacity: 0.8;
  }

  .personal-speech p {
    font-size: 1.5rem;
    margin: 0;
  }

  .nav-buttons {
    display: flex;
    gap: 1rem;
  }

  .quizzes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    width: 100%;
    max-width: 1200px;
    padding: 1rem;
  }

  .quiz-container {
    background-color: #2a2a2a;
    border: 3px solid #00ff00;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
    display: grid;
    grid-template-rows: auto auto auto;
    gap: 2rem;
    transition: transform 0.3s ease;
  }

  .quiz-container:hover {
    transform: translateY(-5px);
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
    padding-top: 8rem;
  }

  h1 {
    font-size: 1.5rem;
    margin: 0;
    text-shadow: 2px 2px #000;
    line-height: 1.4;
  }

  .instructions {
    font-size: 0.8rem;
    margin: 0;
    line-height: 1.5;
  }

  .start-button {
    background-color: #00ff00;
    color: #000;
    border: none;
    padding: 1rem 2rem;
    font-family: 'Press Start 2P', monospace;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    justify-self: center;
    width: fit-content;
  }

  .start-button:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-align: center;
    color: #00ff00;
    text-shadow: 2px 2px #000;
    position: relative;
    padding-bottom: 0.5rem;
  }

  .section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 3px;
    background-color: #00ff00;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }

  @media (max-width: 768px) {
    .quizzes-grid {
      grid-template-columns: 1fr;
    }

    .nav-bar {
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }

    .personal-info {
      text-align: center;
    }

    .nav-buttons {
      width: 100%;
      justify-content: center;
    }

    .section-title {
      font-size: 2rem;
    }

    .section-title::after {
      width: 150px;
    }
  }
</style> 