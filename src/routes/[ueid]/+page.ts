import type { PageLoad } from './$types';
import UeShow from '$lib/api/UeShow';

export const load = (({ params }) => {
	return UeShow({ id: params.ueid });
}) satisfies PageLoad;
