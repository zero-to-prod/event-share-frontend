import GetPing from '$lib/api/GetPing';

export const load = async () => {
	return GetPing();
};
