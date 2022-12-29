import { get } from '$lib/api';
import { Routes } from '$lib/Routes';

export default async function GetPing() {
	return await get(Routes.ping);
}
export type GetPingResponse = {
	message: string;
};
