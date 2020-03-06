<template lang="pug">
    #app
        header 
            .title Expense tracker
            .spinner-wrapper(v-if="showLoader")
                .spinner
            .user-name(v-if="isLoggedIn") {{userName}}
        img(alt="Vue logo" src="./assets/logo.png")
        .links(v-if="isLoggedIn")
            router-link(to="/") Expense List
            router-link(to="/insert") Insert Expense
        router-view(v-if="isLoggedIn")
        Login(v-if="!isLoggedIn")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { actionRegistry } from './vuex/store';
import Login from '@client/views/Login.vue';

@Component({
    components: { Login },
})
export default class App extends Vue {
    private get isLoggedIn() {
        return this.$store.strongState().userName !== null;
    }

    private get userName() {
        return this.$store.strongState().userName;
    }
    public mounted() {
        this.$store.dispatch(actionRegistry.loadOwners);
    }
    public get showLoader(): boolean {
        return this.$store.strongState().loading > 0;
    }
}
</script>

<style lang="scss">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    position: relative;
}

header {
    background-color: goldenrod;
    min-height: 2em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
    align-items: center;
    .title {
        flex-grow: 1;
        text-align: left;
        padding-left: 1em;
        font-weight: bold;
    }
    .user-name {
        padding-right: 2em;
        max-width: 7em;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}

.links > a {
    &:not(:last-child) {
        padding-right: 1em;
    }
}

.spinner-wrapper {
    // position: absolute;
    // right: 1em;
    // display: flex;
    // flex-direction: row;
    // align-items: center;
    max-height: 100%;
    .spinner,
    .spinner:after {
        border-radius: 50%;
        width: 10em;
        height: 10em;
    }
    .spinner {
        // margin: 60px auto;
        font-size: 2px;
        position: relative;
        text-indent: -9999em;
        border-top: 1.1em solid rgba(255, 255, 255, 0.2);
        border-right: 1.1em solid rgba(255, 255, 255, 0.2);
        border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
        border-left: 1.1em solid #ffffff;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation: load8 1.1s infinite linear;
        animation: load8 1.1s infinite linear;
    }
    @-webkit-keyframes load8 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes load8 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
}
</style>
