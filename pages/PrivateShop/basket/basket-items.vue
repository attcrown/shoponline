<template>
    <div>
        <div v-if="!loading"
            :class="!$store.state.deviceMode ? 'd-flex justify-center mt-8' : 'mx-2'">
            <div :style="!$store.state.deviceMode ? 'width: 1000px;' : ''" class="fontsProBasket">
                <div v-if="itemsAll.length === 0" class="text-center" style="font-size: 24px;">
                    ไม่พบสินค้าที่เลือกไว้....
                </div>
                <div v-if="itemsAll.length !== 0" style="margin-bottom: 100px;">
                    <div class="d-flex align-center justify-space-between">
                        <v-checkbox v-model="selectItemsAll" @change="clickSelectAll()" label="เลือกทั้งหมด">
                        </v-checkbox>
                        <v-btn text color="error" class="px-0 ps-1" @click="deleteAll()">
                            ลบทั้งหมด <v-icon>mdi mdi-delete</v-icon>
                        </v-btn>
                    </div>

                    <v-card class="p-0 mt-3 mb-5" v-for="(item, index) in itemsAll " :key="index">
                        
                        <v-card-title class="ps-3 p-0">
                            <v-checkbox v-model="selectItems" 
                                :value="item" :label="item.name"></v-checkbox>
                            <v-spacer></v-spacer>
                            <v-btn icon color="error" @click="deleteItem(item.idDocs)">
                                <v-icon>mdi mdi-delete</v-icon>
                            </v-btn>
                        </v-card-title>
                        <v-card-text>
                            <div class="d-flex">
                                <v-img :src="item.imgs[0].src"
                                    style="max-width: 90px; height: 90px;" 
                                    class="me-3 mb-3 rounded-lg">
                                </v-img>
                                <div>
                                    <div>
                                        ddd
                                    </div>
                                    <div>
                                        sss
                                    </div>
                                </div>
                            </div>
                            
                            {{ formatBathPro(item.price) }} ฿
                            {{ item.stockItems }} ชิ้น
                            {{ item.countItems }}
                        </v-card-text>
                    </v-card>
                </div>
            </div>
        </div>
        <navPrice ref="navPrice"></navPrice>
        <AlertButtom ref="AlertButtom"></AlertButtom>
        <LoadingItem v-if="loading"></LoadingItem>
    </div>
</template>
<script>
import AlertButtom from '~/components/AlertButtom.vue'
import LoadingItem from '~/components/LoadingItem.vue'
import Swal from 'sweetalert2'
import { formatBath } from '~/services/format-number'
import navPrice from './price-basket/nav-price.vue'
import { getBasketAll ,delBasket} from '~/services/basket-firebase'
export default {
    components: {
        navPrice ,
        AlertButtom ,
        LoadingItem
    },
    data() {
        return {
            loading: true,
            selectItemsAll: false,
            itemsAll: [],
            selectItems: [],
        }
    },
    watch: {
        'selectItems': function () {
            this.selectItems.length === this.itemsAll.length ? this.selectItemsAll = true : this.selectItemsAll = false
            this.sumPriceSelect()
        }
    },
    async mounted() {
        await this.getBasket();
        this.loading = false;
    },
    methods: {
        clickSelectAll() {
            if (this.selectItemsAll) {
                this.selectItems = this.itemsAll
            } else {
                this.selectItems = []
            }
        },
        deleteAll() {
            Swal.fire({
                title: 'ลบสินค้าในตะกร้าทั้งหมด ?',
                text: "คุณต้องการลบรายการสินค้าในตะกร้าทั้งหมด หรือไม่",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#D2D1D1',
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    for(const index in this.itemsAll) {
                        this.delBasketConfirm(this.itemsAll[index].idDocs)
                    }
                }
            })            
        },
        deleteItem(index) {
            Swal.fire({
                title: 'ลบสินค้าในตะกร้า ?',
                text: "คุณต้องการลบรายการสินค้าในตะกร้า หรือไม่!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#D2D1D1',
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel'
            }).then(async(result) => {
                if (result.isConfirmed) {
                    this.delBasketConfirm(index)                    
                }
            })
        },

        async delBasketConfirm(index){
            const result = await delBasket(index)
            if(result){
                this.itemsAll.splice(this.itemsAll.indexOf(index), 1)
                this.selectItems = this.itemsAll
                this.selectItems = []
            }else{
                this.$refs.AlertButtom.snackbar = true
                this.$refs.AlertButtom.colorAlart = 'red'
                this.$refs.AlertButtom.text = 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
                this.$refs.AlertButtom.icon = 'mdi mdi-alert-circle'
            }    
        },
        sumPriceSelect() {
            let result = 0
            this.selectItems.forEach(element => {
                result += parseFloat(element.price)
            })
            this.$refs.navPrice.sumPrice = formatBath(result)
            this.$refs.navPrice.selectItems = this.selectItems
        },

        formatBathPro(price) {
            return formatBath(price)
        },

        async getBasket() {
            const result = await getBasketAll()
            this.itemsAll = result;
            return
        }
    }
}
</script>

<style>
.fontsProBasket {
    font-family: 'Prompt', sans-serif;
}
</style>