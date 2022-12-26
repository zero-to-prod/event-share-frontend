<script lang="ts">
  import { GetUser } from "$lib/gql/generated";

  $: user = GetUser({});
</script>

{#if !$user.data.user?.name}
  Loading...
{/if}
{#if $user.data.user?.name}
  {$user.data.user?.name}
{/if}
