<template>
    <TopBar :cart="cart" @change-active-component="active_component = $event" :authenticated="authenticated" @logout="authenticated = false"></TopBar>
    <ProductCatalog v-if="isActiveComponent('ProductCatalog')" :products="products_sorted" @add-to-cart="addToCard($event)" @edit-product="editProduct($event)" :authenticated="authenticated"></ProductCatalog>
    <AddEditProduct v-else-if="isActiveComponent('AddEditProduct')" :product="edit_product"></AddEditProduct>
    <Login v-else-if="isActiveComponent('Login')" @authenticate="authenticate($event)"></Login>
    <div class="my-5"> </div>
    <Footer></Footer>
</template>

<script>
import {ref, computed} from "vue";
import ProductCatalog from "./components/ProductCatalog.vue";
import AddEditProduct from "./components/AddEditProduct.vue";
import Login from "./components/Login.vue";

export default {
    name: "App",
    components: {
        AddEditProduct,
        ProductCatalog,
        Login
    },
    setup() {
        const active_component = ref("ProductCatalog");
        const authenticated = ref(false);

        function isActiveComponent(name) {
            return name === active_component.value;
        }

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

        function authenticate(credentials) {
            authenticated.value = true;
            active_component.value = "ProductCatalog";
        }

        const edit_product = ref(null);
        function editProduct(product) {
            edit_product.value = product;
            active_component.value = "AddEditProduct";
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
                    if(['id', 'price', 'sale_price'].includes(header[i])) {
                        product[header[i]] = Number(item[i]);
                    }
                    else if(header[i] === "stock") {
                        product[header[i]] = item[i] === "true";
                    }
                    else if(header[i] === "title") {
                        console.log(item[i].replace(/["]+/g, ''));
                        product[header[i]] = item[i].replace(/["]+/g, '');
                    } else {
                        product[header[i]] = item[i];
                    }
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
            cart,
            isActiveComponent,
            authenticate,
            authenticated,
            editProduct,
            edit_product
        }
    }
}
</script>

<style>

</style>
