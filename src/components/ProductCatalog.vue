<template>
    <div class="d-flex container">
        <div class="d-flex flex-column">
            <label>Search by title</label>
            <input type="text" class="form-control" v-model="filter">
        </div>
    </div>
    <div class="d-flex container align-items-center">
        <div class="row w-100">
            <div v-for="product in filtered_products" class="col-3">
                <Product :product="product"></Product>
            </div>
        </div>
    </div>
</template>

<script>
import Product from "./elements/Product.vue";
import {computed, ref} from "vue";

export default {
    name: "ProductCatalog",
    components: {Product},
    props: {
        products: {
            type: Array,
            required: true
        }
    },
    setup(props) {
        const filter = ref('');

        const filtered_products = computed(() => {
            return props.products.filter(el => {
                return el.stock && el.title.toLowerCase().includes(filter.value.toLowerCase())
            });
        });

        return {
            filtered_products,
            filter,
        }
    }
}
</script>

<style scoped>

</style>