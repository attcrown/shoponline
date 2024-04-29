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
import { percenBlockWorking } from '~/services/store-service'
import { formatDatetime } from '~/services/formatDatetime'

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
                    block : 10,
                    createdAt : formatDatetime('2023-10-10', '12:00'),                    
                    cost : 0.55,
                    contract : 900
                },
                {
                    id : "EDti-1231sda-21323asdawd",
                    name : 'Cymera-Photo Editor Camera Cymera-Photo Editor Camera',
                    block : 25,
                    createdAt : formatDatetime('2023-11-10', '15:00'),
                    cost : 0.55,
                    contract : 1095
                },
                {
                    id : "EDti-1231sda-21311-sdaa-aasdsd",
                    name : 'Cymera-Photo Editor Camera Cymera-Photo Editor Camera',
                    block : 15,
                    createdAt : formatDatetime('2023-12-10', '16:00'),
                    cost : 0.55,
                    contract : 900
                },
            ]

            let itemsStop = [
                {
                    id : "EDti-1231sda-21311-sdaa-aasdsd",
                    name : 'Cymera-Photo Editor Camera Cymera-Photo Editor Camera',
                    block : 15,
                    createdAt : formatDatetime('2024-01-10', '12:00'),
                    cost : 0.55,
                    contract : 1095
                },
                {
                    id : "EDti-1231sda-21311-sdaa-adsd",
                    name : 'Cymera-Photo Editor Camera Cymera-Photo Editor Camera',
                    block : 15,
                    createdAt : formatDatetime('2024-04-10', '12:00'),
                    cost : 0.55,
                    contract : 1095
                },
            ]

            for(const x in itemsWork){
                console.log(itemsWork[x])
                let result = percenBlockWorking(itemsWork[x])
                if(result.status){  
                    itemsWork[x] = result
                }
            }

            for(const x in itemsStop){
                let result = await percenBlockWorking(itemsStop[x])
                if(result.status){
                    itemsStop[x] = result
                }
            }

            this.$refs.listItemBlockWorkRef.items = itemsWork
            this.$refs.listItemBlockStopRef.items = itemsStop

            this.loading = false
        }
    }
}
</script>