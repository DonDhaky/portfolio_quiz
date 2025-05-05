<script>
  import { onMount, onDestroy } from 'svelte';
  
  export let timeLeft = 15;
  export let onTimeUp;
  
  let interval;
  
  onMount(() => {
    interval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(interval);
        onTimeUp();
      }
    }, 1000);
  });
  
  onDestroy(() => {
    if (interval) {
      clearInterval(interval);
    }
  });
</script>

<div class="timer">
  <div class="time" class:warning={timeLeft <= 5}>
    {timeLeft}
  </div>
</div>

<style>
  .timer {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .time {
    color: #00ff00;
    font-family: 'Press Start 2P', monospace;
  }

  .warning {
    color: #ff0000;
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
</style> 