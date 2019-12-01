<template lang="pug">
    #app
        header Expense tracker
            .spinner-wrapper(v-if="showLoader")
                .spinner
        img(alt="Vue logo" src="./assets/logo.png")
        .links
            router-link(to="/") Expense List
            router-link(to="/insert") Insert Expense
        router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { actionRegistry } from './vuex/store';

@Component({
    components: {},
})
export default class App extends Vue {
    public mounted() {
        this.$store.dispatch(actionRegistry.loadOwners);
    }
    public get showLoader(): boolean {
        return this.$store.state.loading;
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
    flex-direction: column;
    justify-content: center;
    position: relative;
}

.links > a {
    &:not(:last-child) {
        padding-right: 1em;
    }
}

.spinner-wrapper {
    position: absolute;
    right: 1em;
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
