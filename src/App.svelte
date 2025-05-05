<script>
  import StartScreen from './components/StartScreen.svelte';
  import QuestionCard from './components/QuestionCard.svelte';
  import Timer from './components/Timer.svelte';
  import Character from './components/Character.svelte';
  import FinalScreen from './components/FinalScreen.svelte';
  import { soundService } from './services/soundService';
  import questionsData from './data/questions.json';

  let gameState = 'start'; // 'start', 'playing', 'finished'
  let currentQuestion = 0;
  let score = 0;
  let questions = [];
  let timeLeft = 15;
  let characterMood = 'neutral';

  function startQuiz() {
    questions = [...questionsData.questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    gameState = 'playing';
    currentQuestion = 0;
    score = 0;
    timeLeft = 15;
    characterMood = 'neutral';
    soundService.playTransition();
  }

  function handleAnswer(answerIndex) {
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      score++;
      characterMood = 'happy';
      soundService.playCorrect();
    } else {
      characterMood = 'sad';
      soundService.playWrong();
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        timeLeft = 15;
        characterMood = 'neutral';
        soundService.playTransition();
      } else {
        gameState = 'finished';
      }
    }, 1500);
  }

  function handleTimeUp() {
    characterMood = 'sad';
    soundService.playWrong();
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        timeLeft = 15;
        characterMood = 'neutral';
        soundService.playTransition();
      } else {
        gameState = 'finished';
      }
    }, 1500);
  }
</script>

<main>
  {#if gameState === 'start'}
    <StartScreen on:click={startQuiz} />
  {:else if gameState === 'playing'}
    <div class="game-container">
      <div class="game-header">
        <div class="score">Score: {score}</div>
        <div class="progress">Question {currentQuestion + 1} / {questions.length}</div>
        <Timer timeLeft={timeLeft} onTimeUp={handleTimeUp} />
      </div>
      
      <div class="game-content">
        <Character mood={characterMood} />
        <QuestionCard
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  {:else}
    <FinalScreen
      score={score}
      totalQuestions={questions.length}
      onRestart={startQuiz}
    />
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #1a1a1a;
    color: #00ff00;
    font-family: 'Press Start 2P', monospace;
  }

  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .game-container {
    width: 100%;
    max-width: 800px;
    padding: 2rem;
  }

  .game-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .score, .progress {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .game-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
</style>
