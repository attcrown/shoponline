<template>
    <v-app>
        <v-main>
            <Nuxt />
        </v-main>
    </v-app>
</template>
<script>
export default {
    name: 'publicLayout',
    mounted() {
        this.beforeCreate();
    },
    methods: {
        beforeCreate() {
            const auth = this.$fireModule.auth();
            auth.onAuthStateChanged((user) => {
                if (user) {
                    if (user.emailVerified) {
                        this.handleUserData(user);
                    }
                }
            });
        },
        handleUserData(user) {
            this.$store.commit('SET_USER', user);
        }
    },
}
</script>
