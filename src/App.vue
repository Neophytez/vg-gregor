<template>
    <TopBar></TopBar>
    <component :is="active_component"></component>
    <Footer></Footer>
</template>

<script>
import Product from "./components/Product.vue";
import {ref, shallowRef} from "vue";

export default {
    name: "App",
    setup() {
        const active_component = shallowRef(Product);

        const product = ref({
            id: null,
            name: null,
            photo: null,
            price: null,
            sale_price: null,
            stock: null,
            media_type: null,
            imdb_link: null
        });

        const products = ref([]);

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/products.csv');
        xhr.onload = function () {
            if (xhr.status !== 200) return;
            let lines = xhr.responseText.split("\n")

            // parse header line
            let header = lines.shift().split(",")

            // iterate lines
            lines.forEach(line => {
                // split line by comma to get item
                let item = line.split(",")

                // init empty product
                let product = {};

                // iterate header length
                for (let i = 0; i < header.length; i++) {
                    // parse id, price, sale_price as number, stock as boolean, everything else as string
                    product[header[i]] = ['id', 'price', 'sale_price'].includes(header[i]) ? Number(item[i]) : (['stock'].includes(header[i]) ? (item[i] === "true") : item[i]);
                }

                // add imdb_link prop
                product['imdb_link'] = null;

                // add product to products
                products.value.push(product)
            });
        };
        xhr.send(null);

        return {
            active_component,
            products
        }
    }
}
</script>

<style>

</style>
