<template>
    <div v-if="show">
        <centerData></centerData>
    </div>
</template>
<script>
    import centerData from './center-data.vue'
    import { checkLoginStatus } from '../../../services/check-status'
    export default {
        layout: 'default',
        data() {
            return {
                show:false
            }
        },
        components: {
            centerData
        },
        mounted() {
            this.checkStatus();
        },
        methods: {
            checkStatus(){
                const auth = this.$fireModule.auth();
                const result = checkLoginStatus(auth, this.$store, this.$router);
                this.show = result
            }
        },
    }
</script>