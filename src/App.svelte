<script>
  import StartScreen from './components/StartScreen.svelte';
  import Quiz from './components/Quiz.svelte';
  import FinalScreen from './components/FinalScreen.svelte';
  import BlogSection from './components/BlogSection.svelte';

  let currentScreen = 'start';
  let currentQuizType = 'games';
  let quizScore = { score: 0, total: 0, type: 'games' };

  function handleStartQuiz(event) {
    currentQuizType = event.type;
    currentScreen = 'quiz';
  }

  function handleQuizComplete(event) {
    quizScore = event.detail;
    currentScreen = 'final';
  }

  function handleQuizAbandoned() {
    currentScreen = 'start';
  }

  function handleRestart() {
    currentScreen = 'start';
  }
</script>

<main>
  <BlogSection />
  {#if currentScreen === 'start'}
    <StartScreen onStartQuiz={handleStartQuiz} />
  {:else if currentScreen === 'quiz'}
    <Quiz 
      quizType={currentQuizType} 
      on:quizComplete={handleQuizComplete}
      on:quizAbandoned={handleQuizAbandoned}
    />
  {:else if currentScreen === 'final'}
    <FinalScreen 
      quizScore={quizScore} 
      on:restart={handleRestart}
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
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  main {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    box-sizing: border-box;
  }
</style>
