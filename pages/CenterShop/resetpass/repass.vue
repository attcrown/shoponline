<template>
    <v-card v-if="ClickMode" :class="!$store.state.deviceMode ? 'container rounded-xxl' : 'container'" class="text-center fontsProRepass"
        max-width="500px"
        elevation="16">
        <v-form ref="form" v-model="valid" lazy-validation>
            <div style="color: rgb(0, 60, 255);">
                เมื่อทำการยืนยันกรุณาตรวจสอบข้อมูลใน Email ของท่าน <br> เพื่อขอเปลี่ยนรหัสผ่าน
            </div>
            <v-text-field 
                v-model="email" 
                :rules="emailRules" prepend-icon="mdi mdi-email-outline" 
                label="E-mail" required>
            </v-text-field>
        </v-form>
        <v-btn class="mx-3" color="primary" @click="ClickMode = !ClickMode, sendSelectMenu(true)">
            ย้อนกลับ
        </v-btn>
        <v-btn :disabled="!valid" class="mx-3" color="success" @click="validate">
            ยืนยัน
        </v-btn>
    </v-card>
</template>
<script>
import Vue from 'vue';
import { PostSelectMenu } from './selectmenu.vue';
export const PostRpass = new Vue();
export default {
    data: () => ({
        deviceMode: true,
        valid: true,
        ClickMode: false,
        email: null,
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
    }),
    created() {
        PostRpass.$on('ShowPass', (item, callback) => {
            this.ShowPass(item, callback);
        })
    },
    
    methods: {
        ShowPass(item, callback) {
            this.ClickMode = item
            callback('success pass');
        },
        sendSelectMenu(item) {
            PostSelectMenu.$emit('ShowMenu', item, (callback) => {
                console.log(callback);
            })
        },

        validate() {
            if (this.$refs.form.validate()) {
                this.resetPass();
            }
        },
        resetPass() {
            const auth = this.$fireModule.auth();
            auth.sendPasswordResetEmail(this.email).then(
                () => {
                    //snackbar
                    this.$router.push('/CenterShop/login');
                }
            )
        }
    }
}
</script>

<style>
.fontsProRepass {
    font-family: 'Prompt', sans-serif;
    font-weight: 300;
}
</style>