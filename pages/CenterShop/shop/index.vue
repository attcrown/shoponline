<template>
    <div>
        hello {{ $store.state.displayName }}
        <v-btn @click="signout()">
            Signout
        </v-btn>
    </div>
</template>
<script>

export default {
    layout: 'default',
    mounted() {
        console.log(this.$store.state)
    },
    methods: {
        signout() {
            const auth = this.$fireModule.auth();
            auth.signOut()
                .then(() => {
                    // ทำการ logout สำเร็จ
                    console.log("User has been logged out");
                    // ทำการ redirect หรือทำงานอื่นๆ ตามต้องการ
                    this.$router.push('/CenterShop/login');
                })
                .catch((error) => {
                    // เกิดข้อผิดพลาดในการ logout
                    console.error("Logout error:", error);
                });
        }
    }

}
</script>