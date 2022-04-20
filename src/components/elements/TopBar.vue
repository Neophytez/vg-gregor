<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
        <div class="container-fluid">
            <img src="@/assets/logo.jpg" alt="VG.Gregor" @click="ChangeActiveComponent('ProductCatalog')">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#topNavbar" aria-controls="topNavbar" aria-expanded="false" aria-label="Toggle menu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="topNavbar">
                <ul class="navbar-nav me-auto mb-2 mx-auto">
                    <li class="nav-item mx-3" v-for="item in navbar_items">
                        <a class="nav-link" :href="item.url">{{ item.text }}</a>
                    </li>
                </ul>
                <div class="d-flex">
                    <button v-if="!authenticated" class="btn btn-outline-light me-3" @click="ChangeActiveComponent('Login')">Login</button>
                    <button v-if="authenticated" class="btn btn-outline-light me-3" @click="ChangeActiveComponent('AddEditProduct', true)">Add product</button>
                    <button v-if="authenticated"  class="btn btn-outline-light me-3" @click="Logout()">Logout</button>
                    <button class="btn btn-outline-light"><i class="bi bi-cart-fill"></i> {{cart.length}}</button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import {inject, ref} from "vue";

export default {
    name: "TopBar",
    props: {
        cart: {
            type: Array,
            required: true
        }
    },
    setup() {
        const navbar_items = ref([
            {
                text: "VHS",
                url: "#"
            },
            {
                text: "BLURAY",
                url: "#"
            },{
                text: "DVD",
                url: "#"
            },
        ]);

        const authenticated = inject('authenticated');
        const ChangeActiveComponent = inject('ChangeActiveComponent');
        const Logout = inject('Logout');

        return {
            navbar_items,
            authenticated,
            ChangeActiveComponent,
            Logout
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