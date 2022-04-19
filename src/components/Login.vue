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
import {ref} from "vue";

export default {
    name: "Login",
    emits: ['authenticate'],
    setup(_, context) {
        const credentials = ref({
            username: null,
            password: null
        });

        function login() {
            if(!credentials.value.username || !credentials.value.password) return;
            context.emit('authenticate', credentials)
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