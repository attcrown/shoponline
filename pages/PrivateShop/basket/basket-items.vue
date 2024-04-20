<template>
    <div>
        <div :class="!$store.state.deviceMode ? 'd-flex justify-center mt-8' : 'mx-2'">
            <div :style="!$store.state.deviceMode ? 'width: 1000px;' : ''" class="fontsProBasket">
                <div v-if="itemsAll.length === 0" class="text-center" style="font-size: 24px;">
                    ไม่พบสินค้าที่เลือกไว้....
                </div>
                <div v-if="itemsAll.length !== 0">
                    <div class="d-flex align-center justify-space-between">
                        <v-checkbox v-model="selectItemsAll" @change="clickSelectAll()" label="เลือกทั้งหมด">
                        </v-checkbox>
                        <v-btn text color="error" class="px-0 ps-1" @click="deleteAll()">
                            ลบทั้งหมด <v-icon>mdi mdi-delete</v-icon>
                        </v-btn>
                    </div>

                    <v-card class="p-0 mt-3 mb-5" v-for="(item, index) in itemsAll" :key="index">
                        <v-card-title>
                            <v-checkbox v-model="selectItems" :value="item" :label="item.name">
                            </v-checkbox>
                            <v-spacer></v-spacer>
                            <v-btn icon color="error" @click="deleteItem(item)">
                                <v-icon>mdi mdi-delete</v-icon>
                            </v-btn>
                        </v-card-title>
                        <v-card-text>
                            asdadasd
                        </v-card-text>
                    </v-card>

                    {{ sumPrice }} ฿
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import Swal from 'sweetalert2'
import { formatBath } from '~/services/format-number'
export default {
    data() {
        return {
            selectItemsAll: false,
            itemsAll: [{
                name: 'ชื่อสินค้า1',
                price: 100.25
            }, {
                name: 'ชื่อสินค้า2',
                price: 200.50
            }, {
                name: 'ชื่อสินค้า3',
                price: 300.25
            }, {
                name: 'ชื่อสินค้า4',
                price: 400.50
            }],
            selectItems: [],
            sumPrice: '0'
        }
    },
    watch: {
        'selectItems': function () {
            this.selectItems.length === this.itemsAll.length ? this.selectItemsAll = true : this.selectItemsAll = false
            this.sumPriceSelect()
        }
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
                    this.itemsAll = []
                    this.selectItems = []
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
            }).then((result) => {
                if (result.isConfirmed) {
                    this.itemsAll.splice(this.itemsAll.indexOf(index), 1)
                    this.selectItems = this.itemsAll
                    this.selectItems = []
                }
            })
        },
        sumPriceSelect() {
            let result = 0
            this.selectItems.forEach(element => {
                result += parseFloat(element.price)
            })
            this.sumPrice = formatBath(result)
        }
    }
}
</script>

<style>
.fontsProBasket {
    font-family: 'Prompt', sans-serif;
}
</style>