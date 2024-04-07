<template>
    <div>
        <div :class="!$store.state.deviceMode ? 'd-flex' : ''">
            <div class="mt-10 mx-5" :style="!$store.state.deviceMode ? 'width: 30%' : ''">
                <v-banner class="text-center rounded-lg" color="white" elevation="10">
                    Add item <v-icon>mdi-plus-circle</v-icon>
                </v-banner>
                <v-form ref="form" class="mt-5" v-model="valid" lazy-validation>
                    <v-text-field v-model="items.name" :counter="50" :rules="nameRules" label="Name Product" required>
                    </v-text-field>

                    <v-textarea v-model="items.detail" auto-grow :rules="[v => !!v || 'โปรดระบุข้อมูล']" label="Detail"
                        required></v-textarea>

                    <v-text-field v-model="items.price" type="number" :rules="nameRules" label="Price"
                        required></v-text-field>

                    <v-text-field v-model="items.stockItems" type="number" :rules="nameRules" label="units"
                        required></v-text-field>

                    <v-text-field v-model="items.discount" type="number" :rules="nameRules" label="ส่วนลด"
                        append-icon="mdi-percent" required></v-text-field>

                    <div v-if="items.discount" class="text-center border p-3 rounded-lg">
                        เริ่มโปรโมชั่น
                        <div class="d-flex">
                            <v-text-field type="date" v-model="items.dateFirst" :rules="[v => !!v || 'โปรดระบุข้อมูล']"
                                class="mr-5"></v-text-field>
                            <v-text-field type="time" v-model="items.timeFirst"
                                :rules="[v => !!v || 'โปรดระบุข้อมูล']"></v-text-field>
                        </div>
                        สิ้นสุดโปรโมชั่น
                        <div class="d-flex">
                            <v-text-field type="date" v-model="items.dateEnd" :rules="[v => !!v || 'โปรดระบุข้อมูล']"
                                class="mr-5"></v-text-field>
                            <v-text-field type="time" v-model="items.timeEnd"
                                :rules="[v => !!v || 'โปรดระบุข้อมูล']"></v-text-field>
                        </div>                        
                    </div>

                    <v-text-field v-model="items.view" type="number" :rules="nameRules" label="view"
                        required></v-text-field>

                    <v-text-field v-model="items.seller" type="number" :rules="nameRules" label="ยอดขาย"
                        required></v-text-field>

                    <v-text-field v-model="items.star" type="float" :rules="nameRules" label="star 1-5"
                        required></v-text-field>

                    <v-checkbox v-model="items.goodSell" label="สินค้าขายดี" value="false"></v-checkbox>

                    <v-checkbox v-model="items.top" label="Top" value="false" class="mt-0"></v-checkbox>

                </v-form>
            </div>

            <v-divider :vertical="!$store.state.deviceMode" color="black" class="mt-3"></v-divider>

            <div class="mt-10" :style="!$store.state.deviceMode ? 'width: 70%' : ''">
                <review ref="review"></review>
            </div>
            <LoadingItem v-if="loading"></LoadingItem>
        </div>
        <div class="mx-5 mb-5">
            <v-btn color="success" @click="validate">
                submit
            </v-btn>
        </div>
    </div>

</template>
<script>
import { formatDatetime } from '~/services/formatDatetime';
import review from './review.vue'
import { DateTime } from 'luxon';
import LoadingItem from '~/components/LoadingItem.vue';
export default {
    data() {
        return {
            valid: true,
            loading: true,
            items: [],
            nameRules: [
                v => !!v || 'โปรดระบุข้อมูล',
                v => (v && v.length <= 50) || 'โปรดระบุข้อมูลไม่เกิน 50 ตัวอักษร',
            ],
            timeZone:'Asia/Bangkok'
        }
    },
    components: {
        LoadingItem,
        review
    },

    watch: {
        'items': function (newVal, oldVal) {
            if (this.$refs.review) this.$refs.review.items = this.items
        },
        'items.dateEnd': function () {
            this.items.utcDateEnd = formatDatetime(this.items.dateEnd, this.items.timeEnd)
            if (this.$refs.review) this.$refs.review.items = this.items
        },
        'items.timeEnd': function () { 
            this.items.utcDateEnd = formatDatetime(this.items.dateEnd, this.items.timeEnd)
            if (this.$refs.review) this.$refs.review.items = this.items
        },
        'items.dateFirst': function () {
            this.items.utcDateFirst = formatDatetime(this.items.dateFirst, this.items.timeFirst)
            if (this.$refs.review) this.$refs.review.items = this.items
        },
        'items.timeFirst': function () { 
            this.items.utcDateFirst = formatDatetime(this.items.dateFirst, this.items.timeFirst)
            if (this.$refs.review) this.$refs.review.items = this.items
        }
    },

    mounted() {
        this.loading = false
    },
    methods: {
        async validate() {
            this.$refs.form.validate()
        },

        timeZoneUTC(date, time) {
            if (!date || !time) return
            // แปลงวันที่ yyyy-MM-dd
            const dateFormat = DateTime.fromISO(date).toFormat('yyyy-MM-dd');
            // สร้างวันเวลาท้องถิ่น
            const isoDateTime = DateTime.fromISO(`${dateFormat}T${time}:00`);

            return isoDateTime
        },
    }
}
</script>