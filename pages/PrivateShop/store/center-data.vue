<template>
    <div>
        <LoadingItem v-if="loading"></LoadingItem>
        <storeDashBoard ref="storeDashBoard"></storeDashBoard>
        <hr style="border: 2px solid #CFD8DC;" class="m-3">
        <!-- List Items Doing -->
        <listItemBlockWork v-show="showBlockWork" ref="listItemBlockWorkRef"></listItemBlockWork>
        <listItemBlockStop v-show="showBlockStop" ref="listItemBlockStopRef"></listItemBlockStop>
        <priceItemsAll v-show="showPriceAll" ref="priceItemsAllRef"></priceItemsAll>
    </div>
</template>
<script>
import { EventBus } from '~/plugins/EventBus'
import storeDashBoard from './module/store-dashboard.vue'
import listItemBlockWork from './module/list-item-block-work.vue'
import listItemBlockStop from './module/list-item-block-stop.vue'
import priceItemsAll from './module/price-items-all.vue'
import LoadingItem from '~/components/LoadingItem.vue'
export default {
    data() {
        return {
            loading : true,
            showPriceAll : false,
            showBlockWork : true,
            showBlockStop : false
        }
    },
    components: {
        storeDashBoard ,
        listItemBlockWork ,
        listItemBlockStop ,
        priceItemsAll 
    },
    created() {
        EventBus.$on('showPriceAll', () => {
            this.showPriceAll = true
            this.showBlockWork = false
            this.showBlockStop = false
        }),
        EventBus.$on('showBlockWork', () => {
            this.showBlockWork = true
            this.showBlockStop = false
            this.showPriceAll = false
        }),
        EventBus.$on('showBlockStop', () => {
            this.showBlockStop = true
            this.showBlockWork = false
            this.showPriceAll = false
        })
    },
    mounted() {
        this.getDataStore()
    },
    methods: {
        async getDataStore() {
            this.$refs.storeDashBoard.priceAll = 234563.75
            this.$refs.storeDashBoard.work = 50
            this.$refs.storeDashBoard.close = 10

            let itemsWork = [
                {
                    id : "EDti-1231sda-213",
                    name : 'Cymera-Photo Editor Camera Cymera-Photo Editor Camera',
                    count : 10,
                    createdAt : '2021-01-01 00:00:00', 
                    endAt : '2023-01-01 00:00:00'
                },
                {
                    id : "EDti-1231sda-21323asdawd",
                    name : 'Cymera-Photo Editor Camera Cymera-Photo Editor Camera',
                    count : 25,
                    createdAt : '2021-01-01 00:00:00', 
                    endAt : '2023-01-01 00:00:00'
                },
                {
                    id : "EDti-1231sda-21311-sdaa-aasdsd",
                    name : 'Cymera-Photo Editor Camera Cymera-Photo Editor Camera',
                    count : 15,
                    createdAt : '2021-01-01 00:00:00', 
                    endAt : '2023-01-01 00:00:00'
                },
            ]
            this.$refs.listItemBlockWorkRef.items = itemsWork

            let itemsStop = [
                {
                    id : "EDti-1231sda-213",
                    name : 'Cymera-Photo Editor Camera Cymera-Photo Editor Camera',
                    count : 10,
                    createdAt : '2021-01-01 00:00:00', 
                    endAt : '2023-01-01 00:00:00'
                }
            ]
            this.$refs.listItemBlockStopRef.items = itemsStop

            this.loading = false
        }
    }
}
</script>