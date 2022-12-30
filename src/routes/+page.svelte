<script lang="ts">
	import UeCreate from '$lib/api/UeCreate';
	import type { Ue } from '$lib/types';

	let name: Ue['name'];
	let time: Ue['time'];
	let location: Ue['location'];
	let description: Ue['description'];
	let data: Ue;

	async function onSubmit() {
		data = await UeCreate({ name, time, location, description });
	}
</script>

<form on:submit|preventDefault={onSubmit}>
	<label>
		Name
		<input bind:value={name} />
	</label>
	<label>
		Date
		<input bind:value={time} type="datetime-local" />
	</label>
	<label>
		Location
		<input bind:value={location} />
	</label>
	<label>
		Description
		<textarea bind:value={description} />
	</label>
	<button type="submit">Create</button>
</form>

{#if data}
	<br />
	<a data-sveltekit-preload-data="hover" href={`/${data.id}`}>View Event</a>
{/if}
