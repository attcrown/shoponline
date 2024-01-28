<template>
    <div>
        hello {{ $store.state.displayName }}
        <LoadingItem v-if="!$store.state?.displayName"></LoadingItem>
        <uploadimage></uploadimage>
    </div>
</template>
<script>
import LoadingItem from '~/components/LoadingItem.vue';
import uploadimage from './uploadimage.vue'
export default {
    layout: 'public',
    mounted() {
        
    },
    components: {
        LoadingItem,
        uploadimage
    },
    methods: {
         
    }

}
</script>