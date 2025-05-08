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

<main class="start-screen" in:fade={{ duration: 500 }}>
  <div class="content-wrapper">
    <h1 class="section-title">Les Quizz</h1>
    <div class="quizzes-grid">
      <div class="quiz-container">
        <h2>Un brin d'histoire sur les jeux vidéo</h2>
        <p class="instructions">Fan de gaming ? Prouvez-le !</p>
        <button class="start-button" on:click={() => startQuiz('games')}>
          Démarrer le Quiz
        </button>
      </div>

      <div class="quiz-container">
        <h2>L'évolution des nouvelles technologies</h2>
        <p class="instructions">"Oh non, l'IA c'est nul, un dev qui utilise l'IA n'est pas un bon dev..."</p>
        <button class="start-button" on:click={() => startQuiz('tech')}>
          Démarrer le Quiz
        </button>
      </div>

      <div class="quiz-container">
        <h2>L'histoire du basketball</h2>
        <p class="instructions">Grand fan de basketball, montrez moi que vous n'êtes pas un "basketix" !</p>
        <button class="start-button" on:click={() => startQuiz('basketball')}>
          Démarrer le Quiz
        </button>
      </div>
    </div>
  </div>
</main>

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

  .start-screen {
    min-height: 100vh;
    background-color: #1a1a1a;
    color: #00ff00;
    font-family: 'Press Start 2P', monospace;
    padding-top: 8rem;
  }

  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .section-title {
    font-size: 2.5rem;
    text-align: center;
    color: #00ff00;
    text-shadow: 2px 2px #000;
    margin: 0;
    padding: 0;
  }

  .section-title::after {
    content: '';
    display: block;
    width: 200px;
    height: 3px;
    background-color: #00ff00;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
    margin: 0.5rem auto 1rem;
    margin-bottom: 2rem;
  }

  .quizzes-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    width: 100%;
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

  .quiz-container h2 {
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

  @media (max-width: 768px) {
    .quizzes-grid {
      grid-template-columns: 1fr;
      margin-top: 5rem;
    }

    .nav-bar {
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }

    .personal-info {
      text-align: center;
    }

    .personal-speech {
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