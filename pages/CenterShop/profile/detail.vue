<template>
    <div class="fontsDetailUser" :class="$store.state.deviceMode ? 'pb-16' : 'pt-10'">
        <center>
            <v-card class="text-center"
                style="background: white;"
                max-width="1000px" elevation="24" :class="$store.state.deviceMode ? '' : 'rounded-xxl'">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <div class="pt-5">
                        ข้อมูลส่วนตัว
                    </div>
                    <div>
                        <img 
                            class="m-3 rounded-xxl" 
                            :src="previewAvatar ? previewAvatar : $store.state.photoURL" 
                            alt="Uploaded Image" 
                            style="max-width: 150px;">
                    </div>
                    <div class="mb-3 d-flex justify-center" style="margin-top: -30px;">
                        <v-file-input
                            style="max-width: 200px;"
                            accept="image/png, image/jpeg, image/bmp" 
                            v-model='avatar'
                            placeholder="Pick an avatar" 
                            prepend-icon="mdi-camera" 
                            label="Avatar" 
                            @change="onFilePicked"></v-file-input>
                    </div>
                    <v-row dense class="d-flex justify-space-around pb-10">                     
                        <v-col cols="12" md="2">
                            <v-select class="mx-4" v-model="personalData.prefix" :items="selectPrefix"
                                :rules="selectRules" label="Prefix"  required></v-select>
                        </v-col>
                        <v-col cols="12" md="5">
                            <v-text-field class="mx-4" v-model="personalData.first_name" :counter="50" :rules="nameRules"
                                 label="First name" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="5">
                            <v-text-field class="mx-4" v-model="personalData.last_name" :counter="50" :rules="nameRules"
                                 label="Last name" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field class="mx-4" v-model="personalData.user_name" :counter="50" :rules="nameRules"
                                 label="username" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field v-model="personalData.birthday" label="birth day" prepend-icon="mdi-calendar"
                                class="mx-4" readonly  :rules="nameRules" @click="modal = true"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                        </v-col>
                    </v-row>
                    <v-divider color="black" class="mx-5"></v-divider>
                    <div class="pt-5">
                        ที่อยู่ส่วนตัว
                    </div>
                    <v-row dense class="d-flex justify-space-around pb-10">
                        <v-col cols="12" md="3">
                            <v-text-field class="mx-4" v-model="locationAll[0]" :rules="nameRules"
                                 label="บ้านเลขที่" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field class="mx-4" v-model="locationAll[1]" :rules="nameRules"
                                 label="ซอย" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field class="mx-4" v-model="locationAll[2]" :rules="nameRules"
                                 label="หมู่" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field class="mx-4" v-model="locationAll[3]" :rules="nameRules"
                                 label="ถนน" required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-autocomplete v-model="locationAll[4]" 
                                :items="tambons" item-text="name_th" @change="changeTambon($event)"
                                :rules="selectRules" label="แขวง/ตําบล" class="mx-4">
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-autocomplete class="mx-4" v-model="locationAll[5]"
                                :items="amphures" item-text="name_th" 
                                :rules="selectRules" @change="changeAmphures($event)"
                                label="เขต/อําเภอ" required></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-autocomplete class="mx-4" 
                                :items="provinces" item-text="name_th" 
                                v-model="locationAll[6]" :rules="selectRules"
                                label="จังหวัด" required></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field class="mx-4" v-model="locationAll[7]" :rules="[v => !!v || 'โปรดระบุข้อมูล']"
                                 label="รหัสไปรษณีย์" type="number" required></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>

            <v-btn color="#0240aa" dark class="mt-4" @click="validate" :loading="loadingSave">
                save confirm
            </v-btn>
        </center>

        <v-dialog ref="dialog" v-model="modal" :return-value.sync="personalData.birthday" persistent width="290px">
            <v-date-picker v-model="personalData.birthday" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">
                    Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(personalData.birthday)">
                    OK
                </v-btn>
            </v-date-picker>
        </v-dialog>

        <AlertButtom ref="AlertButtom"></AlertButtom>
    </div>
</template>

<script>
import AlertButtom from '~/components/AlertButtom.vue';
import { processImg } from '../../../services/img-sizing.js';
import { saveImgFirebase } from '../../../services/save-img-firebase.js';
import { AMPHURES } from '../../../services/location/thailand_amphures.js';
import { PROVINCES } from '../../../services/location/thailand_provinces.js';
import { TAMBONS } from '../../../services/location/thailand_tambons.js';

