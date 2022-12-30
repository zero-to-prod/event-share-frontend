<script lang="ts">
	export let name: string | undefined = undefined;
	export let value: string | undefined;
	export let type = 'text';
	export let title: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let id: string | undefined = undefined;
	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}
</script>

<div>
	<label for={id} class="block hidden text-sm text-gray-700">{title}</label>
	<div class="mt-1">
		<input
			bind:value
			use:typeAction
			{name}
			{id}
			class="p-3 text-gray-700 border block w-full rounded-md shadow-sm sm:text-sm"
			{placeholder}
		/>
	</div>
</div>
