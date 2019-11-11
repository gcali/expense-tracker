<template lang="pug">
    #app
        img(alt="Vue logo" src="./assets/logo.png")
        .links
            router-link(to="/") Expense List
            router-link(to="/insert") Insert Expense
        router-view
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {},
})
export default class App extends Vue { }
</script>

<style lang="scss">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.links > a {
    &:not(:last-child) {
        padding-right: 1em;
    }
}
</style>
