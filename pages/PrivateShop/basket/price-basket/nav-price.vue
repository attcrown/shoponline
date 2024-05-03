<template>
    <div>
        <div class="fontsPublic pt-2"
            :style="!$store.state.deviceMode ?
                'background-color: #0240aa; color: white; position: fixed; width: 100%; z-index: 100; bottom: 0;' :
                'background-color: rgb(2, 64, 170,0.7); color: white; position: fixed; width: 100%; z-index: 100; bottom: 0; margin-bottom: 57px'">
            <div class="d-flex p-3 align-center"
                :class="!$store.state.deviceMode ? 'justify-space-around' : 'justify-space-between'">
                <div>
                    รวมทั้งหมด
                </div>

                <div v-if="$store.state.deviceMode">
                    {{ sumPrice }} ฿
                </div>
                <v-btn color="success" class="ps-3 ms-3" v-if="$store.state.deviceMode"
                    :disabled="sumPrice < 1" @click="sumPriceSelect()">
                    ชำระเงิน <v-icon>mdi mdi-cash</v-icon>
                </v-btn>

                <div v-if="!$store.state.deviceMode">
                    <div>
                        {{ sumPrice }} ฿
                        <v-btn color="success" x-large class="ps-3 ms-3 pe-3" 
                            :disabled="sumPrice < 1" @click="sumPriceSelect()">
                            ชำระเงิน <v-icon>mdi mdi-cash</v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
        <AlertButtom ref="AlertButtom"></AlertButtom>
    </div>
</template>

<script>
import AlertButtom from '~/components/AlertButtom'
export default {
    data() {
        return {
            sumPrice: '0' ,
            selectItems: [],
        }
    },
    methods: {
        sumPriceSelect() {
            if(this.selectItems.length > 0) {
                this.$refs.AlertButtom.snackbar = true
                this.$refs.AlertButtom.colorAlart = 'green'
                this.$refs.AlertButtom.text = 'ชำระเงินเรียบร้อย'
                this.$refs.AlertButtom.icon = 'mdi mdi-check'
            }else{
                this.$refs.AlertButtom.snackbar = true
                this.$refs.AlertButtom.colorAlart = 'red'
                this.$refs.AlertButtom.text = 'กรุณาเลือกสินค้าที่ต้องการชำระเงิน'
                this.$refs.AlertButtom.icon = 'mdi mdi-alert'
            }
            console.log(this.selectItems)
        }
    },
    components: {
        AlertButtom
    }
}
</script>