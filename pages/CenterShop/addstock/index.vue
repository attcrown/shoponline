<template>
    <div class="fontsProAdd">
        <product></product>
    </div>
</template>
<script>
import product from './product.vue'
import { checkStatus } from '../../../services/check-status';

export default {
    layout: 'default',
    mounted() {
        this.checkStatusRank();
    },
    components: {
        product
    },
    methods: {
        checkStatusRank() {
            const auth = this.$fireModule.auth();
            checkStatus(auth, this.$store, this.$router);
        }
    }
}
</script>
<style>
.fontsProAdd {
    font-family: 'Prompt', sans-serif;
    font-weight: 300;
}
</style>