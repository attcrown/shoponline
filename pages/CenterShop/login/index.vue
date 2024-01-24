<template>
    <div class="center-container" style="background: linear-gradient(to right, #ff7e5f, #feb47b, #ff7e5f);">
        <v-card v-if="!deviceMode" class="container fonts500 text-center" max-width="500px" rounded="xxl">
            <h1>TreadShop</h1>
            <v-card-text>
                ทดลองระบบได้แล้ววันนี้
            </v-card-text>
        </v-card>
        <v-card elevation="16" :class="!deviceMode ? 'container' : 'container mx-3'" max-width="500px" rounded="xxl"
            style="background-color: rgba(255, 255, 255, 0.741);">
            <h1 class="text-center fonts500">LOGIN</h1>
            <v-form ref="form" v-model="valid" lazy-validation>

                <v-text-field v-model="register.email" :rules="emailRules" label="E-mail" required></v-text-field>

                <v-text-field v-model="register.password" :rules="passRules" type="password" label="Password"
                    required></v-text-field>

                <div class="d-flex justify-center">
                    <v-btn :disabled="!valid" color="#feb47b" class="mr-4" @click="validate">
                        Login
                    </v-btn>
                </div>
            </v-form>
            <v-card-text>
                <a href="/CenterShop/register">หากยังไม่ได้ลงทะเบียน กรุณาลงทะเบียน</a>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
export default {
    layout: 'login',
    data: () => ({
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

    }),

    mounted() {
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
    },

    methods: {
        checkMobile() {
            // ตรวจสอบขนาดหน้าจอและกำหนดค่าให้ isMobile
            this.deviceMode = window.innerWidth <= 768; // ตั้งค่าให้เป็น mobile ถ้าขนาดน้อยกว่าหรือเท่ากับ 768 pixels
        },
        validate() {
            if (this.$refs.form.validate()) {
                this.login(this.register);
            }
        },


        login(item) {
            const auth = this.$fireModule.auth();
            auth.signInWithEmailAndPassword(item.email, item.password) // ในตัวอย่างนี้ "PASSWORD" ควรถูกเปลี่ยนเป็นรหัสผ่านที่ผู้ใช้ลงทะเบียนไว้
                .then((userCredential) => {
                    // การลงชื่อเข้าใช้สำเร็จ
                    const user = userCredential.user;
                    console.log("User logged in successfully:", user);
                    this.$router.push('/CenterShop/shop');
                })
                .catch((error) => {
                    // การลงชื่อเข้าใช้ไม่สำเร็จ
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Login failed:", errorCode, errorMessage);
                });
        },
    }
}
</script>

<style>
.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* ทำให้เต็มจอ */
}

.fonts500 {
    font-family: 'Moirai One', sans-serif;
    font-weight: 500;
}
</style>
