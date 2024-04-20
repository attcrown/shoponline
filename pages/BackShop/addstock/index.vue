<template>
    <div class="fontsProAdd" v-if="show">
        <product></product>
        <listItems class="mt-5"></listItems>
    </div>
</template>
<script>
import listItems from './list-items.vue'
import product from './product.vue'
import { addItemsStatus } from '../../../services/check-status';

export default {
    layout: 'default',
    data() {
        return {
            show : false
        }
    },
    async mounted() {
        await this.checkStatus();
    },
    components: {
        product,
        listItems
    },
    methods: {
        async checkStatus() {
            const auth = this.$fireModule.auth();
            const result = await addItemsStatus(auth, this.$store, this.$router);
            this.show = result
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