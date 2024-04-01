<template>
    <div class="mx-5">
        <div>
            <review ref="review"></review>
        </div>
        <div class="d-flex align-center">
            <draggable v-model="itemsImg" @end="onDragEnd" class="d-flex mt-3">                
                <div v-for="item in itemsImg" :key="item.src">
                    <v-img :src="item.src" 
                        style="width: 90px; height: 90px;"
                        class="carousel-img me-3">
                        <div class="d-flex justify-end">
                            <v-btn icon small @click="itemsImg.splice(itemsImg.indexOf(item), 1)">
                                <v-icon color="error">mdi-close-circle-outline</v-icon>
                            </v-btn>
                        </div>                        
                    </v-img>        
                </div>                            
            </draggable>
            <div>
                <v-hover v-slot="{ hover }">
                    <v-card :elevation="hover ? 16 : 2" width="50" height="50"
                        @click="openFileInput()" class="d-flex align-center justify-center" >
                        <v-icon>mdi-plus</v-icon>
                    </v-card> 
                </v-hover>
            </div>
        </div>

        <!-- Upload IMG -->
        <v-file-input ref="fileInput" v-model="jpgUpload" v-show="false"
            multiple small-chips label="เพิ่มรูปภาพ"
            accept="image/png, image/jpeg, image/bmp"
            :rules="[v => v.length > 0 || 'This field is required']">
        </v-file-input>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import review from "./review.vue";
import { processImg } from "~/services/img-sizing";

export default {
    components: { draggable, review },
    data() {
        return {
            jpgUpload: [],
            itemsImg: [],
            items: []
        };
    },
    methods: {
        onDragEnd(evt) {
            // console.log("Drag ended:", evt);
        },
        openFileInput() {
            this.$refs.fileInput.$refs.input.click();
        }
    },
    watch: {
        'jpgUpload': async function () {            
            for (const img in this.jpgUpload) {
                let result = await processImg(this.jpgUpload[img])
                this.itemsImg.push({ src: URL.createObjectURL(result) })
            }
        },
        'itemsImg': function () {
            if (this.$refs.review) this.$refs.review.itemsImg = this.itemsImg;
        },
        'items': function () {
            if (this.$refs.review) this.$refs.review.items = this.items;
        }
    }
};
</script>