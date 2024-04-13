<template>
    <div>
        <!-- <div style="background-color: #0240aa;" class="pt-3 pb-3">
            <hr class="mx-10" style="border-bottom: 2px solid #212020c0">
        </div> -->
        <div style="background-color: #d7d7d7;">
            <v-container fluid :class="!$store.state.deviceMode ? 'd-flex justify-center' : ''"
                :style="!$store.state.deviceMode ? 'max-width: 1200px' : ''">
                <v-row dense class="fontsProList">
                    <v-col cols="12" class="text-center">
                        <div :style="!$store.state.deviceMode ? 'font-size: 28px' : 'font-size: 18px'" class="mt-5">
                            <v-icon left :color="this.cards.length === 0 ? 'red' : '#FF9800'" style="font-size: 32px;">
                                {{ this.cards.length === 0 ? 'mdi mdi-select-search' : 'mdi-label' }}
                            </v-icon>
                            {{ this.cards.length === 0 ? 'ไม่พบสินค้า กรุณาค้นหาใหม่...' : 'รายการสินค้าแนะนำ' }}
                        </div>
                    </v-col>
                    <v-col v-for="card in cards" :key="card.id" :cols="$store.state.deviceMode ? 6 : 3">
                        <v-hover v-slot="{ hover }">
                            <v-card :elevation="hover ? 16 : 2" :class="!$store.state.deviceMode ? 'm-1' : 'mb-4'" @click="nextToDetail(card)">
                                <v-img :src="card?.imgs[0]?.src" class="white--text align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                                    <v-card-title>
                                        <v-chip v-if="card.discount" color="orange" dark label small>Sale {{ card.discount }}%</v-chip>
                                    </v-card-title>
                                </v-img>

                                <v-card-text>
                                    <p style="margin-bottom: -3px;">{{ formatTextService(card.name) }}</p>
                                    <v-rating v-model="card.star" background-color="white" color="yellow accent-4" dense
                                        half-increments hover size="18" readonly></v-rating>                                    
                                    
                                    <v-chip v-if="card.top" class="ps-1 pe-1" color="#B71C1C" dark label x-small>Top</v-chip>
                                    <v-chip v-if="card.goodSell" class="ps-1 pe-1" color="green" label outlined x-small>สินค้าขายดี</v-chip>
                                    <v-chip v-if="!card.goodSell && !card.top" class="ps-1 pe-1" color="white" label outlined x-small></v-chip>
                                </v-card-text>

                                <v-card-actions 
                                    v-if="!$store.state.deviceMode"
                                    style="margin-top: -20px; color: #FF9800;">                                    
                                    ฿{{ formatBathPro(card.price ,card.discount ,null) }}                                     
                                    <span style="text-decoration: line-through; color: rgb(171, 171, 171); font-size: 10px;"                            
                                        class="ms-2"
                                        v-if="card.discount">
                                        ฿{{ formatBathService(card.price) }}
                                    </span>

                                    <v-spacer></v-spacer> 

                                    <p style="font-size: 12px; color: rgb(73, 73, 73); margin-bottom: -4px;">ขายแล้ว {{ formatIntService(card.seller) }} ชิ้น</p> 
                                </v-card-actions>
                                <div v-if="$store.state.deviceMode"
                                    style="margin-top: -20px; margin-left: 10px; color: #FF9800;">

                                    ฿{{ formatBathPro(card.price ,card.discount ,null) }} 

                                    <div style="text-decoration: line-through; 
                                        color: rgb(171, 171, 171); 
                                        font-size: 10px;">
                                        {{ card.discount ? `฿${formatBathService(card.price)}` : '&nbsp' }}
                                    </div>

                                    <p style="font-size: 12px; color: rgb(73, 73, 73); margin-bottom: -4px;">ขายแล้ว {{ formatIntService(card.seller) }} ชิ้น</p>
                                </div>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        {{ checkShowListItems }}
    </div>
</template>
<script>
import {formatBath ,formatInt ,formatText} from '~/services/format-number';
import { priceCalculate } from '~/services/calculate-service.js'

export default {
    data: () => ({
        rating: 4.3,
        cards: [],
    }),
    computed: {
        checkShowListItems() {
            this.cards = this.$store.state.show_list_item;
        }
    },
    methods: {
        nextToDetail(card) {            
            this.$store.commit('SET_DETAILITEM', card);
            this.$router.push(`/CenterShop/detailshop/#${card.id}#${card.idDocs}`);
        },
        formatBathService(price) {
            return formatBath(price)
        },
        formatBathPro(price ,discount ,countUnit) {
            const result = priceCalculate(price,discount ,countUnit)
            return formatBath(result)
        },
        formatIntService(price) {
            return formatInt(price)
        },
        formatTextService(text) {
            return formatText(text , this.$store.state.deviceMode)
        }
    }
}
</script>
<style>
.fontsProList {
    font-family: 'Prompt', sans-serif;
    font-weight: 300;
}
</style>