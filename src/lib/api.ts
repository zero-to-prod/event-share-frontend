import { env } from '$env/dynamic/public';
import type { Routes } from '$lib/Routes';
import { error } from '@sveltejs/kit';

interface SendParams {
	method: RequestInit['method'];
	path: Routes;
	body?: object | null | undefined;
}

async function send({ method, path, body }: SendParams) {
	const init: RequestInit = { method };
	if (body) {
		init.headers = { 'Content-Type': 'application/json' };
		init.body = JSON.stringify(body);
	}
	const [res] = await Promise.all([fetch(`${env.PUBLIC_API}/${path}`, init)]);
	if (res.ok || res.status === 422) {
		const text = await res.text();
		return text ? JSON.parse(text) : {};
	}

	throw error(res.status);
}

export function get(params: GetParams) {
	return send({ method: 'GET', ...params });
}

export function post(params: PostParams) {
	return send({ method: 'POST', ...params });
}

export interface GetParams {
	path: Routes;
}

export interface PostParams {
	path: Routes;
	body: SendParams['body'];
}
