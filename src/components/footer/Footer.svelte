<script>
  import FooterLink from './FooterLink.svelte';
  const year = new Date().getFullYear();
</script>

<footer>
  <div class="mx-auto max-w-7xl overflow-hidden py-20 px-6 sm:py-24 lg:px-8">
    <nav class="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
      <FooterLink href="/">Home</FooterLink>
    </nav>
    <p class="mt-10 text-center text-xs leading-5 text-gray-500">
      &copy; {year} EventShare. All rights reserved.
    </p>
  </div>
</footer>
