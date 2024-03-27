<template>
    <div class="text-center">
        Review
        <div v-if="itemsImg.length > 0" style="width: 100%; height: 100%;">
            <v-carousel show-arrows>
                <v-carousel-item
                    v-for="(item,i) in itemsImg"
                    :key="i"
                    height="100%"
                    :src="item.src">
                </v-carousel-item>
            </v-carousel>
        </div>
        {{ itemsImg }}
    </div>
</template>
<script>
export default {
    data() {
        return {
            itemsImg:[]
        }
    }
}
</script>