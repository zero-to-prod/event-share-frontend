<script lang="ts">
	import type { UeCreateResponse } from '$lib/api/UeCreate';
	import UeCreate from '$lib/api/UeCreate';

	let name: string;

	let data: UeCreateResponse;

	async function onSubmit() {
		data = await UeCreate({ name });
	}
</script>

<form on:submit|preventDefault={onSubmit}>
	<label>
		Name
		<input bind:value={name} name="name" />
	</label>
	<button type="submit">Create</button>
</form>

{#if data}
	{data.name}
	{data.id}
{/if}
