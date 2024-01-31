<template>
    <div class="fontsPublic d-flex justify-space-around align-center pt-2"
            style="background-color: #0240aa; color: white; position: fixed; width: 100%; z-index: 100;" >
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
                <div v-if="$store.state?.uid" class="d-flex">
                    <v-menu offset-y v-model="menuMessage">
                        <template v-slot:activator="{ attrs, on }">
                            <div v-bind="attrs" v-on="on">
                                <v-badge :color="alert_message > 0 ? 'error' : ''" :content="alert_message" class="me-3" overlap>
                                    <v-icon color="white" size="24px"> mdi mdi-message-text-outline</v-icon>
                                </v-badge>
                            </div>
                        </template>
                        <v-list>
                            <v-list-item v-for="item in itemsMessage" :key="item.to" router :to="item.to" @click="">
                                <v-list-item-action>
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-list-item-action>
                                <v-list-item-title>
                                    {{ item.title }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    
                    <v-menu offset-y v-model="menuLight">
                        <template v-slot:activator="{ attrs, on }">
                            <div v-bind="attrs" v-on="on">
                                <v-badge :color="alert_light > 0 ? 'error' : ''" :content="alert_light" class="me-6" overlap>
                                    <v-icon color="white" size="24px"> mdi mdi-bell-outline</v-icon>
                                </v-badge>
                            </div>
                        </template>
                        <v-list>
                            <v-list-item v-for="item in itemsLight" :key="item.to" router :to="item.to" @click="">
                                <v-list-item-action>
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-list-item-action>
                                <v-list-item-title>
                                    {{ item.title }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    &nbsp&nbsp&nbsp
                </div>
                <div v-if="!$store.state?.uid" class="d-flex align-center">
                    <span class="mdi mdi-account-circle text-h5"></span> &nbsp<a @click="$router.push('/CenterShop/login')"
                        style="color: white">เข้าสู่ระบบ</a>
                </div>
                <div v-if="$store.state?.displayName" class="d-flex align-center">
                    <v-menu offset-y v-model="menuUser">
                        <template v-slot:activator="{ attrs, on }">
                            <div v-bind="attrs" v-on="on" class="d-flex align-center">
                                <v-avatar size="32px">
                                    <img alt="Avatar" src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460">
                                </v-avatar> &nbsp
                                {{ $store.state.displayName }}
                                <span class="mdi mdi-menu-down text-h5"></span>
                            </div>
                        </template>

                        <v-list>
                            <v-list-item v-for="item in items" :key="item.to" router :to="item.to" @click="handleMenuItemClick(item)">
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
</template>
<script>
import {SINGOUT_ID} from '../services/const';
export default {
    name: "publicLayout",
    data() {
        return {
            deviceMode: false,
            items: [
                {
                    icon: "mdi-account-edit",
                    title: "ข้อมูลส่วนตัว",
                    to: "/CenterShop/profile"
                },
                {
                    icon: "mdi-logout",
                    title: "ออกจากระบบ",
                    id: SINGOUT_ID
                }
            ],
            itemsLight:[
                {
                    icon: "mdi-bell-outline",
                    title: "เร่งด่วน",
                },
                {
                    icon: "mdi-message-text-outline",
                    title: "งานชิว"
                }
            ],
            itemsMessage:[
                {
                    icon: "mdi-bell-outline",
                    title: "สวัสดี",
                },
                {
                    icon: "mdi-message-text-outline",
                    title: "ลาก่อน"
                }
            ],
            menuUser: false,
            menuLight: false,
            menuMessage : false,
            alert_message: null,
            alert_light: 8,
            SINGOUT_ID : SINGOUT_ID
        };
    },
    mounted() {      
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
    },
    methods: {        
        handleMenuItemClick(item) {
            if (item.id === SINGOUT_ID) {
                this.signoutPage();
            }
        },
        signoutPage() {
            const auth = this.$fireModule.auth();
            auth.signOut()
                .then(() => {
                    // ทำการ logout สำเร็จ
                    console.log("User has been logged out");
                    this.$router.push('/CenterShop/login');
                })
                .catch((error) => {
                    // เกิดข้อผิดพลาดในการ logout
                    console.error("Logout error:", error);
                });
        },
        checkMobile() {
            this.deviceMode = window.innerWidth <= 768; // ตั้งค่าให้เป็น mobile ถ้าขนาดน้อยกว่าหรือเท่ากับ 768 pixels
        },
    },
};
</script>
<style>
.fontsPublic {
    font-family: "Prompt", sans-serif;
    font-weight: 300;
}
</style>