import type { PageServerLoad } from './$types';
import UeShow from '$lib/api/UeShow';
export const ssr = true;
export const load = (({ params }) => {
  return UeShow({ id: params.ueid });
}) satisfies PageServerLoad;
