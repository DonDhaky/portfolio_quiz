<script>
  export let titre = "Bienvenue sur mon Portfolio !";
  export let contenu = `Je suis passionné par la programmation, les jeux vidéo, le basketball et globalement toutes les nouvelles technologies. 
Ce site servira de vitrine, où j'exposerai ma vision sur la programmation et son avenir (de mon humble point de vue), avec l'apparition d'outils très puissants tels que Cursor, Manus, Canva AI. En effet, l'usage des l'IA générative dans le cadre de la programmation ne risque que d'augmenter et s'améliorer, pour le bonheur des entreprises et développeurs souhaitant gagner en productivité et rapidité, et le malheur des sceptiques.
Vous pourrez trouver également quelques quiz, jeux et projets que j'aurai fait moi-même !
Bonne visite et à bientôt !`;
</script>

<section class="blog-section">
  <h2>{titre}</h2>
  <p>{contenu}</p>
</section>

<style>
.blog-section {
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #2b662b;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 10%;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
.blog-section h2 {
  margin-top: 0;
  color: #00ff00;
  font-size: 1.5rem;
}
.blog-section p {
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
  line-height: 1.6;
}
</style> 