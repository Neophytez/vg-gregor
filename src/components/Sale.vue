<template>
    <Cart v-if="IsActiveComponent('Cart')"></Cart>
    <Purchase v-if="IsActiveComponent('Purchase')"></Purchase>
    <ThankYou v-if="IsActiveComponent('ThankYou')"></ThankYou>
</template>

<script>
import Purchase from "./Sale/Purchase.vue";
import Cart from "./Sale/Cart.vue";
import {provide, ref} from "vue";
import ThankYou from "./Sale/ThankYou.vue";

export default {
    name: "Sale",
    components: {ThankYou, Purchase, Cart},
    setup() {
        const active_component = ref("Cart");
        function IsActiveComponent(name) {
            return name === active_component.value;
        }

        function ChangeActiveComponent(component) {
            active_component.value = component;
        }

        provide('ChangeActiveComponentSale', ChangeActiveComponent);

        return {
            IsActiveComponent
        }
    }
}
</script>

<style scoped>
</style>