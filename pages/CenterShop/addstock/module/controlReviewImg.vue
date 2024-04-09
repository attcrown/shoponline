<template>
    <!-- Img -->
    <div>
        <!-- show IMG -->
        <div :style="$store.state.deviceMode ? 
            'width: 100%;' : 'width: 400px' "
            v-if="itemsImg.length > 0">
            <v-carousel 
                v-model="modelSlit" 
                height="400" 
                hide-delimiter-background 
                hide-delimiters
                show-arrows-on-hover 
                delimiter-icon="mdi-minus">
                <v-carousel-item v-for="(item, i) in itemsImg" :key="i"
                    class="rounded-lg" 
                    style="background-color: rgba(0, 0, 0, 0.2);">
                    <img :src="item.src" width="100%" height="100%" class="carousel-img rounded-lg" />
                </v-carousel-item>
            </v-carousel>
        </div>

        <!-- add IMG & Control -->
        <div class="d-flex align-center justify-center">
            <div v-if="itemsImg.length > 0" class="d-flex mt-3" style="overflow-x: auto;">
                <div v-for="item in itemsImg" :key="item.src">
                    <v-img :src="item.src" type="button" style="width: 90px; height: 90px;" class="me-3 mb-3 rounded-lg"
                        @mouseover="showReviewImg(item) ,isHovering = item"
                        :style="{ border: item === isHovering ? '2px solid #0240aa' : 'none' }">
                    </v-img>
                </div>
            </div>
            <div v-if="itemsImg.length === 0" :style="!$store.state.deviceMode ? 'width: 400px;' : 'width: 100%;'">
                <!-- await processImg -->
                <v-sheet class="pa-3">
                    <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
                </v-sheet>
            </div>
        </div>

        <AlertButtom ref="AlertButtom"></AlertButtom>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import AlertButtom from "~/components/AlertButtom.vue";

export default {
    components: { draggable , AlertButtom},
    data() {
        return {
            isHovering : null,
            modelSlit: 0,
            items: [],
            itemsImg: [],
        };
    },
    methods: {
        onDragEnd(evt) {
            // console.log("Drag ended:", evt);
        },
        showReviewImg(item) {
            this.modelSlit = this.itemsImg.indexOf(item)
        }
    },
    watch: {
        'items': async function () {                      
            this.itemsImg = this.items
        },
        'modelSlit': function () {
            this.isHovering = this.itemsImg[this.modelSlit]
        }
    }
};
</script>

<style>
    .carousel-img {
    object-fit: contain; /* หรือ object-fit: cover; ตามความเหมาะสม */
    }
</style>