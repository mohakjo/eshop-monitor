export default defineEventHandler((event) => {
	const token = getCookie(event, 'auth_token');
	if (!token) {
		// throw createError({ status: 401, statusMessage: 'Non autorisé' });
	}
});
