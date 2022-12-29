import { post } from '$lib/api';
import { Routes } from '$lib/Routes';

export default async function UeCreate(body?: UeCreate) {
	return await post({ path: Routes.ues, body: body });
}
export type UeCreateResponse = {
	id: string;
	name?: string;
};

export interface UeCreate {
	name?: string;
}
