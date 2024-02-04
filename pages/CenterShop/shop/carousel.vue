<template>
    <v-carousel class="fontsProCaro" cycle height="200px" hide-delimiter-background show-arrows-on-hover interval="3000">
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <div class="d-flex justify-center align-center pb-10"
                :style="`color: ${slide.color_text}; height: 200px; background-color: #0240aa;`">
                <v-img v-if="$store.state?.deviceMode && slide.img_url_mobile" height="200" :src="slide.img_url_mobile"
                    @click="$router.push(slide.link ? slide.link : '')">
                </v-img>
                <v-img v-if="!$store.state?.deviceMode && slide.img_url_desktop" height="200" max-width="1000"
                    :src="slide.img_url_desktop" @click="$router.push(slide.link ? slide.link : '')">
                </v-img>
                <p class="text-center" :style="`color: ${slide?.color_text}`">{{ slide?.text }} </p>
            </div>
        </v-carousel-item>
    </v-carousel>
</template>
<script>
export default {
    data() {
        return {
            slides: [
                {
                    link: '/CenterShop/profile',
                    img_url_mobile: 'https://firebasestorage.googleapis.com/v0/b/goshop-9e571.appspot.com/o/contentPageShop%2FTEST.png?alt=media&token=848d1d06-10da-4853-9f10-2e10d305a25d',
                    img_url_desktop: 'https://firebasestorage.googleapis.com/v0/b/goshop-9e571.appspot.com/o/contentPageShop%2FTEST3.png?alt=media&token=69662e64-8880-4e98-b1e9-c53ff911eb2a'
                },
                {
                    link: '/CenterShop/addstock',
                    img_url_mobile: 'https://firebasestorage.googleapis.com/v0/b/goshop-9e571.appspot.com/o/contentPageShop%2FTEST.png?alt=media&token=848d1d06-10da-4853-9f10-2e10d305a25d',
                    img_url_desktop: 'https://firebasestorage.googleapis.com/v0/b/goshop-9e571.appspot.com/o/contentPageShop%2FTEST3.png?alt=media&token=69662e64-8880-4e98-b1e9-c53ff911eb2a'

                },
                {
                    img_url_mobile: 'https://firebasestorage.googleapis.com/v0/b/goshop-9e571.appspot.com/o/contentPageShop%2FTEST.png?alt=media&token=848d1d06-10da-4853-9f10-2e10d305a25d',
                    img_url_desktop: 'https://firebasestorage.googleapis.com/v0/b/goshop-9e571.appspot.com/o/contentPageShop%2FTEST3.png?alt=media&token=69662e64-8880-4e98-b1e9-c53ff911eb2a'

                },
                {
                    img_url_mobile: 'https://firebasestorage.googleapis.com/v0/b/goshop-9e571.appspot.com/o/contentPageShop%2FTEST.png?alt=media&token=848d1d06-10da-4853-9f10-2e10d305a25d',
                    img_url_desktop: 'https://firebasestorage.googleapis.com/v0/b/goshop-9e571.appspot.com/o/contentPageShop%2FTEST3.png?alt=media&token=69662e64-8880-4e98-b1e9-c53ff911eb2a'

                },
                {
                    text: 'พื้นที่โฆษณาให้เช่า Mobile:200px x 1000px และ Desktop:200px x 370px',
                    color_text: 'black',
                },
            ],
        }
    },
    computed: {

    },
    mounted() {
        this.getImgContent();
    },
    methods: {
        getImgContent() {
            return;
        }
    }
}
</script>
<style>
.fontsProCaro {
    font-family: 'Prompt', sans-serif;
    font-weight: 400;
    font-size: 24px;
}
</style>