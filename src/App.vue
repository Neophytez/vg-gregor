<template>
    <TopBar :cart="cart"></TopBar>
    <ProductCatalog v-if="IsActiveComponent('ProductCatalog')" :products="products_sorted"></ProductCatalog>
    <AddEditProduct v-else-if="IsActiveComponent('AddEditProduct')" :product="edit_product"></AddEditProduct>
    <Sale v-else-if="IsActiveComponent('Sale')"></Sale>
    <Login v-else-if="IsActiveComponent('Login')"></Login>
    <Footer></Footer>
</template>

<script>
import {ref, computed, provide, watch} from "vue";
import ProductCatalog from "./components/ProductCatalog.vue";
import AddEditProduct from "./components/Product/AddEditProduct.vue";
import Login from "./components/Login.vue";
import Sale from "./components/Sale.vue";

export default {
    name: "App",
    components: {
        AddEditProduct,
        ProductCatalog,
        Login,
        Sale
    },
    setup() {
        const active_component = ref("ProductCatalog");
        function IsActiveComponent(name) {
            return name === active_component.value;
        }
        function ChangeActiveComponent(component, clear = false) {
            if(clear) edit_product.value = null;
            active_component.value = component;
        }

        const products = ref([]);
        const products_sorted = computed(() => {
            return products.value.sort((a, b) => (a.title > b.title) ? 1 : -1);
        });

        const cart = ref(JSON.parse(localStorage.getItem('stored_cart')) ?? []);
        function AddToCart(product) {
            let index = cart.value.findIndex(el => el.id === product.id);
            if(index < 0) {
                product.quantity = 1;
                cart.value.push(product)
            } else {
                cart.value[index].quantity++;
            }
        }
        watch(cart.value, () => {
            localStorage.setItem('stored_cart', JSON.stringify(cart.value));
        });

        const authenticated = ref(false);
        function Authenticate(credentials) {
            let username = import.meta.env.VITE_LOGIN_USERNAME;
            let password = import.meta.env.VITE_LOGIN_PASSWORD;

            if(credentials.username !== username || credentials.password !== password) {
                return;
            }

            authenticated.value = true;
            ChangeActiveComponent("ProductCatalog");
        }
        function Logout() {
            authenticated.value = false;
        }

        const edit_product = ref(null);
        function EditProduct(product) {
            edit_product.value = product;
            ChangeActiveComponent('AddEditProduct');
        }

        function DeleteProduct(id) {
            if (id !== null && id !== undefined) {
                let index = products.value.map(product => {
                    return product.id;
                }).indexOf(id);
                products.value.splice(index, 1);
            }
            ChangeActiveComponent('ProductCatalog');
        }

        function CreateProduct(product) {
            product.id = GetAvailableId();
            products.value.push(product.value);
            ChangeActiveComponent('ProductCatalog');
        }

        function GetAvailableId() {
            if(!products.value.length) return 1;
            return Math.max.apply(Math, products.value.map(el => el.id)) + 1;
        }

        function UpdateProduct(product) {
            const index = products.value.findIndex(el => el.id === product.id);
            if(index >= 0) {
                products.value[index] = product;
            }
            ChangeActiveComponent("ProductCatalog");
        }

        function ClearCart() {
            cart.value = [];
            localStorage.removeItem('stored_cart');
        }

        provide('ChangeActiveComponent', ChangeActiveComponent);
        provide('AddToCart', AddToCart);
        provide('Authenticate', Authenticate);
        provide('Logout', Logout);
        provide('EditProduct', EditProduct);
        provide('DeleteProduct', DeleteProduct);
        provide('CreateProduct', CreateProduct);
        provide('UpdateProduct', UpdateProduct);
        provide('ClearCart', ClearCart);

        provide('authenticated', authenticated);
        provide('cart', cart);

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
                        product[header[i]] = item[i] ? Number(item[i]) : null;
                    }
                    else if(header[i] === "stock") {
                        product[header[i]] = item[i] === "true";
                    }
                    else if(header[i] === "title") {
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
            cart,
            IsActiveComponent,
            authenticated,
            EditProduct,
            edit_product,
            DeleteProduct,
        }
    }
}
</script>

<style>

</style>
