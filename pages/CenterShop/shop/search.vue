<template>
    <div>
        <div style="background-color: #0240aa;">
            <div class="fontsProShop d-flex justify-center align-center mx-3">
                <v-text-field 
                    v-model="input_search" 
                    label="ค้าหาสินค้า" 
                    prepend-icon="mdi-magnify" 
                    dark
                    style="max-width: 500px;">
                </v-text-field>
                <v-btn 
                    small rounded 
                    elevation="4"
                    class="ms-2"
                    style="font-size: 16px;">
                        ค้นหา
                </v-btn>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            property: 'value',
            input_search: null
        };
    },
    computed: {
        
    },
    mounted() {

    },
    methods: {

    }
}
</script>
<style>
.fontsProShop {
    font-family: 'Prompt', sans-serif;
    font-weight: 300;
}
</style>