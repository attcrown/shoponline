<template>
    <div class="text-center" :class="!$store.state.deviceMode ? 'd-flex' : ''">
        <div class="mt-10" :style="!$store.state.deviceMode ? 'width: 50%' : 'width: 100%'">
            <div>
                Add item
            </div>
            <v-form ref="form" v-model="valid" lazy-validation class="mx-5">
                <div>
                    <v-file-input v-model="jpgUpload" counter multiple small-chips label="เพิ่มรูปภาพ"
                        accept="image/png, image/jpeg, image/bmp"
                        :rules="[v => v.length > 0 || 'This field is required']" required>
                    </v-file-input>
                </div>
                <div class="d-flex">
                    <v-text-field v-model="items.name" :counter="50" :rules="nameRules" label="Name" class="me-3"
                        required>
                    </v-text-field>

                </div>
            </v-form>
            <v-btn class="mx-2" color="success" @click="validate">
                submit
            </v-btn>
        </div>

        <v-divider :vertical="!$store.state.deviceMode" color="black" class="mt-3"></v-divider>
        
        <div class="mt-10" :style="!$store.state.deviceMode ? 'width: 50%' : 'width: 100%'">
            <review ref="review"></review>
        </div>
        <LoadingItem v-if="loading"></LoadingItem>
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
    mounted() {
        this.loading = false
    },
    methods: {
        async validate() {
            this.$refs.form.validate()
            let imgSizing = []

            for (const img in this.jpgUpload) {
                let result = await processImg(this.jpgUpload[img])
                imgSizing.push({ src: URL.createObjectURL(result) })
            }

            console.log(imgSizing)
            this.$refs.review.itemsImg = imgSizing
        },
    }
}
</script>