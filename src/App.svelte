<script>
  import StartScreen from './components/StartScreen.svelte';
  import Quiz from './components/Quiz.svelte';
  import FinalScreen from './components/FinalScreen.svelte';
  import { onMount } from 'svelte';

  let currentScreen = 'start';
  let currentQuizType = 'games';
  let quizScore = { score: 0, total: 0, type: 'games' };

  onMount(() => {
    window.addEventListener('startQuiz', handleStartQuiz);
    window.addEventListener('quizComplete', handleQuizComplete);
    window.addEventListener('quizAbandoned', handleQuizAbandoned);
  });

  function handleStartQuiz(event) {
    currentQuizType = event.detail.type;
    currentScreen = 'quiz';
  }

  function handleQuizComplete(event) {
    quizScore = {
      score: event.detail.score,
      total: event.detail.total,
      type: event.detail.type
    };
    currentScreen = 'final';
  }

  function handleQuizAbandoned() {
    currentScreen = 'start';
  }

  function restartQuiz() {
    currentScreen = 'start';
  }
</script>

<main>
  {#if currentScreen === 'start'}
    <StartScreen />
  {:else if currentScreen === 'quiz'}
    <Quiz quizType={currentQuizType} />
  {:else if currentScreen === 'final'}
    <FinalScreen {quizScore} onRestart={restartQuiz} />
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #1a1a1a;
  }

  main {
    min-height: 100vh;
    background-color: #1a1a1a;
    font-family: 'Press Start 2P', monospace;
    position: relative;
    z-index: 0;
  }
</style>
