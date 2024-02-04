<template>
    <div>
        <search></search>        
        <carousel></carousel>
        <listitems></listitems> 
        <div v-if="!$store.state.deviceMode">
            <p class="text-center fontsPro pt-1">
                การันตีความปลอดภัยแบบ Real-time ที่ทันสมัยในทุกช่วงการใช้งาน <br>
                Ensuring real-time, cutting-edge security throughout every usage phase. <br>
                © 2024
            </p>
        </div>  
        <div v-else class="pb-10">
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
import uploadimage from './uploadimage.vue';
import {publicStatus} from '../../../services/public-status';
export default {
    layout: 'default',
    mounted() {
        this.publicStatus()
    },
    components: {
        uploadimage,
        search,
        carousel,
        listitems
    },
    methods: {
        publicStatus(){
            publicStatus(this.$fireModule.auth() ,this.$store);
        } 
    }

}
</script>