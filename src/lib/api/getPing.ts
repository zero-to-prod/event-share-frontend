import type { PingResponse } from '$lib/types';
import { get } from '$lib/api';
import { Routes } from '$lib/Routes';

export async function getPing() {
	const response: PingResponse = await get(Routes.ping);

	return response;
}
