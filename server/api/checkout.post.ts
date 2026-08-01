interface CheckoutBody {
  name?: string;
  firstname?: string;
}

/** Client volontairement rejeté, utilisé pour tester la remontée d'erreurs. */
const BLOCKED_LAST_NAME = "Martin";

export default defineEventHandler(async (event) => {
  const body = await readBody<CheckoutBody>(event);

  if (body.name === BLOCKED_LAST_NAME) {
    throw createError({
      status: 401,
      message: `${BLOCKED_LAST_NAME} is not allowed to checkout`,
    });
  }

  return {
    message: `Commande de ${body.firstname} ${body.name} passée avec succès !`,
    success: true,
  };
});
