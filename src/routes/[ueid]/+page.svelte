<script lang="ts">
  import type { Ue } from '$lib/types';

  export let data: Ue;
</script>

<div class="hero-bg py-10 ">
  <div class="max-w-4xl mx-auto text-white space-y-4">
    <h1 class="text-4xl text-center">{data.name}</h1>
    <h2 class="text-3xl text-center">{new Date(data.time).toDateString()}</h2>
    <p class="text-lg text-center">{data.description}</p>
  </div>
</div>
