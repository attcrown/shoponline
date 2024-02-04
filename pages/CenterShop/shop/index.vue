<template>
    <div>
        <div v-if="!$store.state?.uid">
            <LoadingItem></LoadingItem>
        </div>
        <div v-else>
            <search></search>        
            <carousel></carousel>
            <uploadimage></uploadimage>
        </div>        
    </div>
</template>
<script>
import LoadingItem from '~/components/LoadingItem.vue';
import uploadimage from './uploadimage.vue';
import search from './search.vue';
import carousel from './carousel.vue';
import {publicStatus} from '../../../services/public-status';
export default {
    layout: 'default',
    mounted() {
        this.publicStatus()
    },
    components: {
        LoadingItem,
        uploadimage,
        search,
        carousel
    },
    methods: {
        publicStatus(){
            publicStatus(this.$fireModule.auth() ,this.$store);
        } 
    }

}
</script>