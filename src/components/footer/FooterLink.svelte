<script lang="ts">
  export let href: string | undefined;
</script>

<div class="pb-6">
  <a {href} class="text-sm leading-6 text-gray-600 hover:text-gray-900"><slot /></a>
</div>
