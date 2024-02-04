<template>
    <v-carousel class="fontsProCaro" cycle height="200" hide-delimiter-background show-arrows-on-hover interval="3000">
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="slide.color" height="100%">
                <v-row class="fill-height" align="center" justify="center">
                    <div class="text-center" :style="`color: ${slide.color_text}`">
                        {{ slide.text }} พื้นที่โฆษณา
                    </div>
                </v-row>
            </v-sheet>
        </v-carousel-item>
    </v-carousel>
</template>
<script>
export default {
    data() {
        return {
            slides: [
                {text:'ลดกระหน่ำ -50%',color:'warning',color_text:'green'},
                {text:'ลดกระหน่ำ -20%',color:'warning'},
                {text:'ลดกระหน่ำ -30%',color:'pink darken-2'},
                {text:'ลดกระหน่ำ -40%',color:'red lighten-1'},
            ],
        }
    },
    mounted() {
        
    },
    methods: {
        nextSliteAuto(){
                        
        }
    }
}
</script>
<style>
.fontsProCaro {
    font-family: 'Prompt', sans-serif;
    font-weight: 800;
    font-size: 30px;
}
</style>