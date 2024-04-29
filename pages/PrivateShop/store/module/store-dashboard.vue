<template>
    <div class="fontsStore">
        <div :class="!$store.state.deviceMode ? 'd-flex' : ''">
            <v-hover v-slot="{ hover }">
                <v-card :elevation="hover ? 10 : 
                    showPriceAllShadow ? 20 : 1"
                    :style="showPriceAllShadow ? 'outline: #388E3C solid 2px;' :''"
                    @click="showPriceAll()"                
                    class="rounded-xl m-3"
                    :class="!$store.state.deviceMode ? 'me-0' : ''"
                    :width="!$store.state.deviceMode ? '70%' : ''"
                    color="green lighten-4">
                    <v-card-title style="color: #388E3C;">
                        รายได้ทั้งหมด
                    </v-card-title>
                    <v-card-subtitle style="color: #388E3C;">
                        แสดงยอดรวมทั้งหมดที่คุณได้รับ
                    </v-card-subtitle>
                    <v-card-text 
                        class="text-end"
                        style="color: #388E3C;
                        font-weight: bold;
                        font-size: 20px;">
                        {{ formatBathSend(priceAll) }} ฿
                    </v-card-text>
                </v-card>
            </v-hover>
            <v-hover v-slot="{ hover }">
                <v-card :elevation="hover ? 10 : 
                    showBlockPendShadow ? 20 : 1"
                    :style="showBlockPendShadow ? 'outline: #388E3C solid 2px;' :''"
                    @click="showBlockPend()"                
                    class="rounded-xl m-3"
                    :class="!$store.state.deviceMode ? 'me-0 ms-2' : ''"
                    :width="!$store.state.deviceMode ? '30%' : ''"
                    color="green lighten-4">
                    <v-card-title style="color: #388E3C;">
                        Block Pending
                    </v-card-title>
                    <v-card-subtitle style="color: #388E3C;">
                        รอ Block ทำงาน
                    </v-card-subtitle>
                    <v-card-text 
                        class="text-end"
                        style="color: #388E3C;
                        font-weight: bold;
                        font-size: 20px;">
                        {{ formatBathSend(priceAll) }} ฿
                    </v-card-text>
                </v-card>
            </v-hover>
            <div class="d-flex justify-space-between m-3"
                :class="!$store.state.deviceMode ? 'ms-2' : ''" 
                :style="!$store.state.deviceMode ? 'width: 100%;' : ''">
                <v-hover v-slot="{ hover }">
                    <v-card :elevation="hover ? 10 : 
                        showBlockWorkShadow ? 20 : 1"
                        :style="showBlockWorkShadow ? 'outline: #FFA726 solid 2px;' :''"
                        @click="showBlockWorking()"
                        class="rounded-xl"
                        :width="!$store.state.deviceMode ? '50%' : '54%'"                    
                        color="orange lighten-5">
                        <v-card-title style="color: #FFA726;">
                            Block Working
                        </v-card-title>
                        <v-card-subtitle style="color: #FFA726;">
                            Block ที่ทำงานอยู่
                        </v-card-subtitle>
                        <v-card-text
                            class="text-end"
                            style="color: #FFA726;
                            font-weight: bold;
                            font-size: 20px;">
                            {{ work }} <span class="mdi mdi-box-shadow"></span>
                        </v-card-text>
                    </v-card>
                </v-hover>
                <v-hover v-slot="{ hover }">
                    <v-card :elevation="hover ? 10 : 
                        showBlockStopShadow ? 20 : 1"
                        :style="showBlockStopShadow ? 'outline: #E65100 solid 2px;' :''"
                        @click="showBlockStop()"
                        class="rounded-xl"
                        :width="!$store.state.deviceMode ? '49%' : '45%'"
                        color="deep-orange lighten-4">
                        <v-card-title style="color: #E65100;">
                            Block Close
                        </v-card-title>
                        <v-card-subtitle style="color: #E65100;">
                            Block ที่หมดอายุ
                        </v-card-subtitle>
                        <v-card-text
                            class="text-end"
                            style="color: #E65100;
                            font-weight: bold;
                            font-size: 20px;">
                            {{ close }} <span class="mdi mdi-package-variant-closed-remove"></span>
                        </v-card-text>
                    </v-card>
                </v-hover>
            </div>
        </div>
    </div>
</template>
<script>
import { EventBus } from '~/plugins/EventBus'
import { formatBath } from '~/services/format-number';
export default {
    data() {
        return {
            priceAll: 0 ,
            work: 0, 
            close: 0,
            showPriceAllShadow: false,
            showBlockWorkShadow: true,
            showBlockStopShadow: false,
            showBlockPendShadow: false
        }
    },
    methods: {
        formatBathSend(item){
            return formatBath(item)
        },
        showPriceAll(){
            EventBus.$emit('showPriceAll')
            this.showPriceAllShadow = true
            this.showBlockWorkShadow = false
            this.showBlockStopShadow = false
        },
        showBlockWorking(){
            EventBus.$emit('showBlockWork')
            this.showBlockWorkShadow = true
            this.showBlockStopShadow = false
            this.showPriceAllShadow = false
        },
        showBlockStop(){
            EventBus.$emit('showBlockStop')
            this.showBlockStopShadow = true
            this.showBlockWorkShadow = false
            this.showPriceAllShadow = false
        },
        showBlockPend(){
            EventBus.$emit('showBlockPend')
            this.showBlockStopShadow = false
            this.showBlockWorkShadow = false
            this.showPriceAllShadow = false

        }
    }

}
</script>
<style>
.fontsStore {
    font-family: 'Prompt', sans-serif;
}
</style>