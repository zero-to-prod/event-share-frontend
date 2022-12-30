import { env } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';

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
	path: string;
}

export interface PostParams {
	path: string;
	body: SendParams['body'];
}

interface SendParams {
	method: RequestInit['method'];
	path: string;
	body?: object | null | undefined;
}
