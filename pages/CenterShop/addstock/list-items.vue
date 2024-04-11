<template>
    <div :class="$store.state.deviceMode ? 'm-0' : 'm-5'">
        <v-card>
            <v-card-title style="background-color: #0240aa; color: white;">
                รายการสินค้าทั้งหมด
                <v-spacer></v-spacer>
                <!-- <v-btn small @click="searchItemsAll()" class="mx-2">refesh</v-btn> -->
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                    style="max-width: 400px;" hide-details dark></v-text-field>
            </v-card-title>
            <v-data-table sort-by="updatedAt" sort-desc :headers="headers" :items="desserts" :search="search"
                :loading="loading">
                <template v-slot:item.action="{ item }">
                    <div class="mx-0 px-0">
                        <v-btn @click="editItem(item)" small icon>
                            <v-icon class="mdi mdi-pencil" color="#0240aa"></v-icon>
                        </v-btn>
                        <v-btn @click="deleteItem(item)" small icon>
                            <v-icon class="mdi mdi-delete" color="red"></v-icon>
                        </v-btn>
                    </div>
                </template>
                <template v-slot:item.name="{ item }">
                    <div class="d-flex align-center">
                        <div style="width: 40px; height: 40px;" class="me-2">
                            <v-img class="rounded-lg" style="width: 40px; height: 40px;"
                                :src="item.imgs[0].src"></v-img>
                        </div>
                        {{ item.name }}
                    </div>
                </template>

                <template v-slot:item.price="{ item }">
                    <div>
                        <span style="text-decoration: line-through; color: rgb(171, 171, 171); font-size: 10px;"
                            v-if="item.discount && item.price">
                            {{ formatBath(item.price) }} ฿
                        </span>

                        {{ formatBathPro(item.price, item.discount, null) }} ฿

                        <v-tooltip bottom v-if="item.discount && item.dates">
                            <template v-slot:activator="{ on }">
                                <v-icon v-on="on" small>
                                    mdi-help-circle-outline
                                </v-icon>
                            </template>
                            จัดโปรโมชั่น
                            <div v-for="pro in item.dates" :key="pro.discount">
                                {{ pro }} : {{ item.timeFirst }}-{{ item.timeEnd }}
                            </div>
                        </v-tooltip>
                    </div>
                </template>

                <template v-slot:item.stockItems="{ item }">
                    <div>
                        {{ formatInt(item.stockItems ? item.stockItems : 0) }}
                    </div>
                </template>

                <template v-slot:item.seller="{ item }">
                    <div>
                        {{ formatInt(item.seller) }}
                    </div>
                </template>

                <template v-slot:item.view="{ item }">
                    <div>
                        {{ formatInt(item.view) }}
                    </div>
                </template>

                <template v-slot:item.updatedAt="{ item }">
                    <div>
                        {{ formatTimestamp(item.updatedAt) }}
                    </div>
                </template>

                <template v-slot:no-data>
                    <v-btn color="primary" @click="searchItemsAll()">
                        ค้นหาข้อมูล
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
        <AlertButtom ref="AlertButtom"></AlertButtom>
        <LoadingItem v-if="loading"></LoadingItem>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import { EventBus } from '~/plugins/EventBus';
import AlertButtom from '~/components/AlertButtom.vue';
import LoadingItem from '~/components/LoadingItem.vue';
import { formatBath, formatInt } from '~/services/format-number';
import { formatTimestamp } from '~/services/formatDatetime';
import { getItemsAll, delItem } from '~/services/items-firebase';
import {
    priceCalculate,
    unitCalculate
} from '~/services/calculate-service.js'

export default {
    components: {
        AlertButtom, LoadingItem
    },
    data() {
        return {
            loading: true,
            search: '',
            headers: [
                {
                    text: 'Product Name',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Seller', value: 'seller', align: 'start' },
                { text: 'Price', value: 'price', align: 'center' },
                { text: 'View', value: 'view', align: 'start' },
                { text: 'Update', value: 'updatedAt', align: 'center' },
                { text: '', value: 'action', sortable: false, align: 'end' },
            ],
            desserts: [],
        }
    },
    mounted() {
        this.searchItemsAll()
    },
    created() {
        EventBus.$on('refreshEditItem', () => {
            this.searchItemsAll()
        })
    },
    methods: {
        async searchItemsAll() {
            let result = await getItemsAll()
            this.desserts = result
            this.loading = false
        },
        formatTimestamp(timestamp) {
            return formatTimestamp(timestamp)
        },
        formatBathPro(price, discount, countUnit) {
            const result = priceCalculate(price, discount, countUnit)
            return formatBath(result)
        },
        formatBath(priceSend) {
            const price = priceSend
            return formatBath(price)
        },
        formatInt(num) {
            return formatInt(num)
        },
        async deleteItem(items) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#D2D1D1',
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteConfirm(items)
                }
            })            
        },
        editItem(item) {
            EventBus.$emit('editItem', item)
        },

        async deleteConfirm(itemsSend) {
            const items = itemsSend

            this.loading = true
            const result = await delItem(items)
            this.loading = false

            if (result) {
                this.$refs.AlertButtom.snackbar = true
                this.$refs.AlertButtom.colorAlart = 'green'
                this.$refs.AlertButtom.text = 'ลบสินค้าเรียบร้อย'
                this.searchItemsAll()
            } else {
                this.$refs.AlertButtom.snackbar = true
                this.$refs.AlertButtom.colorAlart = 'red'
                this.$refs.AlertButtom.text = 'ลบสินค้าไม่สําเร็จ'
                this.searchItemsAll()
            }
        }
    },
}
</script>