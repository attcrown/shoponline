<template>
    <div>
        <search></search>
        <carousel></carousel>
        <listitems></listitems>
        <pagination></pagination>
        <div v-if="!$store.state.deviceMode">
            <p class="text-center fontsPro pt-1">
                การันตีความปลอดภัยแบบ Real-time ที่ทันสมัยในทุกช่วงการใช้งาน <br>
                Ensuring real-time, cutting-edge security throughout every usage phase. <br>
                © 2024
            </p>
        </div>
        <div v-else>
            <p class="text-center fontsPro pt-1">
                © 2024
            </p>
        </div>
    </div>
</template>
<script>
import search from './search.vue';
import carousel from './carousel.vue';
import listitems from './list-items.vue';
import pagination from './pagination.vue';
import { publicStatus } from '../../../services/check-status';
export default {
    layout: 'default',
    async mounted() {
        await this.publicStatus()
    },
    components: {
        search,
        carousel,
        listitems,
        pagination
    },
    methods: {
        async publicStatus() {
            publicStatus(this.$fireModule.auth(), this.$store); // รอให้ publicStatus เสร็จสิ้น
        },
    },


}
</script>