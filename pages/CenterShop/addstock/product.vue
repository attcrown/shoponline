<template>
    <div>
        <div :class="!$store.state.deviceMode ? 'd-flex' : ''">
            <div class="mt-10 mx-5"
                :style="!$store.state.deviceMode ? 'width: 25%; overflow-y: auto; overflow-x: hidden; height: 84vh' : ''">
                <v-banner class="text-center rounded-lg" color="white" elevation="10">
                    {{ modeStatus ? 'Edit' : 'Add' }} item <v-icon>mdi-plus-circle</v-icon>
                </v-banner>

                <!-- add IMG & Control -->
                <div class="d-flex align-center justify-center mt-5">
                    <draggable v-if="itemsImg.length > 0" v-model="itemsImg" @end="onDragEnd"
                        class="d-flex justify-center justify-centeralign-content-start flex-wrap mt-3">
                        <div v-for="item in itemsImg" :key="item.src" class="d-flex justify-between">
                            <v-img :src="item.src" type="button" style="width: 90px; height: 90px; cursor: all-scroll;"
                                class="me-3 mb-3 rounded-lg">
                                <div class="d-flex justify-space-between">
                                    <p class="p-1" style="color: aliceblue; background-color: rgba(0, 0, 0, 0.5);">
                                        {{ itemsImg.indexOf(item) + 1 }}
                                    </p>
                                    <v-btn icon small @click="itemsImg.splice(itemsImg.indexOf(item), 1)">
                                        <v-icon color="error">mdi-close-circle-outline</v-icon>
                                    </v-btn>
                                </div>
                            </v-img>
                        </div>
                        <v-hover v-slot="{ hover }" v-if="itemsImg.length < unitImg">
                            <v-card :elevation="hover ? 16 : 2" width="50" height="50" @click="openFileInput()"
                                class="d-flex align-center justify-center">
                                <v-icon>mdi-plus</v-icon>
                            </v-card>
                        </v-hover>
                    </draggable>
                    <div v-if="itemsImg.length === 0"
                        :style="!$store.state.deviceMode ? 'width: 350px;' : 'width: 100%;'">
                        <div class="d-flex align-center justify-center">
                            <!-- alert -->
                            <span style="color: red" class="outlined me-3">กรุณาเพิ่มรูปภาพ</span>
                            <!-- btn add img -->
                            <v-hover v-slot="{ hover }">
                                <v-card :elevation="hover ? 16 : 2" width="50" height="50" @click="openFileInput()"
                                    class="d-flex align-center justify-center">
                                    <v-icon>mdi-plus</v-icon>
                                </v-card>
                            </v-hover>
                        </div>
                    </div>
                </div>
                <!-- Upload IMG -->
                <v-file-input ref="fileInput" v-model="jpgUpload" v-show="false" multiple small-chips
                    label="เพิ่มรูปภาพ" accept="image/png, image/jpeg, image/bmp">
                </v-file-input>

                <v-form ref="form" class="mt-5" v-model="valid" lazy-validation>
                    <v-text-field v-model="items.name" :counter="50" :rules="nameRules" label="Name Product" required>
                    </v-text-field>

                    <v-textarea v-model="items.detail" auto-grow :rules="[v => !!v || 'โปรดระบุข้อมูล']" label="Detail"
                        required></v-textarea>

                    <v-text-field v-model="items.price" type="number" :rules="floatRules" label="Price" required
                        hide-spin-buttons></v-text-field>

                    <v-text-field v-model="items.stockItems" type="number" :rules="numberRules" label="units" required
                        hide-spin-buttons></v-text-field>

                    <v-text-field v-model="items.discount" type="number" :rules="floatDiscountRules" label="ส่วนลด" append-icon="mdi-percent"
                        hide-spin-buttons></v-text-field>

                    <div v-if="items.discount" class="text-center border p-3 rounded-lg">
                        วันที่เริ่ม-สิ้นสุดโปรโมชั่น
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="dates"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="dates" :rules="[v => v.length >= 1 || 'กรุณาเลือกวันที่']"
                                    multiple chips small-chips label="วันที่จัดโปรโมชั่น" append-icon="mdi-calendar"
                                    readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="dates" multiple no-title scrollable required>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu = false">
                                    Cancel
                                </v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save(dates)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>

                        เวลาที่เริ่ม-สิ้นสุดโปรโมชั่น
                        <div class="d-flex">
                            <v-text-field type="time" v-model="items.timeFirst" :rules="[v => !!v || 'โปรดระบุข้อมูล']"
                                class="mr-4"
                                :messages="[`${items.timeFirst ? items.timeFirst + 'นน.' : 'โปรดระบุข้อมูล'}`]"></v-text-field>
                            <v-text-field type="time" v-model="items.timeEnd" :rules="[v => !!v || 'โปรดระบุข้อมูล']"
                                :messages="[`${items.timeEnd ? items.timeEnd + 'นน.' : 'โปรดระบุข้อมูล'}`]"></v-text-field>
                        </div>
                    </div>

                    <v-text-field v-model="items.view" type="number" :rules="numberRules" label="view" required
                        hide-spin-buttons></v-text-field>

                    <v-text-field v-model="items.seller" type="number" :rules="numberRules" label="ยอดขาย" required
                        hide-spin-buttons></v-text-field>

                    <v-text-field v-model="items.star" type="number" :rules="floatRules" label="star 1-5"
                        required></v-text-field>

                    <v-checkbox v-model="items.goodSell" label="สินค้าขายดี"></v-checkbox>

                    <v-checkbox v-model="items.top" label="Top" class="mt-0"></v-checkbox>

                </v-form>
            </div>

            <v-divider :vertical="!$store.state.deviceMode" color="black" class="mt-3"></v-divider>

            <div class="mt-10" :style="!$store.state.deviceMode ? 'width: 75%' : ''">
                <review ref="review"></review>
            </div>
        </div>

        <div class="m-5 text-center">
            <v-btn color="success" @click="validate" :disabled="!valid" :loading="loading" class="px-1 pe-2">
                <span class="mdi mdi-database-plus me-2 text-h6"></span>
                {{ modeStatus ? 'UPDATE' : 'ADD' }} ITEMS
            </v-btn>
            <v-btn color="warning" @click="reset" class="px-1 pe-2">
                <span class="mdi mdi-delete-empty me-2 text-h6"></span>
                CLEAR
            </v-btn>
        </div>
        <LoadingItem v-if="loading"></LoadingItem>
        <AlertButtom ref="AlertButtom"></AlertButtom>
    </div>

