<template>
    <div>
        <div :class="!$store.state.deviceMode ? 'd-flex' : ''">
            <div class="mt-10 mx-5" :style="!$store.state.deviceMode ? 'width: 30%' : ''">
                <v-banner class="text-center" color="white" elevation="10">
                    Add item <v-icon>mdi-plus-circle</v-icon>
                </v-banner>            
                <v-form ref="form" class="mt-5" v-model="valid" lazy-validation>
                    <div>
                        <v-file-input v-model="jpgUpload" 
                            :counter="6" multiple small-chips label="เพิ่มรูปภาพ"
                            accept="image/png, image/jpeg, image/bmp"
                            :rules="[v => v.length > 0 || 'This field is required']" required>
                        </v-file-input>
                    </div>
                    <div class="d-flex">
                        <v-text-field v-model="items.name" :counter="50" :rules="nameRules" label="Name"
                            required>
                        </v-text-field>

                    </div>
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
import { processImg } from '~/services/img-sizing';
import review from './review.vue';
import LoadingItem from '~/components/LoadingItem.vue';
export default {
    data() {
        return {
            valid: true,
            jpgUpload: [],
            loading: true,
            items: [],
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 50) || 'Name must be less than 50 characters',
            ],
        }
    },
    components: {
        LoadingItem,
        review
    },

    watch: {
        'items.name': async function () {
            if (this.$refs.review) {
                this.$refs.review.name = this.items.name;                
            }
        },
        'jpgUpload': async function () {
            if (this.$refs.review) {
                let imgSizing = []
                for (const img in this.jpgUpload) {
                    let result = await processImg(this.jpgUpload[img])
                    imgSizing.push({ src: URL.createObjectURL(result) })
                }
                this.$refs.review.itemsImg = imgSizing
            }
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