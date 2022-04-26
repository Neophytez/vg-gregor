<template>
    <Cart v-if="IsActiveComponent('Cart')"></Cart>
    <Purchase v-if="IsActiveComponent('Purchase')"></Purchase>
    <ThankYou v-if="IsActiveComponent('ThankYou')" :summary="summary"></ThankYou>
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

        const summary = ref([]);

        function SetCartSummary(cart) {
            summary.value = cart;
        }

        provide('ChangeActiveComponentSale', ChangeActiveComponent);
        provide('SetCartSummary', SetCartSummary);

        return {
            IsActiveComponent,
            summary
        }
    }
}
</script>

<style scoped>
</style>