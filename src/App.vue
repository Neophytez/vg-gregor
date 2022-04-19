<template>
    <TopBar :cart="cart"></TopBar>
    <ProductCatalog :products="products_sorted" @add-to-cart="addToCard($event)"></ProductCatalog>
    <div class="my-5"> </div>
    <Footer></Footer>
</template>

<script>
import ProductCatalog from "./components/ProductCatalog.vue";
import {ref, computed, shallowRef} from "vue";
import AddEditProduct from "./components/AddEditProduct.vue";


export default {
    name: "App",
    components: {
        AddEditProduct,
        ProductCatalog
    },
    setup() {
        const active_component = ref("ProductCatalog");

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

        const cart = ref([]);

        const products = ref([]);
        const products_sorted = computed(() => {
            return products.value.sort((a, b) => (a.title > b.title) ? 1 : -1);
        });

        function addToCard(product) {
            cart.value.push(product)
        }

        const xhr = new XMLHttpRequest();
        xhr.open('GET', './products.csv');
        xhr.onload = function () {
            if (xhr.status !== 200) return;
            let lines = xhr.responseText.split("\n")

            // parse header line
            let header = lines.shift().split(",")

            // iterate lines
            lines.forEach(line => {
                // skip empty lines
                if(!line) return;

                // split line by comma to get item, ignore commas inside quotes
                // https://stackoverflow.com/questions/11456850/split-a-string-by-commas-but-ignore-commas-within-double-quotes-using-javascript/53774647#53774647
                let item = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

                // init empty product and iterate header length
                let product = {};
                for (let i = 0; i < header.length; i++) {
                    // parse id, price, sale_price as number, stock as boolean, everything else as string
                    product[header[i]] = ['id', 'price', 'sale_price'].includes(header[i]) ? Number(item[i]) : (['stock'].includes(header[i]) ? (item[i] === "true") : item[i]);
                }

                // add imdb_link prop
                product['imdb_link'] = null;
                product['image'] = null;

                // push product to products
                products.value.push(product)
            });
        };
        xhr.send(null);

        return {
            active_component,
            products,
            products_sorted,
            addToCard,
            cart
        }
    }
}
</script>

<style>

</style>
