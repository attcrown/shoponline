<template>
    <div>
        <div>
            <LoadingItem v-if="!$store.state?.uid"></LoadingItem>
        </div>
        
        <uploadimage></uploadimage>
    </div>
</template>
<script>
import LoadingItem from '~/components/LoadingItem.vue';
import uploadimage from './uploadimage.vue';
import {publicStatus} from '../../../services/public-status';
export default {
    layout: 'default',
    mounted() {
        this.publicStatus()
    },
    components: {
        LoadingItem,
        uploadimage
    },
    methods: {
        publicStatus(){
            const auth = this.$fireModule.auth();
            publicStatus(auth ,this.$store);
        } 
    }

}
</script>