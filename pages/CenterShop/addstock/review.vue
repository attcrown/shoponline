<template>
    <div class="mx-5">
        <v-banner class="text-center rounded-lg" color="white" elevation="10">
            Review <v-icon>mdi-eye</v-icon>
        </v-banner>
        <div class="mt-5"
            :class="!$store.state.deviceMode ? 'd-flex' : ''">
            <div :style="!$store.state.deviceMode ? 'width: 400px;' : 'width: 100%;'">
                <controlReviewImg ref="controlReview"></controlReviewImg>
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
            items: [],
            imgs:[]
        }
    },
    watch: {
        'items': function () {
            if (this.$refs.controlDetail) {
                this.$refs.controlDetail.items = this.items
            }
        },
        'imgs': function () {
            if (this.$refs.controlReview) {
                this.$refs.controlReview.items = this.imgs
            }
        }
    },
    components: {
        controlReviewImg,
        controlDetail
    }
}
</script>