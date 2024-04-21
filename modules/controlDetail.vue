<template>
    <div :class="!$store.state.deviceMode ? 'ms-5' : 'mt-5'" class="fontsProDetail">
        <v-card outlined style="border: 0px;">
            <v-card-title style="padding: 0px;">
                <v-chip v-if="items.top" label color="#B71C1C" text-color="white" small class="px-1 me-2"><i
                        class="mdi mdi-shopping me-1"></i>Top</v-chip>
                <v-chip v-if="items.goodSell" label color="orange" text-color="white" small class="px-1 me-2">
                    <i class="mdi mdi-charity me-1"></i>สินค้าขายดี</v-chip>
                &nbsp; {{ items.name }}
            </v-card-title>
            <div class="d-flex align-center">
                <v-rating v-model="rating" background-color="white" color="yellow accent-4" dense half-increments hover
                    style="margin-top: -15px; margin-bottom: -15px;" size="18" readonly></v-rating>

                <v-divider class="mx-2" vertical style="border: 1px solid rgb(73, 73, 73); height: 30px"></v-divider>

                <p style="font-size: 12px; color: rgb(73, 73, 73); margin-bottom: -4px;">
                    ขายแล้ว {{ items.seller }} ชิ้น</p>

                <v-divider class="mx-2" vertical style="border: 1px solid rgb(73, 73, 73); height: 30px"></v-divider>

                <p style="font-size: 12px; color: rgb(73, 73, 73); margin-bottom: -4px;">{{ items.view }} view</p>
            </div>

            <v-divider style="border: 1px solid #B71C1C; margin-top: 4px"></v-divider>

            <v-navigation-drawer dark src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" width="100%" permanent
                v-if="items.discount">
                <div :class="!$store.state.deviceMode ? 'd-flex align-center justify-space-between' : ''">
                    <div class="ms-5 d-flex" style="color: white;">
                        <i class="mdi mdi-alpha-f"></i>
                        <i class="mdi mdi-flash"></i>
                        <i class="mdi mdi-alpha-a"></i>
                        <i class="mdi mdi-alpha-s"></i>
                        <i class="mdi mdi-alpha-h me-3"></i>
                        <i class="mdi mdi-alpha-s"></i>
                        <i class="mdi mdi-alpha-a"></i>
                        <i class="mdi mdi-alpha-l"></i>
                        <i class="mdi mdi-alpha-e"></i>
                    </div>
                    <div class="mx-5" style="color: white; font-size: 16px;">
                        <i class="mdi mdi-clock-time-eight-outline"></i> จบใน
                        <v-chip label outlined class="px-1">
                            <div v-if="String(hour).length == 1">0</div>
                            {{ hour }}
                        </v-chip>
                        <v-chip label outlined class="px-1">
                            <div v-if="String(min).length == 1">0</div>
                            {{ min }}
                        </v-chip>
                        <v-chip label outlined class="px-1">
                            <div v-if="String(seconds).length == 1">0</div>
                            {{ seconds }}
                        </v-chip>

                        <v-tooltip bottom v-if="items.discount && items.dates">
                            <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                    mdi-help-circle-outline
                                </v-icon>
                            </template>
                            จัดโปรโมชั่น
                            <div v-for="(dates, index) in sortedFormattedDates" :key="index">
                                {{ dates }} : {{ items.timeFirst }}-{{ items.timeEnd }}
                            </div>
                        </v-tooltip>
                    </div>
                </div>
            </v-navigation-drawer>

            <div class="d-flex align-center p-3" style="background-color: rgb(73, 73, 73, 0.1);">
                <span style="text-decoration: line-through; color: rgb(171, 171, 171);"
                    :style="$store.state.deviceMode ? 'font-size: 11px;' : 'font-size: 16px;'"
                    v-if="items.discount && items.price">
                    ฿{{ formatBath(priceUnit(items.price, countItems)) }}
                </span>

                <span class="ms-3" style="color: #0240aa;" :style="$store.state.deviceMode ? 'font-size: 16px;' : ''">
                    ฿{{ formatBath(sale(items.price, items.discount, countItems)) }}
                </span>

                <v-chip dark color="#B71C1C" class="px-1 ms-3" small label v-if="items.discount">
                    {{ items.discount }}% ส่วนลด<i class="mdi mdi-sale ms-1"></i>
                </v-chip>
            </div>

            <v-textarea style="font-size: 16px;" v-model="items.detail" auto-grow readonly></v-textarea>

            <v-card-text class="px-0">
                จำนวน
                <v-btn fab class="mx-2" width="25px" height="25px" dark color="#0240aa" @click="countItems--">
                    <v-icon>
                        mdi-minus
                    </v-icon>
                </v-btn>

                <input type="number" style="border: 1px solid rgb(171, 171, 171);                      
                        width: 60px; text-align: end;
                        border-radius: 5px;" class="text-center" v-model="countItems"></input>

                <v-btn fab class="mx-2" width="25px" height="25px" dark color="#0240aa" @click="countItems++">
                    <v-icon>
                        mdi-plus
                    </v-icon>
                </v-btn>

                เหลือ {{ items.stockItems }} ชิ้น
            </v-card-text>


            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small color="#0240aa" dark 
                    style="font-size: 16px;">
                    ซื้อ
                </v-btn>
                <v-btn small color="#0240aa" outlined 
                    style="font-size: 16px;" @click="addCart()">
                    <span class="mdi mdi-cart-plus text-h5"></span>
                    เพิ่มใส่ตะกร้า
                </v-btn>
            </v-card-actions>
        </v-card>
        <AlertButtom ref="AlertButtom"></AlertButtom>
    </div>
