<template>
    <div class="mx-5">
        <div>
            <review ref="review"></review>
        </div>
        <div>
            <draggable v-model="itemsImg" @end="onDragEnd">
                <div v-for="item in itemsImg" :key="item.src">
                    {{ item.src }} <v-btn @click="itemsImg.splice(itemsImg.indexOf(item), 1)">delete</v-btn>
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
        onFileChange(e) {
            console.log(e)
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