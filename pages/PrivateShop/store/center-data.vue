<template>
    <div>
        <storeDashBoard ref="storeDashBoard"
            :style="!$store.state.deviceMode ? '' : 
            'position: fixed; width: 100%; z-index: 100; top: 0;'">
        </storeDashBoard>        
        <hr style="border: 2px solid #CFD8DC;"
            :style="!$store.state.deviceMode ? '' : 'margin-top: 140px;'">      
        <!-- List Items Doing -->
        <listItemBlockWork v-show="showBlockWork" ref="listItemBlockWorkRef"></listItemBlockWork>
        <listItemBlockStop v-show="showBlockStop" ref="listItemBlockStopRef"></listItemBlockStop>
        <listItemBlockPend v-show="showBlockPend" ref="listItemBlockPendRef"></listItemBlockPend>
        <priceItemsAll v-show="showPriceAll" ref="priceItemsAllRef"></priceItemsAll>

        <LoadingItem v-if="loading"></LoadingItem>
    </div>
</template>
<script>
import { EventBus } from '~/plugins/EventBus'

import storeDashBoard from './module/store-dashboard.vue'
import listItemBlockWork from './module/list-item-block-work.vue'
import listItemBlockStop from './module/list-item-block-stop.vue'
import listItemBlockPend from './module/list-item-block-pend'

import priceItemsAll from './module/price-items-all.vue'
import LoadingItem from '~/components/LoadingItem.vue'
import { percenBlockWorking } from '~/services/store-service'
import { formatDatetime } from '~/services/formatDatetime'
import { WORKING , STOP , PENDING } from '~/services/const'
import { TESTDATASTORE } from '~/services/testData/constStore'

export default {
    data() {
        return {
            loading : true,
            showPriceAll : false,
            showBlockWork : true,
            showBlockStop : false,
            showBlockPend : false,
            WORKING : WORKING,
            STOP : STOP,
            PENDING : PENDING
        }
    },
    components: {
        storeDashBoard ,
        listItemBlockWork ,
        listItemBlockStop ,
        listItemBlockPend ,
        priceItemsAll 
    },
    created() {
        EventBus.$on('showPriceAll', () => {
            this.showPriceAll = true
            this.showBlockWork = false
            this.showBlockStop = false
            this.showBlockPend = false
        }),
        EventBus.$on('showBlockWork', () => {
            this.showBlockWork = true
            this.showBlockStop = false
            this.showPriceAll = false
            this.showBlockPend = false
        }),
        EventBus.$on('showBlockStop', () => {
            this.showBlockStop = true
            this.showBlockWork = false
            this.showPriceAll = false
            this.showBlockPend = false
        }),
        EventBus.$on('showBlockPend', () => {
            this.showBlockPend = true
            this.showBlockStop = false
            this.showPriceAll = false
            this.showBlockWork = false
        })
    },
    mounted() {
        this.getDataStore()
    },
    methods: {
        async getDataStore() {
            let itemsWork = []
            let itemsStop = []
            let itemsPend = []
            let items = TESTDATASTORE

            for(const x in items){
                let result = percenBlockWorking(items[x])
                if(result.status === WORKING){  
                    itemsWork.push(result)
                }else if(result.status === STOP){
                    itemsStop.push(result)
                }else{
                    itemsPend.push(result)
                }
            }

            this.$refs.listItemBlockWorkRef.items = itemsWork
            this.$refs.listItemBlockStopRef.items = itemsStop
            this.$refs.listItemBlockPendRef.items = itemsPend

            this.$refs.storeDashBoard.priceAll = this.sumPriceCostAll(itemsWork ,itemsStop)
            this.$refs.storeDashBoard.work = this.blockWork(itemsWork)
            this.$refs.storeDashBoard.close = this.blockStop(itemsStop)
            this.$refs.storeDashBoard.pend = this.blockPend(itemsPend)

            this.loading = false
        },
        sumPriceCostAll(itemsWork , itemsStop){
            const itemWork = itemsWork
            const itemStop = itemsStop
            let sum = 0
            for(const x in itemWork){
                sum += itemWork[x].profitNow
            }
            for(const x in itemStop){
                sum += itemStop[x].profitAll
            }
            return sum
        },
        blockWork(itemsWork){
            const block = itemsWork
            let sum = 0
            for(const x in block){
                sum += block[x].block
            }
            return sum
        },
        blockStop(itemsStop){
            const block = itemsStop
            let sum = 0
            for(const x in block){
                sum += block[x].block
            }
            return sum
        },
        blockPend(itemsPend){
            const block = itemsPend
            let sum = 0
            for(const x in block){                
                sum += block[x].block
            }
            return sum
        }
    }
}
</script>