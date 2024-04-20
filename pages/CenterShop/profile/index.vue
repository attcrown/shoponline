<template>
    <div>
        <detail v-if="show"></detail>
    </div>
</template>
<script>
import detail from './detail.vue';
import {checkLoginStatus} from '../../../services/check-status'
export default {
    layout: 'default',
    data() {
        return {
            property: 'value' ,
            show : false

        };
    },
    async mounted() {
        await this.checkStatus();
    },
    methods: {
        // ตรวจสอบมีการ login หรือไม่
        async checkStatus(){
            const auth = this.$fireModule.auth();
            const result = await checkLoginStatus(auth ,this.$store ,this.$router);
            this.show = result
        }
    },
    components: {
        detail
    }
}
</script>