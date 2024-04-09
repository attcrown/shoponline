<template>
    <div :class="$store.state.deviceMode ? 'm-0' : 'm-5'">
        <v-card>
            <v-card-title>
                รายการสินค้าทั้งหมด
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                    hide-details></v-text-field>
            </v-card-title>
            <v-data-table sort-by="updatedAt" sort-desc :headers="headers" :items="desserts" :search="search" :loading="loading">
                <template v-slot:item.action="{ item }">
                    <div class="mx-0 px-0">
                        <v-btn>
                            edit
                        </v-btn>
                        <v-btn>
                            Del
                        </v-btn>
                    </div>
                </template>
                <template v-slot:item.price="{ item }">
                    <div>
                        {{ formatBath(item.price ? item.price : 0) }} ฿
                    </div>
                </template>
                <template v-slot:item.stockItems="{ item }">
                    <div>
                        {{ formatInt(item.stockItems ? item.stockItems : 0) }}
                    </div>
                </template>
                <template v-slot:item.seller="{ item }">
                    <div>
                        {{ formatInt(item.seller ? item.seller : 0) }}
                    </div>
                </template>
                <template v-slot:item.view="{ item }">
                    <div>
                        {{ formatInt(item.view ? item.view : 0) }}
                    </div>
                </template>
                <template v-slot:item.updatedAt="{ item }">
                    <div>
                        {{ formatTimestamp(item.updatedAt ? item.updatedAt : null) }}
                    </div>
                </template>

                <template v-slot:no-data>
                    <v-btn color="primary" @click="searchItemsAll()">
                        ค้นหาข้อมูล
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>
<script>
import { formatBath ,formatInt} from '~/services/format-number';
import { formatTimestamp } from '~/services/formatDatetime';
import { getItemsAll } from '~/services/items-firebase';
export default {
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
    methods: {
        async searchItemsAll(){
            let result = await getItemsAll()
            this.desserts = result
            this.loading = false
        },
        formatTimestamp(timestamp) {
            return formatTimestamp(timestamp)
        },
        formatBath(price) {
            return formatBath(price)  
        },
        formatInt(num) {
            return formatInt(num)
        }
    },
}
</script>