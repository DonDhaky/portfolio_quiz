<script>
  import { fade } from 'svelte/transition';
  
  export let question;
  export let onAnswer;
  
  let selectedAnswer = null;
  let isAnswered = false;
  
  function handleAnswer(index) {
    if (isAnswered) return;
    
    selectedAnswer = index;
    isAnswered = true;
    
    setTimeout(() => {
      onAnswer(index);
      selectedAnswer = null;
      isAnswered = false;
    }, 1500);
  }
</script>

<div class="question-card" in:fade={{ duration: 300 }}>
  <h2>{question.question}</h2>
  
  <div class="options">
    {#each question.options as option, index}
      <button
        class="option {selectedAnswer === index ? (index === question.correctAnswer ? 'correct' : 'wrong') : ''}"
        on:click={() => handleAnswer(index)}
        disabled={isAnswered}
      >
        {option}
      </button>
    {/each}
  </div>
</div>

<style>
  .question-card {
    background-color: #2a2a2a;
    padding: 2rem;
    border-radius: 8px;
    max-width: 600px;
    width: 90%;
    margin: 0 auto;
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    line-height: 1.5;
  }

  .options {
    display: grid;
    gap: 1rem;
  }

  .option {
    background-color: #3a3a3a;
    color: #00ff00;
    border: 2px solid #00ff00;
    padding: 1rem;
    font-family: 'Press Start 2P', monospace;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .option:hover:not(:disabled) {
    transform: scale(1.05);
  }

  .option:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .correct {
    background-color: #00ff00;
    color: #000;
    animation: blink 0.5s ease-in-out;
  }

  .wrong {
    background-color: #ff0000;
    color: #fff;
    animation: shake 0.5s ease-in-out;
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
</style> 