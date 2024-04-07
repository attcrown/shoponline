<template>
    <div :class="!$store.state.deviceMode ? 'ms-5' : 'mt-5'" class="fontsProDetail">
        <v-card outlined style="border: 0px;">
            <v-card-title style="padding: 0px;">
                <v-chip label color="#B71C1C" text-color="white" small class="px-1"><i
                        class="mdi mdi-shopping me-1"></i>Top</v-chip> &nbsp; {{ items.name }}
            </v-card-title>
            <div class="d-flex align-center">
                <v-rating v-model="rating" background-color="white" color="yellow accent-4" dense half-increments hover
                    style="margin-top: -15px; margin-bottom: -15px;" size="18" readonly></v-rating>

                <v-divider class="mx-2" vertical style="border: 1px solid rgb(73, 73, 73); height: 30px"></v-divider>

                <p style="font-size: 12px; color: rgb(73, 73, 73); margin-bottom: -4px;">
                    ขายแล้ว {{ 50 + Math.floor(Math.random() * 100) }} ชิ้น</p>

                <v-divider class="mx-2" vertical style="border: 1px solid rgb(73, 73, 73); height: 30px"></v-divider>

                <p style="font-size: 12px; color: rgb(73, 73, 73); margin-bottom: -4px;">100 view</p>
            </div>

            <v-divider style="border: 1px solid #B71C1C; margin-top: 4px"></v-divider>

            <v-navigation-drawer dark src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" width="100%" permanent
                v-if="items.discount">
                <div :class="!deviceTabletMode ? 'd-flex align-center justify-space-between' : ''">
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
                    </div>
                </div>
            </v-navigation-drawer>

            <div class="d-flex align-center p-3" style="background-color: rgb(73, 73, 73, 0.1);">
                <span style="font-size: 16px; text-decoration: line-through; color: rgb(171, 171, 171);"
                    v-if="items.discount && items.price">฿{{ priceUnit(items.price) }}</span>
                <span class="ms-3" style="color: #0240aa;">฿{{ sale(items.price, items.discount) }}</span>
                <v-chip dark color="#B71C1C" class="px-1 ms-3" small label v-if="items.discount">
                    {{ items.discount }}% ส่วนลด<i class="mdi mdi-sale ms-1"></i>
                </v-chip>
            </div>

            <v-textarea style="font-size: 16px; color: rgb(171, 171, 171);" v-model="items.detail" auto-grow
                readonly></v-textarea>

            <v-card-text>
                จำนวน
                <v-btn fab class="mx-2" width="25px" height="25px" dark color="#0240aa" @click="countItems--">
                    <v-icon>
                        mdi-minus
                    </v-icon>
                </v-btn>

                <input type="number" style="border: 1px solid rgb(171, 171, 171); 
                        width: 80px; text-align: end;
                        border-radius: 5px;" v-model="countItems"></input>

                <v-btn fab class="mx-2" width="25px" height="25px" dark color="#0240aa" @click="countItems++">
                    <v-icon>
                        mdi-plus
                    </v-icon>
                </v-btn>

                เหลือ {{ items.stockItems ? items.stockItems : 0 }} ชิ้น
            </v-card-text>


            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small color="#0240aa" dark style="font-size: 16px;">ซื้อ</v-btn>
                <v-btn small color="#0240aa" outlined style="font-size: 16px;">
                    <span class="mdi mdi-cart-plus text-h5"></span>
                    เพิ่มใส่ตะกร้า
                </v-btn>
            </v-card-actions>
        </v-card>
        <AlertButtom ref="AlertButtom"></AlertButtom>
    </div>
</template>
<script>
import AlertButtom from '~/components/AlertButtom.vue';
import { checkDateNow } from '~/services/formatDatetime';
export default {
    components: { AlertButtom },
    data() {
        return {
            deviceTabletMode: false,
            rating: 4.3,
            items: [],
            seconds: 5,
            min: 0,
            hour: 1,
            countItems: 1,
        }
    },
    watch: {
        'seconds': function (newVal, oldVal) {
            setTimeout(() => {
                this.settimeSeconds();
            }, 1000);
        },
        'countItems': function (newVal, oldVal) {
            if (parseInt(newVal) >= this.items.stockItems) {
                this.countItems = this.items.stockItems
            } else if (parseInt(newVal) <= 1) {
                this.countItems = 1
            }
        },
        'items.timeEnd': function () {
            if (!this.items.utcDateEnd) return
            this.rateTime(this.items.utcDateFirst,this.items.utcDateEnd)
        },
        'items.dateEnd': function () {
            if (!this.items.utcDateEnd) return
            this.rateTime(this.items.utcDateFirst,this.items.utcDateEnd)
        },
        'items.timeFirst': function () {
            if (!this.items.utcDateFirst) return
            this.rateTime(this.items.utcDateFirst,this.items.utcDateEnd)
        },
        'items.dateFirst': function () {
            if (!this.items.utcDateFirst) return
            this.rateTime(this.items.utcDateFirst,this.items.utcDateEnd)
        }
    },
    mounted() {
        this.settimeSeconds()
        this.checkSizeTablet()
        window.addEventListener('resize', this.checkSizeTablet)
    },

    methods: {
        settimeSeconds() {
            if (this.seconds === 0) {
                if (this.min == 0) {
                    if (this.hour == 0) {
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
        checkSizeTablet() {
            this.deviceTabletMode = window.innerWidth < 1300;
        },
        sale(price, discount) {
            if (!discount) return this.priceUnit(price)
            return this.priceUnit(price) - this.priceUnit(price) * (discount / 100)
        },
        priceUnit(price) {
            if (!price) return 0
            return price * this.countItems
        },
        rateTime(limitUtcDateFirst ,limitUtcDateEnd) {
            const dateTimeInBangkok = checkDateNow(this.$fireModule)
            // console.log('limitStart ',limitUtcDateFirst ,'End ', limitUtcDateEnd,'>>> ',dateTimeInBangkok )

            if(dateTimeInBangkok > limitUtcDateEnd){
                this.items.dateEnd = null
                this.items.timeEnd = null

                this.$refs.AlertButtom.snackbar = true
                this.$refs.AlertButtom.colorAlart = 'red'
                this.$refs.AlertButtom.text = 'วันที่สิ้นสุดต้องมากกว่าวันที่ปัจจุบัน'
                this.$refs.AlertButtom.icon = 'mdi mdi-alert-circle'
            } 

            if(limitUtcDateEnd < limitUtcDateFirst){
                this.items.dateFirst = null
                this.items.timeFirst = null

                this.$refs.AlertButtom.snackbar = true
                this.$refs.AlertButtom.colorAlart = 'red'
                this.$refs.AlertButtom.text = 'วันที่เริ่มต้นต้องน้อยกว่าวันที่สิ้นสุด'
                this.$refs.AlertButtom.icon = 'mdi mdi-alert-circle'
            }

            let limitTime = limitUtcDate.diff(dateTimeInBangkok, ['year','months', 'days', 'hours', 'minutes', 'seconds']).toObject()
            console.log(limitTime)

            // console.log('>>>',dateTimeInBangkok.toISODate()); // Display the converted datetime in ISO format
            // console.log('>>>',dateTimeInBangkok.toFormat('HH:mm:ss')); // Display the converted datetime in ISO format
            // console.log('---',limitUtcDate.toISODate()); // Display the converted datetime in ISO format
            // console.log('---',limitUtcDate.toFormat('HH:mm:ss')); // Display the converted datetime in ISO format
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
</style>