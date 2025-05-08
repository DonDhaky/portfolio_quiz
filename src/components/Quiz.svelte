<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import questionsData from '../data/questions.json';
  import questionsBasketData from '../data/questions_basket.json';
  import questionsTechData from '../data/questions_tech.json';

  const dispatch = createEventDispatcher();

  export let quizType = 'games';
  let questions = [];
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 90;
  let timer;
  let showGameOver = false;
  let showAbandonButton = false;

  onMount(() => {
    loadQuestions();
    startTimer();
    showAbandonButton = true;
  });

  function loadQuestions() {
    switch(quizType) {
      case 'games':
        questions = questionsData.questions;
        break;
      case 'basketball':
        questions = questionsBasketData.questions;
        break;
      case 'tech':
        questions = questionsTechData.questions;
        break;
    }
  }

  function startTimer() {
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        endQuiz();
      }
    }, 1000);
  }

  function checkAnswer(selectedIndex) {
    if (selectedIndex === questions[currentQuestion].correctAnswer) {
      score++;
    }

    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
    } else {
      endQuiz();
    }
  }

  function endQuiz() {
    clearInterval(timer);
    const percentage = (score / questions.length) * 100;
    if (percentage < 50) {
      showGameOver = true;
    } else {
      dispatch('quizComplete', { score, total: questions.length, type: quizType });
    }
  }

  function abandonQuiz() {
    clearInterval(timer);
    dispatch('quizAbandoned');
  }
</script>

<div class="quiz-container" in:fade={{ duration: 500 }}>
  {#if showGameOver}
    <div class="game-over" in:fly={{ y: -50, duration: 500 }}>
      <h2>Game Over !</h2>
      <p>Score : {score}/{questions.length}</p>
      <p>Vous avez obtenu moins de 50% de bonnes réponses. Try again !</p>
      <button class="retry-button" on:click={() => window.location.reload()}>
        Réessayer
      </button>
    </div>
  {:else}
    <div class="header">
      <div class="timer">Temps restant : {timeLeft}s</div>
      {#if showAbandonButton}
        <button class="abandon-button" on:click={abandonQuiz}>
          Abandonner ?
        </button>
      {/if}
    </div>

    <div class="question-container">
      <h2>{questions[currentQuestion].question}</h2>
      <div class="options">
        {#each questions[currentQuestion].options as option, i}
          <button class="option" on:click={() => checkAnswer(i)}>
            {option}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .quiz-container {
    background-color: #2a2a2a;
    border: 3px solid #00ff00;
    border-radius: 10px;
    padding: 2rem;
    max-width: 800px;
    width: 90%;
    margin: 2rem auto;
    color: #00ff00;
    font-family: 'Press Start 2P', monospace;
    position: relative;
    z-index: 1;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .timer {
    font-size: 1.2rem;
    color: #00ff00;
  }

  .abandon-button {
    background-color: #ff0000;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    font-family: 'Press Start 2P', monospace;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .abandon-button:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
  }

  .question-container {
    text-align: center;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    line-height: 1.4;
  }

  .options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .option {
    background-color: #2a2a2a;
    color: #00ff00;
    border: 2px solid #00ff00;
    padding: 1rem;
    font-family: 'Press Start 2P', monospace;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .option:hover {
    background-color: #00ff00;
    color: #000;
    transform: scale(1.05);
  }

  .game-over {
    text-align: center;
    padding: 2rem;
  }

  .game-over h2 {
    color: #ff0000;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .retry-button {
    background-color: #00ff00;
    color: #000;
    border: none;
    padding: 1rem 2rem;
    font-family: 'Press Start 2P', monospace;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 1rem;
  }

  .retry-button:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
  }

  @media (max-width: 768px) {
    .options {
      grid-template-columns: 1fr;
    }

    h2 {
      font-size: 1.2rem;
    }

    .timer {
      font-size: 1rem;
    }
  }
</style> 