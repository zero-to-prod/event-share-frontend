<script lang="ts">
  import type { Ue } from '$lib/types';
  export let data: Ue;
  const { name, time, description } = data;
</script>

<div class="hero-bg py-10 ">
  <div class="max-w-4xl mx-auto text-white space-y-4">
    <h2 class="text-4xl text-center">{name}</h2>
    {#if time}
      <h2 class="text-3xl text-center">{new Date(time).toDateString()}</h2>
    {/if}
    {#if description}
      <p class="text-lg text-center">{description}</p>
    {/if}
  </div>
</div>
