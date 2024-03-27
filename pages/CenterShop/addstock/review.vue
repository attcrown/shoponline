<template>
    <div class="mx-5">
        <v-banner class="text-center" color="white" elevation="10">
            Review <v-icon>mdi-eye</v-icon>
        </v-banner>        
        <div class="mt-5" :class="!$store.state.deviceMode ? 'd-flex' : '' ">
            <div :style="$store.state.deviceMode ? 
                'width: 100%; height: 380px' : 'width: 350px'">
                <v-carousel 
                    v-if="itemsImg.length > 0"
                    class="carousel-item"
                    cycle
                    height="350"
                    hide-delimiter-background
                    show-arrows-on-hover>
                    <v-carousel-item
                        v-for="(item,i) in itemsImg"
                        :key="i">
                        <img :src="item.src" 
                            style="width: 350px; height: 350px;"
                            class="carousel-img"/>
                    </v-carousel-item>
                </v-carousel>
            </div>
            <div :class="!$store.state.deviceMode ? 'ms-5' : ''">
                <h4 class="max-length">{{ name }}</h4>
                <p>{{ title }}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            itemsImg:[],
            name: '',
            title: '',
        }
    }
}
</script>

<style>
.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-img {
  object-fit: contain; /* หรือ object-fit: cover; ตามความเหมาะสม */
}

.max-length {
    max-width: 28ch; /* กำหนดความยาวของข้อความให้เป็น 20 ตัวอักษร */
    word-wrap: break-word;
    white-space: pre-wrap;
}

</style>