<script lang="ts">
  export let items: Array<any> = [];
  export let initial = 0;
  let current = initial;

  function prev() {
    current = (current - 1 + items.length) % items.length;
  }
  function next() {
    current = (current + 1) % items.length;
  }
  function goTo(idx: number) {
    current = idx;
  }
</script>

<div class="carousel-outer">
  <div class="carousel">
    <button class="arrow left" onclick={prev} aria-label="Précédent">&#8592;</button>
    <div class="carousel-content">
      {#if items.length > 0}
        <slot name="slide" item={items[current]} current={current} />
      {/if}
    </div>
    <button class="arrow right" onclick={next} aria-label="Suivant">&#8594;</button>
  </div>
</div>
<div class="indicators">
  {#each items as _, idx}
    <button class:active={idx === current} onclick={() => goTo(idx)} aria-label={`Aller à la slide ${idx+1}`}></button>
  {/each}
</div>


<style>
.carousel-outer {
  position: relative;
  width: fit-content;
  margin: 0 auto;
}
.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: relative;
}
.carousel-content {
  min-width: 320px;
  max-width: 100vw;
  width: 100%;
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.arrow {
  background: none;
  border: none;
  color: #00ff00;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: color 0.2s;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}
.arrow.left {
  left: -4rem;
}
.arrow.right {
  right: -4rem;
}
.arrow:hover {
  color: #fff;
}
.indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}
.indicators button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #00ff00;
  background: transparent;
  cursor: pointer;
  transition: background 0.2s;
}
.indicators button.active, .indicators button:hover {
  background: #00ff00;
}
:global(.carousel-wrapper) {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style> 