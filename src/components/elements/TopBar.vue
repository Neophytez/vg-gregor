<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
        <div class="container-fluid">
            <img alt="VG.Gregor" src="@/assets/logo.jpg" @click="ChangeActiveComponent('ProductCatalog')">
            <button aria-controls="topNavbar" aria-expanded="false" aria-label="Toggle menu" class="navbar-toggler"
                    data-bs-target="#topNavbar" data-bs-toggle="collapse" type="button">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div id="topNavbar" class="collapse navbar-collapse">
                <ul class="navbar-nav me-auto mb-2 mx-auto">
                    <li v-for="item in navbar_items" class="nav-item mx-3">
                        <a :href="item.url" class="nav-link">{{ item.text }}</a>
                    </li>
                </ul>
                <div class="d-flex">
                    <button v-if="!authenticated" class="btn btn-outline-light me-3"
                            @click="ChangeActiveComponent('Login')">Login
                    </button>
                    <button v-if="authenticated" class="btn btn-outline-light me-3"
                            @click="ChangeActiveComponent('AddEditProduct', true)">Add product
                    </button>
                    <button v-if="authenticated" class="btn btn-outline-light me-3" @click="Logout()">Logout</button>
                    <button class="btn btn-outline-light" @click="ChangeActiveComponent('Sale')"><i
                        class="bi bi-cart-fill"></i> {{ cart_quantity }}
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import {computed, inject, ref} from "vue";

export default {
    name: "TopBar",
    props: {
        cart: {
            type: Array,
            required: true
        }
    },
    setup(props) {
        const navbar_items = ref([
            {
                text: "VHS",
                url: "#"
            },
            {
                text: "BLURAY",
                url: "#"
            }, {
                text: "DVD",
                url: "#"
            },
        ]);

        const cart_quantity = computed(() => {
            return props.cart.reduce((prev, cur) => {
                return prev + cur.quantity;
            }, 0);
        });

        const authenticated = inject('authenticated');
        const ChangeActiveComponent = inject('ChangeActiveComponent');
        const Logout = inject('Logout');

        return {
            navbar_items,
            authenticated,
            ChangeActiveComponent,
            Logout,
            cart_quantity
        }
    }
}
</script>

<style scoped>
.navbar {
    padding-bottom: 0;
    padding-top: 0;
}

.container-fluid {
    padding-left: 0;
}
</style>