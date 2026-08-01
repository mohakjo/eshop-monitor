<script setup lang="ts">
	defineProps<{ product: Product }>();

	const cartStore = useCartStore();
</script>

<template>
	<div class="flex flex-col items-center justify-center border border-zinc-100 rounded p-8">
		<h2 class="mt-4">{{ product.name }}</h2>
		<button class="button mt-4" @click="cartStore.addToCart(product)">Ajouter au panier</button>
		<button class="button bg-red-700 mt-4" @click="cartStore.removeFromCart(product)">Retirer du panier</button>
	</div>
</template>
