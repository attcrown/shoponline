<template>
    <div>
        <checkStep ref="checkStep" v-if="!$store.state.deviceMode"></checkStep>
        <div :class="!$store.state.deviceMode ? 'd-flex' : ''">
            <div class="mt-10 mx-5" :style="!$store.state.deviceMode ? 'width: 30%' : ''">
                <v-banner class="text-center" color="white" elevation="10">
                    Add item <v-icon>mdi-plus-circle</v-icon>
                </v-banner>            
                <v-form ref="form" class="mt-5" v-model="valid" lazy-validation>
                    <div class="d-flex">
                        <v-text-field v-model="items.name" :counter="50" :rules="nameRules" label="Name"
                            required>
                        </v-text-field>

                    </div>
                </v-form>
            </div>

            <v-divider :vertical="!$store.state.deviceMode" color="black" class="mt-3"></v-divider>
            
            <div class="mt-10" :style="!$store.state.deviceMode ? 'width: 70%' : ''">
                <dragdrop ref="dragdrop"></dragdrop>
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
import checkStep from './check-step.vue'
import dragdrop from './review/dragdrop.vue'
import LoadingItem from '~/components/LoadingItem.vue';
export default {
    data() {
        return {
            valid: true,
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
        checkStep,
        dragdrop
    },

    watch: {        
        'items': function () {
            if (this.$refs.dragdrop) this.$refs.dragdrop.items = this.items
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