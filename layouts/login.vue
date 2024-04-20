<template>
    <v-app>
        <v-main>
            <Nuxt />
        </v-main>
    </v-app>
</template>
<script>
export default {
    name: 'LoginLayout',
    mounted() {    
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
    },
    methods: {        
        checkMobile() {
            this.deviceMode = window.innerWidth <= 1100; // ตั้งค่าให้เป็น mobile ถ้าขนาดน้อยกว่าหรือเท่ากับ 768 pixels
            this.$store.commit("SET_DEVICE", this.deviceMode);
        },
    },
}
</script>
