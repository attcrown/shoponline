<template>
    <div>
        <div :class="!$store.state.deviceMode ? 'd-flex' : ''">
            <div class="mt-10 mx-5" :style="!$store.state.deviceMode ? 'width: 30%' : ''">
                <v-banner class="text-center rounded-lg" color="white" elevation="10">
                    Add item <v-icon>mdi-plus-circle</v-icon>
                </v-banner>            
                <v-form ref="form" class="mt-5" v-model="valid" lazy-validation>
                    <v-text-field v-model="items.name" :counter="50" :rules="nameRules" label="Name Product"
                        required>
                    </v-text-field>

                    <v-textarea v-model="items.detail" auto-grow :rules="[v => !!v || 'โปรดระบุข้อมูล']" label="Detail"
                        required></v-textarea>

                    <v-text-field v-model="items.price" type="number" :rules="nameRules" label="Price"
                        required></v-text-field>

                    <v-text-field v-model="items.stockItems" type="number" :rules="nameRules" label="จำนวน"
                        required></v-text-field>
                    
                </v-form>
            </div>

            <v-divider :vertical="!$store.state.deviceMode" color="black" class="mt-3"></v-divider>
            
            <div class="mt-10" :style="!$store.state.deviceMode ? 'width: 70%' : ''">
                <review ref="review"></review>
            </div>        
            <LoadingItem v-if="loading"></LoadingItem>
        </div>
        <div class="mx-5">
            <v-btn color="success" @click="validate">
                submit
            </v-btn>
        </div>
    </div>
    
</template>
<script>
import review from './review.vue'
import LoadingItem from '~/components/LoadingItem.vue';
export default {
    data() {
        return {
            valid: true,
            loading: true,
            items: [],
            nameRules: [
                v => !!v || 'โปรดระบุข้อมูล',
                v => (v && v.length <= 50) || 'โปรดระบุข้อมูลไม่เกิน 50 ตัวอักษร',
            ]
        }
    },
    components: {
        LoadingItem,
        review
    },

    watch: {        
        'items': function () {
            if (this.$refs.review) this.$refs.review.items = this.items
        }
    },

    mounted() {
        this.loading = false
    },
    methods: {
        async validate() {
            this.$refs.form.validate()
        },
    }
}
</script>