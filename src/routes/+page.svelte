<script lang="ts">
	import type { GetPingResponse } from '$lib/api/GetPing';

	export let data: GetPingResponse;
</script>

{data.message}
