export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	if (body.name === 'Martin') {
		throw createError({
			status: 401,
			message: 'Martin is not allowed to checkout',
		});
	}

	return {
		message: `Commande de ${body.firstname} ${body.name} passée avec succès !`,
		success: true,
	};
});
