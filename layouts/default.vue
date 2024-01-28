<template>
    <v-app>
        <div class="fontsPublic d-flex justify-space-around align-center pt-2"
            style="background-color: #0240aa; color: white">
            <div v-if="!deviceMode" class="d-flex align-center">
                ติดตามเราบน
                <v-btn icon color="white" href="https://web.facebook.com/marketplace/item/392278576571390/">
                    <v-icon size="24px"> mdi mdi-facebook </v-icon>
                </v-btn>
                <v-btn icon color="white" href="https://www.instagram.com/att_vongvaris/">
                    <v-icon size="24px"> mdi mdi-instagram </v-icon>
                </v-btn>
            </div>

            <div class="d-flex align-center">
                <div>
                    <v-badge :color="alert_message > 0 ? 'error' : ''" :content="alert_message" class="me-3" overlap>
                        <v-icon color="white" size="24px">
                            mdi mdi-message-text-outline</v-icon>
                    </v-badge>
                    <v-badge :color="alert_light > 0 ? 'error' : ''" :content="alert_light" class="me-6" overlap>
                        <v-icon color="white" size="24px"> mdi mdi-bell-outline</v-icon>
                    </v-badge>
                    &nbsp&nbsp&nbsp
                </div>
                <div class="d-flex align-center">
                    <v-menu rounded="xl" offset-y v-model="menuUser">
                        <template v-slot:activator="{ attrs, on }">
                            <div v-bind="attrs" v-on="on" class="d-flex align-center">
                                <v-avatar size="32px">
                                    <img alt="Avatar" src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" />
                                </v-avatar>
                                &nbsp
                                {{ $store.state.displayName }}
                                <span class="mdi mdi-menu-down text-h5"></span>
                            </div>
                        </template>

                        <v-list>
                            <v-list-item v-for="item in items" router :to="item.to" @click="handleMenuItemClick(item)">
                                <v-list-item-action>
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-list-item-action>
                                <v-list-item-title>
                                    {{ item.title }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </div>
        </div>
        <v-main>
            <Nuxt />
        </v-main>
    </v-app>
</template>
  
<script>
export default {
    name: "DefaultLayout",
    data() {
        return {
            deviceMode: false,
            items: [
                {
                    icon: "mdi-account-edit",
                    title: "ข้อมูลส่วนตัว",
                    to: "/CenterShop/profile",
                },
                {
                    icon: "mdi-logout",
                    title: "ออกจากระบบ",
                    id: "s1i2g3n4o5u6t",
                },
            ],
            menuUser: false,
            alert_message: null,
            alert_light: 8,
        };
    },
    mounted() {
        console.log(this.$store.state);
        this.beforeCreate();        
        this.checkMobile();
        window.addEventListener("resize", this.checkMobile);
    },
    methods: {
        beforeCreate() {
            const auth = this.$fireModule.auth();

            auth.onAuthStateChanged((user) => {
                if (user) {
                    // ตรวจสอบการยืนยันที่อยู่อีเมล
                    if (!user.emailVerified) {
                        // ถ้าที่อยู่อีเมลยังไม่ได้รับการยืนยัน, redirect ไปหน้า login
                        auth.signOut().then(() => {
                            this.$store.commit("SET_USER", null);
                            this.$router.push("/CenterShop/login");
                        });
                    }
                    this.handleUserData(user);
                } else {
                    // ไม่มีผู้ใช้ลงทะเบียน, ทำการเข้าสู่ระบบ
                    this.$router.push("/CenterShop/login");
                }
            });
        },

        handleUserData(user) {
            this.$store.commit("SET_USER", user);
        },
        checkMobile() {
            this.deviceMode = window.innerWidth <= 768; // ตั้งค่าให้เป็น mobile ถ้าขนาดน้อยกว่าหรือเท่ากับ 768 pixels
        },
        handleMenuItemClick(item) {
            if (item.id === "s1i2g3n4o5u6t") {
                this.signoutPage();
            }
        },
        signoutPage() {
            const auth = this.$fireModule.auth();
            auth
                .signOut()
                .then(() => {
                    // ทำการ logout สำเร็จ
                    console.log("User has been logged out");
                    this.$router.push("/CenterShop/login");
                })
                .catch((error) => {
                    // เกิดข้อผิดพลาดในการ logout
                    console.error("Logout error:", error);
                });
        },
    },
};
</script>
  
<style>
.fonts300 {
    font-family: "Prompt", sans-serif;
    font-weight: 500;
}

.fontsPublic {
    font-family: "Prompt", sans-serif;
    font-weight: 300;
}
</style>
  