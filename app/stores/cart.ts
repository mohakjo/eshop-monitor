import type { Product } from "~/types/Product";

export const useCartStore = defineStore("cart", () => {
  type CartItem = Product & {
    quantity: number;
  };

  const cart = useCookie<CartItem[]>("cart", {
    default: () => [],
  });

  const totalItems = computed(() =>
    cart.value.reduce((total, item) => total + item.quantity, 0),
  );

  const totalCart = computed(() =>
    cart.value.reduce((total, item) => total + item.price * item.quantity, 0),
  );

  function addToCart(product: Product, quantity: number = 1) {
    const existingItem = cart.value.find((item) => item.id === product.id);

    if (existingItem) {
      cart.value = cart.value.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
    } else {
      cart.value = [...cart.value, { ...product, quantity }];
    }

    window.umami?.track("add_to_cart", {
      product_id: product.id,
      product_name: product.title,
      product_category: product.category,
      product_price: product.price,
    });
  }

  function changeQuantity(product: Product, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(product);
      return;
    }

    cart.value = cart.value.map((item) =>
      item.id === product.id ? { ...item, quantity } : item,
    );
  }

  function removeFromCart(product: Product) {
    cart.value = cart.value.filter((item) => item.id !== product.id);
  }

  function clearCart() {
    if (confirm("Voulez-vous vraiment vider votre panier ?")) {
      cart.value = [];
      navigateTo("/");
    }
  }

  function isInCart(productId: number) {
    return cart.value.some((item) => item.id === productId);
  }

  function getItem(productId: number) {
    return cart.value.find((item) => item.id === productId);
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
