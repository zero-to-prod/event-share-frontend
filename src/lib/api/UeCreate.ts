import { post } from '$lib/api';
import { Routes } from '$lib/Routes';
import type { Ue } from '$lib/types';

export default async function UeCreate(body?: UeCreate): Promise<Ue> {
	return await post({ path: Routes.ues, body: body });
}

export interface UeCreate {
	name?: string;
}
