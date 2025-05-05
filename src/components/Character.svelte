<script>
  import { fade } from 'svelte/transition';
  
  export let mood = 'neutral'; // 'neutral', 'happy', 'sad'
  
  let characterClass = 'character';
  
  $: {
    characterClass = `character ${mood}`;
  }
</script>

<div class={characterClass} in:fade={{ duration: 300 }}>
  <div class="character-container">
    <div class="head">
      <div class="eyes">
        <div class="eye left"></div>
        <div class="eye right"></div>
      </div>
      <div class="mouth"></div>
    </div>
    <div class="body"></div>
  </div>
</div>

<style>
  .character {
    width: 150px;
    height: 200px;
    margin: 0 auto;
    position: relative;
  }

  .character-container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .head {
    width: 80px;
    height: 80px;
    background-color: #00ff00;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .eyes {
    position: absolute;
    top: 30px;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .eye {
    width: 15px;
    height: 15px;
    background-color: #000;
    border-radius: 50%;
  }

  .mouth {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 10px;
    background-color: #000;
    border-radius: 5px;
  }

  .body {
    width: 60px;
    height: 100px;
    background-color: #00ff00;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 10px;
  }

  /* Animations pour les différentes humeurs */
  .happy .mouth {
    height: 20px;
    border-radius: 0 0 15px 15px;
  }

  .happy .eyes {
    transform: translateY(-5px);
  }

  .sad .mouth {
    height: 5px;
    width: 20px;
    transform: translateX(-50%) rotate(180deg);
  }

  .sad .eyes {
    transform: translateY(5px);
  }

  /* Animation de saut pour les bonnes réponses */
  .happy {
    animation: jump 0.5s ease-in-out;
  }

  @keyframes jump {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  /* Animation de secouement pour les mauvaises réponses */
  .sad {
    animation: shake 0.5s ease-in-out;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
</style> 