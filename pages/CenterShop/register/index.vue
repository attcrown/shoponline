<template>
    <div>
        <h1>sigin</h1>
        <v-card class="container">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="register.display_name" :rules="nameRules" label="Display Name" required></v-text-field>

                <v-text-field v-model="register.email" :rules="emailRules" label="E-mail" required></v-text-field>

                <v-text-field v-model="register.password" type="password" label="Password" :rules="passRules"
                    required></v-text-field>

                <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                    Validate
                </v-btn>

            </v-form>
        </v-card>
    </div>
</template>
<script>
export default {
    layout: 'login',
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
        passRules: [
            v => !!v || 'Password is required',
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
        register_user(item) {
            const auth = this.$fireModule.auth();
            auth.createUserWithEmailAndPassword(item.email, item.password) // ในตัวอย่างนี้ "PASSWORD" ควรถูกเปลี่ยนเป็นรหัสผ่านที่ผู้ใช้ต้องการ
                .then((userCredential) => {
                    // การลงทะเบียนเสร็จสมบูรณ์
                    const user = userCredential.user;
                    console.log("User registered successfully:", user);
                    const userProfile = {
                        email: item.email,
                        displayName: item.display_name, // ชื่อที่ให้แสดงผล
                    };
                    user.updateProfile(userProfile)
                        .then(() => {
                            console.log("User profile updated:", user);
                            // ส่งอีเมลยืนยัน
                            user.sendEmailVerification()
                                .then(() => {
                                    console.log("Email verification sent to user:", user.email);
                                    this.$router.push("/CenterShop/login");
                                })
                                .catch((error) => {
                                    console.error("Error sending email verification:", error);
                                });   
                        })
                        .catch((error) => {
                            console.error("Error updating user profile:", error);
                        });  
                                   
                })
                .catch((error) => {
                    // การลงทะเบียนไม่สำเร็จ
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Registration failed:", errorCode, errorMessage);
                });
        },
    }
}
</script>