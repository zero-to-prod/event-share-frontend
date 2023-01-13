<script>
  import '../app.css';
  import TopNav from '../components/top_nav/TopNav.svelte';
  import Footer from '../components/footer/Footer.svelte';
</script>

<svelte:head>
  <title>Event Share</title>
  <meta name="description" content="Create and Share Your Events" />
</svelte:head>
<TopNav />
<slot />
<Footer />
