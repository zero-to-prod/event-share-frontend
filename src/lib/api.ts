import { env } from '$env/dynamic/public';
import type { Routes } from '$lib/Routes';
import { error } from '@sveltejs/kit';

async function send(method: RequestInit['method'], endpoint: string) {
	const init = { method, headers: {} };
	const [res] = await Promise.all([fetch(`${env.PUBLIC_API}/${endpoint}`, init)]);
	if (res.ok || res.status === 422) {
		const text = await res.text();
		return text ? JSON.parse(text) : {};
	}

	throw error(res.status);
}

export function get(path: Routes) {
	return send('GET', path);
}
