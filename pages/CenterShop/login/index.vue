<template>
    <div>
        <h1>LOGIN</h1>
        <v-card>

        </v-card>
        <h1>sigin</h1>
        <v-card class="container">
            <v-form ref="form" v-model="valid" lazy-validation>

                <v-text-field v-model="register.email" :rules="emailRules" label="E-mail" required></v-text-field>

                <v-text-field v-model="register.password" :counter="10" :rules="nameRules" label="Password"
                    required></v-text-field>

                <v-select v-model="register.select" :items="items" :rules="[v => !!v || 'Item is required']" label="Item"
                    required></v-select>

                <v-checkbox v-model="register.checkbox" :rules="[v => !!v || 'You must agree to continue!']"
                    label="Do you agree?" required></v-checkbox>

                <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                    Validate
                </v-btn>

                <v-btn color="error" class="mr-4" @click="reset">
                    Reset Form
                </v-btn>

                <v-btn color="warning" @click="resetValidation">
                    Reset Validation
                </v-btn>

                <v-btn @click="btn_login">
                    login
                </v-btn>
            </v-form>
        </v-card>
    </div>
</template>
<script>
export default {
    data: () => ({
        valid: true,
        register: [],
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        items: [
            'Item 1',
            'Item 2',
            'Item 3',
            'Item 4',
        ],
    }),

    methods: {
        validate() {
            if (this.$refs.form.validate()) {
                this.register_user(this.register);
            }
        },
        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },

        btn_login() {
            this.login(this.register);
        },

        register_user(item) {
            const auth = this.$fireModule.auth();
            auth.createUserWithEmailAndPassword(item.email, item.password) // ในตัวอย่างนี้ "PASSWORD" ควรถูกเปลี่ยนเป็นรหัสผ่านที่ผู้ใช้ต้องการ
                .then((userCredential) => {
                    // การลงทะเบียนเสร็จสมบูรณ์
                    const user = userCredential.user;
                    console.log("User registered successfully:", user);
                })
                .catch((error) => {
                    // การลงทะเบียนไม่สำเร็จ
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Registration failed:", errorCode, errorMessage);
                });
        },
        login(item) {
            const auth = this.$fireModule.auth();
            auth.signInWithEmailAndPassword(item.email, item.password) // ในตัวอย่างนี้ "PASSWORD" ควรถูกเปลี่ยนเป็นรหัสผ่านที่ผู้ใช้ลงทะเบียนไว้
                .then((userCredential) => {
                    // การลงชื่อเข้าใช้สำเร็จ
                    const user = userCredential.user;
                    console.log("User logged in successfully:", user);
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