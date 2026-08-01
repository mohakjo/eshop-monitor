import type { CartItem, Product } from "~/types";

const CLEAR_CART_CONFIRMATION = "Voulez-vous vraiment vider votre panier ?";

export const useCartStore = defineStore("cart", () => {
  const { trackProduct } = useAnalytics();

  const cart = useCookie<CartItem[]>("cart", {
    default: () => [],
  });

  const totalItems = computed(() =>
    cart.value.reduce((total, item) => total + item.quantity, 0),
  );

  const totalCart = computed(() =>
    cart.value.reduce((total, item) => total + item.price * item.quantity, 0),
  );

  function getItem(productId: number) {
    return cart.value.find((item) => item.id === productId);
  }

  function isInCart(productId: number) {
    return Boolean(getItem(productId));
  }

  /** Réécrit la ligne du produit ciblé en repartant d'un nouveau tableau. */
  function replaceItem(
    productId: number,
    update: (item: CartItem) => CartItem,
  ) {
    cart.value = cart.value.map((item) =>
      item.id === productId ? update(item) : item,
    );
  }

  function addToCart(product: Product, quantity: number = 1) {
    if (isInCart(product.id)) {
      replaceItem(product.id, (item) => ({
        ...item,
        quantity: item.quantity + quantity,
      }));
    } else {
      cart.value = [...cart.value, { ...product, quantity }];
    }

    trackProduct(ANALYTICS_EVENTS.addToCart, product);
  }

  function changeQuantity(product: Product, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(product);
      return;
    }

    replaceItem(product.id, (item) => ({ ...item, quantity }));
  }

  function removeFromCart(product: Product) {
    cart.value = cart.value.filter((item) => item.id !== product.id);
  }

  function clearCart() {
    if (!confirm(CLEAR_CART_CONFIRMATION)) return;

    cart.value = [];
    navigateTo("/");
  }

  return {
    cart,
    totalItems,
    totalCart,
    addToCart,
    changeQuantity,
    removeFromCart,
    clearCart,
    isInCart,
    getItem,
  };
});
