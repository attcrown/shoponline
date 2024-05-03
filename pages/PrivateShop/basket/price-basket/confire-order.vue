<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card class="fontsOrder">
                <v-card-title>
                    รายการที่ต้องชำระเงิน
                </v-card-title>
                <v-card-text>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th class="text-center">#</th>
                                <th>ชื่อสินค้า</th>
                                <th class="text-center">จำนวน</th>
                                <th class="text-center">ราคา</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in items" :key="index">
                                <td class="text-center">{{ index+1 }}</td>
                                <td>{{ item.name }}</td>
                                <td class="text-center">{{ item.countItems }}</td>
                                <td class="text-end">{{ formatBathBasket(checkDateDiscount(item)) }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3" class="text-center">รวมทั้งหมด</td>
                                <td class="text-end">{{ sumPrice }} บาท</td>
                            </tr>
                        </tfoot>
                    </table>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" outlined @click="dialog = false">
                        ยกเลิกคำสั่งซื้อ
                    </v-btn>
                    <v-btn color="success" outlined @click="dialog = false">
                        ชำระเรียบร้อย
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { formatBath } from '~/services/format-number';
import { priceCalculate ,unitCalculate ,dateCalculate } from '~/services/calculate-service.js'
export default {
    data() {
        return {
            dialog: false,
            items: [],
            sumPrice: 0
        }
    },
    watch: {
        'items': {
            handler() {
                this.sumPriceSelect()
            },deep: true,
        }
    },
    methods: {
        formatBathBasket(item){
            return formatBath(item)
        },
        checkDateDiscount(item){
            const result = dateCalculate(item.dates ,item.timeFirst ,item.timeEnd ,null)
            if(result.status) return priceCalculate(item.price ,item.discount ,item.countItems)
            return unitCalculate(item.price ,item.countItems)
        },

        sumPriceSelect() {
            this.sumPrice = 0
            for (const x in this.items) {
                const data = this.items[x]
                this.sumPrice = parseFloat(this.sumPrice) + parseFloat(this.checkDateDiscount(data))
                console.log(this.sumPrice)
            }
            this.sumPrice = this.formatBathBasket(this.sumPrice)
        }
    }
}
</script>

<style>
.fontsOrder {
    font-family: 'Prompt', sans-serif;
    font-weight: 300;
}
</style>