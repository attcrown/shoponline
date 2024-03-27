<template>
    <div>
        <div class="fontsProAdd" :class="!$store.state.deviceMode ? 'd-flex' : ''">
            <div class="mt-10" :style="!$store.state.deviceMode ? 'width: 50%' : 'width: 100%'">
                <product></product>
            </div>
            <v-divider :vertical="!$store.state.deviceMode"  color="black" class="mt-3"></v-divider>
            <div class="mt-10" :style="!$store.state.deviceMode ? 'width: 50%' : 'width: 100%'">
                <review></review>
            </div>
        </div>
    </div>
</template>
<script>
import product from './product.vue'
import review from './review.vue'
import { checkStatus } from '../../../services/check-status';

export default {
    layout: 'default',

    data() {
        return {
            loading: true
        }
    },
    mounted() {
        this.checkStatusRank();
    },
    components: {
        product,
        review
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