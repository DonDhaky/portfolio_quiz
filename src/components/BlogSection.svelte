<script>
  export let titre = "Bienvenue sur mon Portfolio !";
  export let contenu = `Je suis passionné par le développement web, les jeux vidéo et l'apprentissage continu. 
Ce site présente mes projets, mes compétences et quelques quiz ludiques pour tester vos connaissances !`;
</script>

<section class="blog-section">
  <h2>{titre}</h2>
  <p>{contenu}</p>
</section>

<style>
.blog-section {
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #00ff00;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
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