</template>
<script>
import { EventBus } from '~/plugins/EventBus';
import { createItems, updateItems } from '~/services/items-firebase';
import { v4 as uuidv4 } from 'uuid';
import draggable from "vuedraggable";
import { processImg } from "~/services/img-sizing";
import { checkDateNow } from '~/services/formatDatetime';
import AlertButtom from '~/components/AlertButtom.vue';
import review from './review.vue'
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
            numberRules: [
                v => !!v || 'โปรดระบุข้อมูล',
                v => /^[0-9]+$/.test(v) || 'โปรดระบุข้อมูลเป็นตัวเลข',
            ],
            floatRules: [
                v => !!v || 'โปรดระบุข้อมูล',
                v => /^[0-9]+(\.[0-9]+)?$/.test(v) || 'โปรดระบุข้อมูลเป็นตัวเลข',
            ],
            floatDiscountRules: [
                v => (v === undefined || v === '' || /^[0-9]+(\.[0-9]+)?$/.test(v)) || 'โปรดระบุข้อมูลเป็นตัวเลข',
            ],
            timeZone: 'Asia/Bangkok',
            menu: false,
            dates: [],

            jpgUpload: [],
            itemsImg: [],
            unitImg: 6,
            modeStatus: false,
        }
    },

    components: {
        LoadingItem,
        review,
        AlertButtom,
        draggable
    },

    watch: {
        'items': function () {
            if (this.$refs.review) this.$refs.review.items = this.items
        },
        'items.discount': function () {
            if (parseInt(this.items.discount) > 100) this.items.discount = 100
            if (parseInt(this.items.discount) < 0) this.items.discount = 0
            if (this.items.discount === '0' || !this.items.discount) {
                this.dates = []
                this.items.dates = null
                this.items.timeFirst = null
                this.items.timeEnd = null
            }
        },
        'dates': function () {
            this.items.dates = this.dates
        },
        'jpgUpload': async function () {
            for (const img in this.jpgUpload) {
                let result = await processImg(this.jpgUpload[img])
                if (this.itemsImg.length >= this.unitImg) {
                    this.$refs.AlertButtom.snackbar = true
                    this.$refs.AlertButtom.colorAlart = 'red'
                    this.$refs.AlertButtom.text = 'ไม่สามารถเพิ่มรูปภาพได้เกิน 6 รูป'
                    break
                }
                this.itemsImg.push({ src: URL.createObjectURL(result), value: result })
            }
        },
        'itemsImg': function () {
            this.items.imgs = this.itemsImg;
            if (this.$refs.review) this.$refs.review.imgs = this.items.imgs
        }
    },
    created() {
        EventBus.$on('editItem', (itemEdit) => {
            let items = { ...itemEdit }
            this.items = items
            this.itemsImg = items.imgs
            this.dates = items.dates
            this.modeStatus = true
        })
    },

    mounted() {
        this.loading = false
    },
    methods: {
        onDragEnd(evt) {
            // console.log("Drag ended:", evt);
        },
        openFileInput() {
            this.$refs.fileInput.$refs.input.click();
        },
        validate() {
            if (this.$refs.form.validate()) this.save()
        },

        async save() {
            this.loading = true;
            let id = uuidv4()
            let result = false

            if (!this.modeStatus) {
                this.items = {
                    ...this.items,
                    id: id,
                    createdUser: this.$store.state.uid,
                    createdAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
                    updatedAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
                    deletedAt: null
                }                
                result = await createItems(this.items)
                EventBus.$emit('refreshEditItem')
            } else {
                this.items.updatedAt = this.$fireModule.firestore.FieldValue.serverTimestamp()
                result = await updateItems(this.items)
                EventBus.$emit('refreshEditItem')
            }

            this.loading = false;
            if (result) {
                this.$refs.AlertButtom.snackbar = true
                this.$refs.AlertButtom.colorAlart = 'green'
                this.$refs.AlertButtom.text = 'บันทึกข้อมูลสําเร็จ'
                this.$refs.AlertButtom.icon = 'mdi mdi-check-circle-outline'
                this.reset()
            } else {
                this.$refs.AlertButtom.snackbar = true
                this.$refs.AlertButtom.colorAlart = 'red'
                this.$refs.AlertButtom.text = 'บันทึกข้อมูลไม่สําเร็จ'
                this.$refs.AlertButtom.icon = 'mdi mdi-alert-circle'
            }
        },

        reset() {
            this.$refs.form.reset()
            this.items = []
            this.itemsImg = []
            this.dates = []
            this.jpgUpload = []
            this.modeStatus = false
        }
    }
}
</script>