</template>
<script>
import { priceCalculate, unitCalculate } from '~/services/calculate-service.js'
import { saveBasket } from '~/services/basket-firebase'
import AlertButtom from '~/components/AlertButtom.vue'
export default {
    data() {
        return {
            rating: 4.3,
            items: [],
            seconds: 39,
            min: 59,
            hour: 1,
            countItems: 1,
        }
    },
    components: {
        AlertButtom
    },
    computed: {
        sortedFormattedDates() {
            // ["2024-03-01","2024-03-04" ]
            this.items.dates = this.items.dates.sort((a, b) => new Date(a) - new Date(b))
            return this.items.dates
        }        
    },
    watch: {
        'seconds': function () {
            setTimeout(() => {
                this.settimeSeconds();
            }, 1000);
        },
        'countItems': function (newVal) {
            if (parseInt(newVal) >= this.items.stockItems) {
                this.countItems = this.items.stockItems
            } else if (parseInt(newVal) <= 1) {
                this.countItems = 1
            }
        },
        'items.star': function () {
            this.rating = parseFloat(this.items.star)
        },
        'items.stockItems': function (newVal) {
            if (parseInt(newVal) < this.countItems) {
                this.countItems = parseInt(newVal)
            }
        }
    },
    mounted() {        
        window.addEventListener('resize', this.checkSizeTablet)
    },

    methods: {
        settimeSeconds() {
            if (this.seconds === 0) {
                if (this.min == 0) {
                    if (this.hour == 0) {
                        this.items.discount = 0
                        return
                    } else {
                        this.hour--                        
                    }
                    this.min = 59
                } else {
                    this.min--
                }
                this.seconds = 60
            } else {
                this.seconds--
            }
        },
        sale(price, discount ,countItems) {
            return priceCalculate(price, discount ,countItems)
        },
        priceUnit(price, countItems) {
            return unitCalculate(price, countItems)
        },
        formatBath(price) {
            // 1,000.00 | 1,000,000.00 | 1,000,000.00
            return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        async addCart() {
            if (this.items.stockItems < 1) {
                this.$refs.AlertButtom.snackbar = true
                this.$refs.AlertButtom.text = 'สินค้าหมด'
                this.$refs.AlertButtom.colorAlart = 'red'
                this.$refs.AlertButtom.icon = 'mdi mdi-alert-circle'
                return
            }else{
                const result = await saveBasket(this.countItems , this.items)
                if(!result.status) {
                    this.$refs.AlertButtom.snackbar = true
                    this.$refs.AlertButtom.text = result.msg
                    this.$refs.AlertButtom.colorAlart = 'red'
                    this.$refs.AlertButtom.icon = 'mdi mdi-alert-circle'
                    return
                }
                this.$refs.AlertButtom.snackbar = true
                this.$refs.AlertButtom.text = result.msg
                this.$refs.AlertButtom.colorAlart = 'green'
                this.$refs.AlertButtom.icon = 'mdi mdi-cart-plus'
                return
            }
        }
    }
}
</script>

<style>
.fontsProDetail {
    font-family: 'Prompt', sans-serif;
    font-weight: 100;
    font-size: 25px;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>