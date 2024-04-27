<template>
    <div>
        <LoadingItem v-if="loading"></LoadingItem>
        <storeDashBoard ref="storeDashBoard"></storeDashBoard>
        <hr style="border: 2px solid #CFD8DC;" class="m-3">
        <!-- List Items Doing -->  
        <listItemBlock ref="listItemBlock"></listItemBlock>

    </div>
</template>
<script>
import storeDashBoard from './module/store-dashboard.vue'
import listItemBlock from './module/list-item-block.vue'
import LoadingItem from '~/components/LoadingItem.vue'
export default {
    data() {
        return {
            loading : true
        }
    },
    components: {
        storeDashBoard ,
        listItemBlock
    },
    mounted() {
        this.getDataStore()
    },
    methods: {
        async getDataStore() {
            this.$refs.storeDashBoard.priceAll = 234563.75
            this.$refs.storeDashBoard.work = 50
            this.$refs.storeDashBoard.close = 10

            this.loading = false
        }
    }
}
</script>