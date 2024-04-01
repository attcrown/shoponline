<template>
    <!-- Img -->
    <div>
        <!-- show IMG -->
        <div :style="$store.state.deviceMode ? 
            'width: 100%; height: 350px;' : '' "
            v-if="itemsImg.length > 0">
            <v-carousel 
                v-model="modelSlit" 
                height="350" 
                hide-delimiter-background 
                hide-delimiters
                show-arrows-on-hover 
                delimiter-icon="mdi-minus">
                <v-carousel-item v-for="(item, i) in itemsImg" :key="i">
                    <img :src="item.src" style="width: 100%; height: 350px;" class="carousel-img" />
                </v-carousel-item>
            </v-carousel>
        </div>

        <!-- add IMG & Control -->
        <div class="d-flex align-center justify-center">
            <draggable v-if="itemsImg.length > 0" v-model="itemsImg" @end="onDragEnd" class="d-flex mt-3 me-3"
                style="overflow-x: scroll">
                <div v-for="item in itemsImg" :key="item.src">
                    <v-img :src="item.src" type="button" style="width: 90px; height: 90px;" class="me-3"
                        @click="showReviewImg(item)">
                        <div class="d-flex justify-end">
                            <v-btn icon small @click="itemsImg.splice(itemsImg.indexOf(item), 1)">
                                <v-icon color="error">mdi-close-circle-outline</v-icon>
                            </v-btn>
                        </div>
                    </v-img>
                </div>
            </draggable>

            <div>
                <!-- await processImg -->
                <v-sheet class="pa-3" v-if="itemsImg.length === 0">
                    <v-skeleton-loader class="mx-auto" width="100%" type="card"></v-skeleton-loader>
                </v-sheet>
                <div class="d-flex align-center justify-center">
                    <!-- alert -->
                    <span style="color: red" v-if="itemsImg.length === 0" class="outlined me-3">กรุณาเพิ่มรูปภาพ</span>
                    <!-- btn add img -->
                    <v-hover v-slot="{ hover }">
                        <v-card :elevation="hover ? 16 : 2" width="50" height="50" @click="openFileInput()"
                            class="d-flex align-center justify-center">
                            <v-icon>mdi-plus</v-icon>
                        </v-card>
                    </v-hover>
                </div>
            </div>
        </div>

        <!-- Upload IMG -->
        <v-file-input ref="fileInput" v-model="jpgUpload" v-show="false" multiple small-chips label="เพิ่มรูปภาพ"
            accept="image/png, image/jpeg, image/bmp" :rules="[v => v.length > 0 || 'This field is required']">
        </v-file-input>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import { processImg } from "~/services/img-sizing";

export default {
    components: { draggable },
    data() {
        return {
            jpgUpload: [],
            itemsImg: [],
            modelSlit: 0
        };
    },
    methods: {
        onDragEnd(evt) {
            // console.log("Drag ended:", evt);
        },
        openFileInput() {
            this.$refs.fileInput.$refs.input.click();
        },
        showReviewImg(item) {
            this.modelSlit = this.itemsImg.indexOf(item)
        }
    },
    watch: {
        'jpgUpload': async function () {
            for (const img in this.jpgUpload) {
                let result = await processImg(this.jpgUpload[img])
                this.itemsImg.push({ src: URL.createObjectURL(result) })
            }
        }
    }
};
</script>

<style>
    .carousel-img {
    object-fit: contain; /* หรือ object-fit: cover; ตามความเหมาะสม */
    }
    .max-length {
        max-width: 28ch; /* กำหนดความยาวของข้อความให้เป็น 20 ตัวอักษร */
        word-wrap: break-word;
        white-space: pre-wrap;
    }
</style>