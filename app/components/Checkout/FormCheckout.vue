<script setup>
	const checkout = ref({
		name: '',
		firstname: '',
		email: '',
		phone: '',
		billingAddress: {},
		shippingAddress: {},
		shipToDifferentAddress: false,
	});

	const router = useRouter();
	const errorForm = ref(null);

	// const onSubmit = async () => {
	// 	const { data, error } = await useFetch('/api/checkout', {
	// 		method: 'POST',
	// 		body: JSON.stringify(checkout.value),
	// 	});

	// 	if (data.value?.success) {
	// 		await router.push('/success');
	// 	}

	// 	if (error.value) {
	// 		errorForm.value = error.value.data.message;
	// 	}
	// };

	const onSubmit = async () => {
		try {
			const { data } = await $fetch('/api/checkout', {
				method: 'POST',
				body: JSON.stringify(checkout.value),
			});
			await router.push('/success');
		} catch (error) {
			errorForm.value = error.data.message;
		}
	};
</script>
<template>
	<form @submit.prevent="onSubmit()" class="my-8">
		<h1>Votre commande</h1>
		<p v-if="errorForm" class="bg-red-500 rounded w-fit px-2 text-red-100">
			{{ errorForm }}
		</p>
		<div class="grid grid-cols-2 gap-4">
			<div>
				<label for="name">Nom</label>
				<input id="name" type="text" required v-model="checkout.name" />
			</div>
			<div>
				<label for="firstname">Prénom</label>
				<input id="firstname" type="text" required v-model="checkout.firstname" />
			</div>
		</div>
		<div>
			<label for="email">Email</label>
			<input id="email" type="email" required v-model="checkout.email" />
		</div>
		<CheckoutFormBilling v-model:address="checkout.billingAddress" v-model:phone="checkout.phone" />
		<div>
			<input type="checkbox" id="ship-to-different-address" v-model="checkout.shipToDifferentAddress" />
			<label for="ship-to-different-address"> Expédier à une adresse différente </label>
		</div>
		<CheckoutFormShipping v-if="checkout.shipToDifferentAddress" v-model="checkout.shippingAddress" />
		<input type="submit" value="Passer ma commande" />
	</form>
</template>
