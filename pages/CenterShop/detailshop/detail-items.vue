<template>
    <div>
        <div :class="!$store.state.deviceMode ? 'd-flex justify-center mt-5' : ''">
            <div :style="!$store.state.deviceMode ? 'width: 1200px; display: flex' : ''">            
                <div :style="!$store.state.deviceMode ? 'width: 400px;' : 'width: 100%;'">
                    <controlReviewImg ref="controlReview"></controlReviewImg>
                </div>
                <div style="width: 100%;">
                    <controlDetail ref="controlDetail"></controlDetail>
                </div>
            </div>
        </div>

        <AlertButtom ref="AlertButtom"></AlertButtom>
    </div>
</template>
<script>
import AlertButtom from '~/components/AlertButtom.vue';
import controlDetail from '~/modules/controlDetail.vue';
import controlReviewImg from '~/modules/controlReviewImg.vue';
export default {
    data() {
        return {
            items: []
        };
    },
    components: {
        AlertButtom, controlDetail, controlReviewImg
    },
    async mounted() {
        this.searchDetailShop();
    },
    methods: {
        async searchDetailShop() {
            // read path
            let path = this.$router.currentRoute.hash
            let pathSubId = path.split('#')
            const pathId = pathSubId[1]
            const pathDocs = pathSubId[2]

            const db = this.$fire.database;
            const dbDocs = this.$fire.firestore;

            try {
                db.ref(`items/${pathId}`).on('value', (snapshot) => {
                    const data = snapshot.val();
                    
                    this.items.seller = data.seller
                    this.items.stockItems = data.stockItems
                    this.items.view = data.view
                })

                const dataDocs = await dbDocs.collection(`items/`).doc(pathDocs).get()
                const itemsDocs = dataDocs.data()
                this.items = { ...this.items, ...itemsDocs}

               
                console.log(this.items)
                this.$refs.controlDetail.items = this.items
                this.$refs.controlReview.itemsImg = this.items.imgs
            } catch (error) {
                this.items = []
                this.$refs.AlertButtom.snackbar = true
                this.$refs.AlertButtom.colorAlart = 'red'
                this.$refs.AlertButtom.text = 'ไม่พบข้อมูลสินค้าในระบบ'
                this.$refs.AlertButtom.icon = 'mdi mdi-alert-circle'
            }
        }
    },
}
</script>