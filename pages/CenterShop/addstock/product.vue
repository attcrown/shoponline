<template>
    <div class="text-center">
        <LoadingItem v-if="loading"></LoadingItem>
        <div>
            Add item
        </div>
        <v-form ref="form" v-model="valid" lazy-validation class="mx-5">
            <div>
                <v-file-input v-model="jpgUpload" 
                    counter multiple small-chips 
                    label="เพิ่มรูปภาพ" accept="image/png, image/jpeg, image/bmp"
                    :rules="[v => v.length > 0 || 'This field is required']"
                    required >
                </v-file-input>
            </div>
            <div class="d-flex">
                <v-text-field
                    v-model="items.name"
                    :counter="50"
                    :rules="nameRules"
                    label="Name"
                    class="me-3"
                    required>
                </v-text-field>
                <v-text-field
                    v-model="items.name"
                    :counter="50"
                    :rules="nameRules"
                    label="Name"
                    class="ms-3"
                    required>
                </v-text-field>

            </div>
        </v-form>
    </div>
</template>
<script>
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
        LoadingItem
    },
    mounted() {
        this.loading = false
    },
    methods: {
        validate () {
            this.$refs.form.validate()
        },
    }
}
</script>