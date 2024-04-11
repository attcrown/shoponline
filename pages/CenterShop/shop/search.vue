<template>
    <div>
        <div style="background-color: #0240aa;">
            <div class="fontsProShop d-flex justify-center align-center mx-3">
                <v-text-field v-model="input_search" label="ค้าหาสินค้า" prepend-icon="mdi-magnify" dark
                    style="max-width: 500px;">
                </v-text-field>
                <v-btn small rounded elevation="4" class="ms-2" 
                    :loading="loadSearch" style="font-size: 16px;" 
                    @click="searchNewItems()">
                    ค้นหา
                </v-btn>
            </div>
        </div>
    </div>
</template>
<script>
import { getItemShopAll } from '~/services/shop-firebase';
export default {
    data() {
        return {
            loadSearch: false,
            property: 'value',
            input_search: '',
        };
    },
    mounted() {
        this.sendListItems()
    },
    methods: {
        async sendListItems() {
            if(await this.$store.state.list_item?.length > 0) return
            this.searchNewItems()
        },
        async searchNewItems() {
            this.loadSearch = true
            const result = await getItemShopAll() 
            this.$store.commit('SET_LISTITEMS', result);
            this.loadSearch = false
        },

    }
}
</script>
<style>
.fontsProShop {
    font-family: 'Prompt', sans-serif;
    font-weight: 300;
}
</style>