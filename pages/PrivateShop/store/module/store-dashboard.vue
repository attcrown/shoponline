<template>
    <div class="fontsStore">
        <v-row dense class="m-3" v-if="!$store.state.deviceMode">
            <v-col cols="12" md="3">
                <v-hover v-slot="{ hover }" class="rounded-xl">
                    <v-card :elevation="hover ? 10 :
                        showPriceAllShadow ? 20 : 1" :style="showPriceAllShadow ? 'outline: #388E3C solid 2px;' : ''"
                        @click="showPriceAll()" class="rounded-xl me-0" color="green lighten-4">
                        <v-img class="white--text align-end rounded-xl" max-height="125px"
                            :src="require('~/assets/img-store/pigmoney1.jpg')"
                            gradient="to bottom, rgba(200, 230, 201,0.8), rgba(200, 230, 201,0.8)">
                            <v-card-title style="color: #388E3C;">
                                รายได้ทั้งหมด
                            </v-card-title>
                            <v-card-subtitle style="color: #388E3C; background-color: rgba(200, 230, 201,0.8);">
                                แสดงยอดรวมทั้งหมด
                            </v-card-subtitle>
                            <v-card-text class="text-end" style="color: #388E3C;
                            font-weight: bold;
                            font-size: 20px;">
                                {{ formatBathSend(priceAll) }} ฿
                            </v-card-text>
                        </v-img>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col cols="12" md="3">
                <v-hover v-slot="{ hover }">
                    <v-card :elevation="hover ? 10 :
                        showBlockPendShadow ? 20 : 1" :style="showBlockPendShadow ? 'outline: #303F9F solid 2px;' : ''"
                        @click="showBlockPend()" class="rounded-xl" color="blue lighten-4">
                        <v-img class="white--text align-end rounded-xl" max-height="125px"
                            :src="require('~/assets/img-store/blockPend1.jpg')"
                            gradient="to bottom, rgba(187, 222, 251,0.8), rgba(187, 222, 251,0.8)">
                            <v-card-title style="color: #303F9F;">
                                Block Pending
                            </v-card-title>
                            <v-card-subtitle style="color: #303F9F; background-color: rgba(187, 222, 251,0.8);">
                                รอ Block ทำงาน
                            </v-card-subtitle>
                            <v-card-text class="text-end" style="color: #303F9F;
                            font-weight: bold;
                            font-size: 20px;">
                                {{ pend }} <span class="mdi mdi-help-box-multiple"></span>
                            </v-card-text>
                        </v-img>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col cols="12" md="3">
                <v-hover v-slot="{ hover }">
                    <v-card :elevation="hover ? 10 :
                        showBlockWorkShadow ? 20 : 1" :style="showBlockWorkShadow ? 'outline: #CF7C00 solid 2px;' : ''"
                        @click="showBlockWorking()" class="rounded-xl" color="orange lighten-5">
                        <v-img class="white--text align-end rounded-xl" max-height="125px"
                            :src="require('~/assets/img-store/blockWork1.jpg')"
                            gradient="to bottom, rgba(255, 243, 224,0.8), rgba(255, 243, 224,0.8)">
                            <v-card-title style="color: #CF7C00;">
                                Block Working
                            </v-card-title>
                            <v-card-subtitle style="color: #CF7C00; background-color: rgba(255, 243, 224,0.8);">
                                Block ที่ทำงานอยู่
                            </v-card-subtitle>
                            <v-card-text class="text-end" style="color: #CF7C00;
                                font-weight: bold;
                                font-size: 20px;">
                                {{ work }} <span class="mdi mdi-box-shadow"></span>
                            </v-card-text>
                        </v-img>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col cols="12" md="3">
                <v-hover v-slot="{ hover }">
                    <v-card :elevation="hover ? 10 :
                        showBlockStopShadow ? 20 : 1" :style="showBlockStopShadow ? 'outline: #E65100 solid 2px;' : ''"
                        @click="showBlockStop()" class="rounded-xl" color="deep-orange lighten-4">
                        <v-img class="white--text align-end rounded-xl" max-height="125px"
                            :src="require('~/assets/img-store/blockDown.jpg')"
                            gradient="to bottom, rgba(255, 204, 188,0.8), rgba(255, 204, 188,0.8)">
                            <v-card-title style="color: #E65100;">
                                Block Stop
                            </v-card-title>
                            <v-card-subtitle style="color: #E65100; background-color: rgba(255, 204, 188,0.8);">
                                Block ที่หมดอายุ
                            </v-card-subtitle>
                            <v-card-text class="text-end" style="color: #E65100;
                                font-weight: bold;
                                font-size: 20px;">
                                {{ close }} <span class="mdi mdi-package-variant-closed-remove"></span>
                            </v-card-text>
                        </v-img>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>

        <div v-if="$store.state.deviceMode" style="background-color: white;">
            <v-img class="white--text align-end" max-height="138px"
                :src="showPriceAllShadow ? require('~/assets/img-store/pigmoney1.jpg') :
                    showBlockPendShadow ? require('~/assets/img-store/blockPend1.jpg') :
                    showBlockWorkShadow ? require('~/assets/img-store/blockWork1.jpg') :
                    showBlockStopShadow ? require('~/assets/img-store/blockDown.jpg') : ''"
                :gradient="showPriceAllShadow ? 'to bottom, rgba(200, 230, 201,0.8), rgba(200, 230, 201,0.8)' :
                    showBlockPendShadow ? 'to bottom, rgba(187, 222, 251,0.8), rgba(187, 222, 251,0.8)' :
                    showBlockWorkShadow ? 'to bottom, rgba(255, 243, 224,0.8), rgba(255, 243, 224,0.8)' :
                    showBlockStopShadow ? 'to bottom, rgba(255, 204, 188,0.8), rgba(255, 204, 188,0.8)' : ''">
                <div class="d-flex justify-space-around align-center pt-4">
                    <v-btn large icon @click="showPriceAll()" :color="showPriceAllShadow ? '#388E3C' : ''">
                        <v-icon>
                            mdi-hand-coin
                        </v-icon>
                    </v-btn>
                    <v-btn large icon @click="showBlockPend()" :color="showBlockPendShadow ? '#303F9F' : ''">
                        <v-icon>
                            mdi-help-box-multiple
                        </v-icon>
                    </v-btn>
                    <v-btn large icon @click="showBlockWorking()" :color="showBlockWorkShadow ? '#CF7C00' : ''">
                        <v-icon>
                            mdi-box-shadow
                        </v-icon>
                    </v-btn>
                    <v-btn large icon @click="showBlockStop()" :color="showBlockStopShadow ? '#E65100' : ''">
                        <v-icon>
                            mdi-package-variant-closed-remove
                        </v-icon>
                    </v-btn>
                </div>
                <div v-if="showBlockWorkShadow" class="text-center mt-3" style="color: #CF7C00; background-color: rgba(255, 243, 224,0.5);">
                    <h3>Block Working</h3>
                    block ที่ทำงานอยู่ {{ work }} <span class="mdi mdi-box-shadow"></span>
                </div>
                <div v-if="showBlockStopShadow" class="text-center mt-3" style="color: #E65100; background-color: rgba(255, 204, 188,0.5);">
                    <h3>Block Stop</h3>
                    block ที่หมดอายุ {{ close }} <span class="mdi mdi-package-variant-closed-remove"></span>
                </div>
                <div v-if="showBlockPendShadow" class="text-center mt-3" style="color: #303F9F; background-color: rgba(187, 222, 251,0.5);">
                    <h3>Block Pending</h3>
                    block ที่รอทำงาน {{ pend }} <span class="mdi mdi-help-box-multiple"></span>
                </div>
                <div v-if="showPriceAllShadow" class="text-center mt-3" style="color: #388E3C; background-color: rgba(200, 230, 201,0.5);">
                    <h3>Price All</h3>
                    ราคาทั้งหมด {{ formatBathSend(priceAll) }} ฿
                </div>
            </v-img>
        </div>
    </div>
</template>
<script>
import { EventBus } from '~/plugins/EventBus'
import { formatBath } from '~/services/format-number';
export default {
    data() {
        return {
            priceAll: 0,
            work: 0,
            close: 0,
            pend: 0,
            showPriceAllShadow: false,
            showBlockWorkShadow: true,
            showBlockStopShadow: false,
            showBlockPendShadow: false
        }
    },
    methods: {
        formatBathSend(item) {
            return formatBath(item)
        },
        showPriceAll() {
            EventBus.$emit('showPriceAll')
            this.showPriceAllShadow = true
            this.showBlockWorkShadow = false
            this.showBlockStopShadow = false
            this.showBlockPendShadow = false
        },
        showBlockWorking() {
            EventBus.$emit('showBlockWork')
            this.showBlockWorkShadow = true
            this.showBlockStopShadow = false
            this.showPriceAllShadow = false
            this.showBlockPendShadow = false
        },
        showBlockStop() {
            EventBus.$emit('showBlockStop')
            this.showBlockStopShadow = true
            this.showBlockWorkShadow = false
            this.showPriceAllShadow = false
            this.showBlockPendShadow = false
        },
        showBlockPend() {
            EventBus.$emit('showBlockPend')
            this.showBlockPendShadow = true
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