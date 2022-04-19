<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
        <div class="container-fluid">
            <a href="#">
                <img src="@/assets/logo.jpg" alt="VG.Gregor">
            </a>
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
                    <button class="btn btn-outline-light"><i class="bi bi-cart-fill"></i> {{number_of_items}}</button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import {ref} from "vue";

export default {
    name: "TopBar",
    setup() {
        const number_of_items = ref(0);
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

        return {
            number_of_items,
            navbar_items
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