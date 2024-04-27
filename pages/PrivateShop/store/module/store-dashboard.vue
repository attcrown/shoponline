<template>
    <div class="fontsStore">
        <div :class="!$store.state.deviceMode ? 'd-flex' : ''">
            <v-card elevation="1"                
                class="rounded-xl m-3"
                :class="!$store.state.deviceMode ? 'me-0' : ''"
                :width="!$store.state.deviceMode ? '100%' : ''"
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
            <div class="d-flex justify-space-between m-3"
                :class="!$store.state.deviceMode ? 'ms-2' : ''" 
                :style="!$store.state.deviceMode ? 'width: 100%;' : ''">
                <v-card elevation="1"
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
                <v-card elevation="1"
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
            </div>
        </div>
    </div>
</template>
<script>
import { formatBath, formatInt } from '~/services/format-number';
export default {
    data() {
        return {
            priceAll: 0 ,
            work: 0, 
            close: 0
        }
    },
    methods: {
        formatBathSend(item){
            return formatBath(item)
        }
    }

}
</script>
<style>
.fontsStore {
    font-family: 'Prompt', sans-serif;
}
</style>