export default {
    data() {
        return {
            locationAll: [],
            personalData: [],
            valid: true,
            selectPrefix: ["Mr", "Mrs", "Miss"],
            modal: false,
            avatar: null,
            previewAvatar: null,
            loadingSave: false,

            nameRules: [
                v => !!v || 'กรุณาระบุ "-" ถ้าไม่มีข้อมูล',
                v => (v && v.length <= 50) || 'ตัวอักษรตัวเกิน 50 ตัว',
                v => (v != "|") || 'ห้ามใช้อักษรพิเศษ "|"'
            ],
            selectRules: [
                v => !!v || 'กรุณาระบุ'
            ],
            amphures : AMPHURES,
            provinces : PROVINCES,
            tambons : TAMBONS
        }
    },
    watch: {
        '$store.state.uid': {
            handler: function (newVal, oldVal) { // เรียกใช้งานตอนค่าเปลี่ยน '$store.state.uid'
                this.searchDetail();
            },
            immediate: true // เรียกใช้งานครั้งแรก
        }
    },

    components: {
        AlertButtom
    },
    methods: {
        async searchDetail() {
            if (!this.$store.state.uid) return
            try {
                // const doc = await firebase.firestore().collection('users').doc(this.$store.state.uid).get();            
                const doc = await this.$fire.firestore.collection('users').doc(this.$store.state.uid).get();
                this.personalData = doc.data()
                this.personalData.user_name = await this.$store.state.displayName                
                this.locationAll = this.personalData.location ? this.personalData.location.split("|") : []
            } catch (error) {
                this.alertFail("ไม่พบข้อมูลผู้ใช้งาน")
            }
        },
        alertFail(message) {
            this.$refs.AlertButtom.snackbar = true;
            this.$refs.AlertButtom.colorAlart = 'red';
            this.$refs.AlertButtom.text = message;
            this.$refs.AlertButtom.icon = 'mdi mdi-alert-circle';
            this.loadingSave = false;
        },
        alertSuccess() {
            this.$refs.AlertButtom.snackbar = true;
            this.$refs.AlertButtom.colorAlart = 'success';
            this.$refs.AlertButtom.text = 'บันทึกข้อมูลสําเร็จ';
            this.$refs.AlertButtom.icon = 'mdi mdi-check-circle-outline';
            this.loadingSave = false;
        },
        async validate() {
            this.loadingSave = true

            if (this.$refs.form.validate()) {
                this.personalData.location = this.locationAll.join("|")
                const db = this.$fire.firestore
                const auth = this.$fireModule.auth();
                try {
                    await db.collection('users').doc(this.$store.state.uid)
                        .update({
                            first_name: this.personalData.first_name,
                            last_name: this.personalData.last_name,
                            prefix: this.personalData.prefix,
                            birthday: this.personalData.birthday,
                            location: this.personalData.location
                        });

                    //update auth
                    const user = auth.currentUser;
                    await user.updateProfile({
                        displayName: this.personalData.user_name
                    })

                    this.$store.commit('UPDATE_DISPLAYNAME', this.personalData.user_name);
                    
                    // save img to firebase
                    if(this.personalData.avatar){                        
                        const result = await saveImgFirebase(
                            // files ,path
                            this.personalData.avatar ,
                            `user/${this.$store.state.uid}/avatar.jpg`)

                        this.$store.commit('UPDATE_IMG_PHOTO', result);
                    }   

                    this.alertSuccess()
                } catch (error) {
                    this.alertFail("บันทึกข้อมูลผิดพลาด กรุณาติดต่อผู้ดูแลระบบ")
                    console.log(error)
                }
            } else {
                this.alertFail("กรุณากรอกข้อมูลให้ครบถ้วน")
            }
        },
        
        // แสดงตัวอย่างรูป และบีบอัดภาพ 30kb
        async onFilePicked(){
            if(this.avatar == null) {
                this.previewAvatar = null 
                this.personalData.avatar = null 
                return
            }
            this.personalData.avatar = await processImg(this.avatar)
            this.previewAvatar = URL.createObjectURL(this.personalData.avatar)
        },

        changeTambon(item){
            if(!item) return
            const tambon = this.tambons.find(x => x.name_th == item)
            // เขต/อําเภอ
            const amphures = this.amphures.find(x => x.id == tambon.amphure_id)
            this.locationAll[5] = amphures.name_th
            // จังหวัด
            const provinces = this.provinces.find(x => x.id == amphures.province_id)
            this.locationAll[6] = provinces.name_th
            // รหัสไปรษณีย์
            this.locationAll[7] = parseInt(tambon.zip_code) 
        },
        changeAmphures(item){
            if(!item) return
            const amphures = this.amphures.find(x => x.name_th == item)

            // จังหวัด
            const provinces = this.provinces.find(x => x.id == amphures.province_id)
            this.locationAll[6] = provinces.name_th
        }
    },
}
</script>
<style>
.fontsDetailUser {
    font-family: "Prompt", sans-serif;
    font-weight: 300;
}
</style>