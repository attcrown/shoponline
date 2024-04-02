<template>
    <div class="mx-5">
        <v-banner class="text-center rounded-lg" color="white" elevation="10">
            Review <v-icon>mdi-eye</v-icon>
        </v-banner>
        <div class="mt-5"
            :class="!$store.state.deviceMode ? 'd-flex' : ''">
            <div style="width: 350px;">
                <controlReviewImg></controlReviewImg>
            </div>
            <div style="width: 100%;">
                <controlDetail ref="controlDetail"></controlDetail>
            </div>
        </div>
    </div>
</template>
<script>
import controlReviewImg from './module/controlReviewImg.vue'
import controlDetail from './module/controlDetail.vue'

export default {
    data() {
        return {
            items: []
        }
    },
    watch: {
        'items': function () {
            if (this.$refs.controlDetail) {
                this.$refs.controlDetail.items = this.items
            }
        }
    },
    components: {
        controlReviewImg,
        controlDetail
    }
}
</script>