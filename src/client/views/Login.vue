<template lang="pug">
    .wrapper
        .logged-in(v-if="isLoggedIn") You are already logged in
        .logged-out(v-if="!isLoggedIn")
            .user-name
                .label UserName
                input(
                    type="text",
                    v-model="model.userName"
                )
            .password
                .label Password
                input(
                    type="password",
                    v-model="model.password"
                )
            button(@click="logIn") Log in
</template>
<script lang="ts">
import Vue from 'vue';
import { actionRegistry } from '../vuex/store';
import jwtDecode from 'jwt-decode';

export default Vue.extend({
    data() {
        return {
            model: {
                userName: null as string | null,
                password: null as string | null,
            },
            isLoggedIn: false,
            error: null as string | null,
        };
    },
    mounted() {
        const jwt = localStorage.getItem('jwt');
        if (jwt !== null) {
            const decoded = jwtDecode(jwt);
            console.log(decoded);
        }
    },
    methods: {
        logIn() {
            this.isLoggedIn = true;
            this.$store.dispatch(actionRegistry.logIn, this.model.userName);
        },
    },
});
</script>