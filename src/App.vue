<template>
    <TopBar></TopBar>
    <component :is="active_component"></component>
    <Footer></Footer>
</template>

<script>
import ProductCatalog from "./components/ProductCatalog.vue";
import Product from "./components/Product.vue";
import {shallowRef, ref} from "vue";

export default {
    name: "App",
    setup() {
        const active_component = shallowRef(Product);
        return {
            active_component
        }
    }
}
</script>

<style>

</style>
