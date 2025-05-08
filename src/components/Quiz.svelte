<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import questionsData from '../data/questions.json';
  import questionsBasketData from '../data/questions_basket.json';
  import questionsTechData from '../data/questions_tech.json';

  const dispatch = createEventDispatcher();
  const MAX_QUESTIONS = 20;
  const QUIZ_TIME = 120;

  export let quizType = 'games';
  let questions = [];
  let selectedQuestions = [];
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = QUIZ_TIME;
  let timer;
  let showGameOver = false;
  let showAbandonButton = false;
  let isLoading = true;
  let error = null;
  let showFeedback = false;
  let feedbackMessage = '';
  let feedbackType = '';
  let showAbandonConfirm = false;

  onMount(() => {
    try {
      loadQuestions();
      if (questions.length === 0) {
        error = "Impossible de charger les questions. Veuillez réessayer.";
        return;
      }
      selectRandomQuestions();
      startTimer();
      showAbandonButton = true;
      isLoading = false;
    } catch (e) {
      error = "Une erreur est survenue lors du chargement du quiz.";
      console.error(e);
    }
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
      default:
        throw new Error(`Type de quiz inconnu: ${quizType}`);
    }
  }

  function selectRandomQuestions() {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    selectedQuestions = shuffled.slice(0, MAX_QUESTIONS);
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
    const isCorrect = selectedIndex === selectedQuestions[currentQuestion].correctAnswer;
    feedbackType = isCorrect ? 'correct' : 'wrong';
    feedbackMessage = isCorrect ? 'Bien joué !' : 'Dommage !';
    showFeedback = true;

    if (isCorrect) {
      score++;
    }

    setTimeout(() => {
      showFeedback = false;
      if (currentQuestion < selectedQuestions.length - 1) {
        currentQuestion++;
      } else {
        endQuiz();
      }
    }, 1500);
  }

  function endQuiz() {
    clearInterval(timer);
    const percentage = (score / selectedQuestions.length) * 100;
    if (percentage < 50) {
      showGameOver = true;
    } else {
      dispatch('quizComplete', { score, total: selectedQuestions.length, type: quizType });
    }
  }

  function confirmAbandon() {
    showAbandonConfirm = true;
  }

  function cancelAbandon() {
    showAbandonConfirm = false;
  }

  function abandonQuiz() {
    clearInterval(timer);
    dispatch('quizAbandoned');
  }
</script>

<div class="quiz-container" in:fade={{ duration: 500 }}>
  {#if isLoading}
    <div class="loading">
      <p>Chargement du quiz...</p>
    </div>
  {:else if error}
    <div class="error">
      <p>{error}</p>
      <button class="retry-button" on:click={() => window.location.reload()}>
        Réessayer
      </button>
    </div>
  {:else if showGameOver}
    <div class="game-over" in:fly={{ y: -50, duration: 500 }}>
      <h2>Game Over !</h2>
      <p>Score : {score}/{selectedQuestions.length}</p>
      <p>Vous avez obtenu moins de 50% de bonnes réponses. Try again !</p>
      <button class="retry-button" on:click={() => window.location.reload()}>
        Réessayer
      </button>
    </div>
  {:else}
    <div class="header">
      <div class="timer">Temps restant : {timeLeft}s</div>
      {#if showAbandonButton}
        <button class="abandon-button" on:click={confirmAbandon}>
          Abandonner ?
        </button>
      {/if}
    </div>

    {#if showAbandonConfirm}
      <div class="confirm-dialog" in:fade>
        <p>Êtes-vous sûr de vouloir abandonner ?</p>
        <div class="confirm-buttons">
          <button class="confirm-button" on:click={abandonQuiz}>Oui, abandonner</button>
          <button class="cancel-button" on:click={cancelAbandon}>Non, continuer</button>
        </div>
      </div>
    {/if}

    <div class="question-container">
      <h2>{selectedQuestions[currentQuestion].question}</h2>
      {#if showFeedback}
        <div class="feedback" class:correct={feedbackType === 'correct'} class:wrong={feedbackType === 'wrong'}>
          {feedbackMessage}
        </div>
      {/if}
      <div class="options">
        {#each selectedQuestions[currentQuestion].options as option, i}
          <button 
            class="option" 
            class:correct={showFeedback && i === selectedQuestions[currentQuestion].correctAnswer}
            class:wrong={showFeedback && i !== selectedQuestions[currentQuestion].correctAnswer}
            on:click={() => checkAnswer(i)}
            disabled={showFeedback}
          >
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

  .option:hover:not(:disabled) {
    background-color: #00ff00;
    color: #000;
    transform: scale(1.05);
  }

  .option:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .option.correct {
    background-color: #00ff00;
    color: #000;
    animation: blink 0.5s ease-in-out;
  }

  .option.wrong {
    background-color: #ff0000;
    color: #fff;
    animation: shake 0.5s ease-in-out;
  }

  .feedback {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    animation: fadeIn 0.3s ease-in-out;
  }

  .feedback.correct {
    color: #00ff00;
  }

  .feedback.wrong {
    color: #ff0000;
  }

  .confirm-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #2a2a2a;
    border: 3px solid #00ff00;
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    z-index: 1000;
  }

  .confirm-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
  }

  .confirm-button, .cancel-button {
    padding: 0.5rem 1rem;
    font-family: 'Press Start 2P', monospace;
    font-size: 0.8rem;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
  }

  .confirm-button {
    background-color: #ff0000;
    color: white;
  }

  .cancel-button {
    background-color: #00ff00;
    color: black;
  }

  .confirm-button:hover, .cancel-button:hover {
    transform: scale(1.05);
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
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

    .confirm-dialog {
      width: 90%;
      max-width: 400px;
    }
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

  .loading, .error {
    text-align: center;
    padding: 2rem;
  }

  .error {
    color: #ff0000;
  }

  .error .retry-button {
    margin-top: 1rem;
  }
</style> 