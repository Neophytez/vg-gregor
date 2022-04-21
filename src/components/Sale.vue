<template>
    <Cart v-if="IsActiveComponent('Cart')"></Cart>
    <Purchase v-if="IsActiveComponent('Purchase')"></Purchase>
</template>

<script>
import Purchase from "./Purchase.vue";
import Cart from "./Cart.vue";
import {provide, ref} from "vue";

export default {
    name: "Sale",
    components: {Purchase, Cart},
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
.header, .title {
    font-size: large;
    font-weight: 500;
}

.summary {
    font-weight: 500;
}

.product-image {
    max-height: 50px;
    max-width: 50px;
}
</style>