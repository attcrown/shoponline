<template>
    <div>
        <detailItems></detailItems>
    </div>
</template>
<script>
import {publicStatus} from '../../../services/check-status';
import detailItems from './detail-items.vue';
export default {
    layout: 'default',
    data() {
        return {
            typeItems : []
        }
    },
    async mounted() {
        this.publicStatus()
    },
    components: {
        detailItems
    },
    methods: {
        publicStatus(){
            publicStatus(this.$fireModule.auth() ,this.$store);
        }
    },
}
</script>