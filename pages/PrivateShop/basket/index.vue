<template>
    <div v-if="show">
        <basketItems></basketItems>
    </div>
</template>
<script>
import basketItems from './basket-items.vue'
import { checkLoginStatus } from '../../../services/check-status'
export default {
    layout: 'default',
    data() {
        return {
            show:false
        }
    },
    components: {
        basketItems
    },
    async mounted() {
        await this.checkStatus();
    },
    methods: {
        async checkStatus() {
            const auth = this.$fireModule.auth();
            const result = await checkLoginStatus(auth, this.$store, this.$router);
            this.show = result
        }
    }
}
</script>