<template>
    <div>
        <div :class="!deviceMode ? 'center-container' : ''" 
            :style="!deviceMode ? 'height: 89vh;' : 'height: 100vh;'" 
            style="background: linear-gradient(to right, #0381f7ad, #78baf094,#78baf094, #0577fa9a);">
            <div class="container fontsMoi text-center mb-10" rounded="xxl"
                style="background-color:transparent; max-width: 500px;">
                <div class="d-flex justify-center">
                    <v-img :src="require('@/assets/logoexchange.png')" style="opacity: 0.8" :max-width="!deviceMode ? 300 : 150"></v-img>
                </div>                
                <h1 class="fw-bold">Exchange Shop <span class="mdi mdi-shopping-outline text-h4"></span></h1>
                <hr style="border-bottom: 2px solid #000">
                <p class="text--secondary font-weight-black fontsPro">
                    <br>ทุกอย่างจะง่ายขึ้นเพียงแค่คลิกเดียวก็เทรดได้แล้ว <br><br>
                    👇ทดลองระบบได้แล้ววันนี้👇
                </p>                
                <v-btn
                    @click="$router.push('/CenterShop/shop')"
                    color="success"
                    dark
                    class="fontsPro"
                    rounded
                    elevation="16">      
                    <div class="ms-3 d-flex justify-center">            
                        ไปหน้าร้านค้า 
                        <v-icon color="#FAFAFA">
                            mdi-chevron-right
                        </v-icon> 
                    </div>                                      
                </v-btn>                
            </div>
            <v-card elevation="5" :class="!deviceMode ? 'container rounded-xxl' : 'container'" max-width="500px"
                style="background-color: rgba(255, 255, 255, 0.401);">
                <h1 class="text-center fontsPro">LOGIN</h1>
                <v-form ref="form" v-model="valid" lazy-validation :disabled="loadingLogin">
                    <v-text-field
                        v-model="register.email" 
                        :rules="emailRules" 
                        prepend-icon="mdi mdi-email-outline"
                        required></v-text-field>

                    <v-text-field 
                        v-model="register.password" 
                        :rules="passRules" 
                        type="password" 
                        prepend-icon="mdi mdi-lock"
                        required></v-text-field>

                    <div class="text-center fontsPro">
                        <v-btn :disabled="!valid" :loading="loadingLogin" color="success" rounded @click="validate">
                            เข้าสู่ระบบ
                            <v-icon right dark>
                                mdi-login
                            </v-icon>
                        </v-btn>
                    </div>
                </v-form>
                <v-card-text class="fontsPro">
                    <a href="#" @click="$refs.signin.dialog = true">หากยังไม่ได้ลงทะเบียน กรุณาลงทะเบียน</a><br><br>
                    <a href="/CenterShop/resetpass">ต้องการเปลี่ยนรหัสผ่าน</a>
                </v-card-text>
            </v-card>
        </div>
        <v-card v-if="!deviceMode">
            <p class="text-center fontsPro pt-1">
                English (UK) ภาษาไทย 日本語 中文(简体) Tiếng Việt Français (France) Deutsch Русский Español Português (Brasil) <br>
                การันตีความปลอดภัยแบบ Real-time ที่ทันสมัยในทุกช่วงการใช้งาน <br>
                Ensuring real-time, cutting-edge security throughout every usage phase. <br>
                © 2024
            </p>
        </v-card>
        <signin ref="signin"></signin>
        <AlertButtom ref="AlertButtom"></AlertButtom>
    </div>
</template>
<script>
import AlertButtom from '~/components/AlertButtom.vue';
import signin from './signin.vue';
export default {
    layout: 'login',
    data: () => ({
        unitClickLogin: 0,
        valid: true,
        deviceMode: true,
        register: [],
        passRules: [
            v => !!v || 'Password is required'
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        loadingLogin: false,

    }),

    components: {
        AlertButtom,
        signin
    },

    watch: {
        'unitClickLogin': function () {
            if (this.unitClickLogin > 5) {
                this.$refs.AlertButtom.snackbar = true;
                this.$refs.AlertButtom.colorAlart = 'red';
                this.$refs.AlertButtom.text = 'คุณกดเกินจํานวนครั้งที่อนุญาตไปแล้ว กรุณาลองอีกครั้งภายหลัง';
            }else{
                this.loadingLogin = false;
            }
        }
    },

    mounted() {
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
    },

    methods: {
        checkMobile() {
            // ตรวจสอบขนาดหน้าจอและกำหนดค่าให้ isMobile
            this.deviceMode = window.innerWidth <= 768; // ตั้งค่าให้เป็น mobile ถ้าขนาดน้อยกว่าหรือเท่ากับ 768 pixels
        },
        async validate() {
            if (this.$refs.form.validate()) {
                this.loadingLogin = true;
                await this.login(this.register);
            }
        },
        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },

        async login(item) {
            const auth = this.$fireModule.auth();
            try {
                const result = await auth.signInWithEmailAndPassword(item.email, item.password);
                if (!result.user.emailVerified) {
                    //snackbar
                    this.$refs.AlertButtom.snackbar = true;
                    this.$refs.AlertButtom.colorAlart = 'red';
                    this.$refs.AlertButtom.text = 'กรุณายืนยันอีเมล';
                }else{
                    this.$store.commit('SET_USER', result.user);
                    this.$router.push('/CenterShop/shop');
                }
            } catch (error) {
                //snackbar
                this.$refs.AlertButtom.snackbar = true;
                this.$refs.AlertButtom.colorAlart = 'red';
                this.$refs.AlertButtom.text = 'ไม่สามารเข้าสู่ระบบได้';
                this.unitClickLogin++;
            }
        }
    }
}
</script>

<style>
.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    /* ทำให้เต็มจอ */
}


.fontsMoi {
    font-family: 'Moirai One', sans-serif;
    font-weight: 400;
}

.fontsPro {
    font-family: 'Prompt', sans-serif;
    font-weight: 800;
}

.fontsDanc {
    font-family: 'Dancing Script', sans-serif;
    font-weight: 500;
}
</style>
