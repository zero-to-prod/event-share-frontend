<script lang="ts">
	import type { Ue } from '$lib/types';

	export let data: Ue;
</script>

<ul>
	<li>Name: {data.name ?? ''}</li>
	<li>Time: {data.time ?? ''}</li>
	<li>Location: {data.location ?? ''}</li>
	<li>Description: {data.description ?? ''}</li>
</ul>
