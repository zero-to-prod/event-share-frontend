<script lang="ts">
	import UeCreate from '$lib/api/UeCreate';
	import type { Ue } from '$lib/types';
	import { page } from '$app/stores';

	let name: Ue['name'];
	let time: Ue['time'] = new Date().toISOString().split('T')[0]; // 2005-06-07
	let location: Ue['location'];
	let description: Ue['description'];
	let data: Ue;

	async function onSubmit() {
		data = await UeCreate({ name, time, location, description });
	}
</script>

<div class="py-10 bg-gradient-to-r from-violet-500 to-fuchsia-500">
	<div class="m-auto grid m-4 p-4 bg-gray-800 sm:w-1/3 rounded-md">
		<h1 class="text-white text-2xl mb-4">Create an Event</h1>
		<form on:submit|preventDefault={onSubmit} class="grid gap-4">
			<label>
				<input bind:value={name} name="name" placeholder="Event name" />
			</label>
			<label>
				<input bind:value={time} name="time" type="date" />
			</label>
			<label>
				<textarea bind:value={description} name="description" placeholder="Add a description" />
			</label>
			<div class="flex flex-row-reverse">
				<button type="submit" class="create-link"
					><span
						><svg
							class="h-4 mr-1.5 fill-gray-800"
							focusable="false"
							aria-hidden="true"
							viewBox="2 5 20 12"
							><path
								d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
							/></svg
						></span
					>Create Link</button
				>
			</div>
		</form>
	</div>

	{#if data}
		<div class="grid gap-2">
			<a data-sveltekit-preload-data="hover" href={`/${data.id}`}>View Event</a>
			<div class="flex">
				<div class="flex-1 rounded bg-gray-100">
					<label class="grid text-sm">
						<span class="pt-1 pl-1"> Link to event </span>
						<input
							value={`${$page.url}${data.id}`}
							class="border-b-2 bg-gray-100 p-1 focus:border-b-2 focus:border-blue-500 focus:outline-0"
						/>
					</label>
				</div>
				<div class="">
					<div class="flex p-3 align-middle">
						<button
							class="items-center rounded-md bg-white px-3 py-2 text-sm font-medium leading-4 text-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Copy</button
						>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	label {
		@apply mt-1;
	}
	input,
	textarea {
		@apply block w-full rounded-md p-2 text-lg text-gray-700 focus:border-fuchsia-500 focus:outline-0 focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-gray-800 focus:ring-offset-2;
	}
	.create-link {
		@apply inline-flex rounded-md items-center border border-transparent bg-fuchsia-600 px-4 py-3.5 font-medium leading-4 text-white shadow-sm hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-gray-800 focus:ring-offset-2;
	}
</style>
