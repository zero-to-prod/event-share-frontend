import { get } from '$lib/api';
import { Routes } from '$lib/Routes';
import type { Ue } from '$lib/types';

export default async function UeShow({ id }: UeShow): Promise<Ue> {
  return await get({ path: `${Routes.ues}/${id}` });
}

export interface UeShow {
  id: string;
}
