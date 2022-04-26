<template>
    <form class="d-flex flex-column container align-items-center">
        <div class="col-3 mb-3">
            <label class="form-label" >Username</label>
            <input type="text" class="form-control" v-model="credentials.username" autocomplete="username"/>
        </div>
        <div class="col-3 mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" v-model="credentials.password" autocomplete="password"/>
        </div>
        <button type="button" class="btn btn-dark" @click="login">Login</button>
    </form>
</template>

<script>
import {inject, ref} from "vue";

export default {
    name: "Login",
    setup() {
        const credentials = ref({
            username: null,
            password: null
        });

        const Authenticate = inject('Authenticate');

        function login() {
            if(!credentials.value.username || !credentials.value.password) return;
            Authenticate(credentials.value);
        }

        return {
            credentials,
            login
        }
    }
}
</script>

<style scoped>

</style>