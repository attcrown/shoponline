<template>
    <div>
        <div :class="!$store.state.deviceMode ? 'd-flex justify-center mt-8' : 'mx-2'">
            <div :style="!$store.state.deviceMode ? 'width: 1000px; display: flex' : ''">            
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
import { dateCalculate } from '~/services/calculate-service.js'
import { updateView } from '~/services/items-firebase.js'
export default {
    components: {
        AlertButtom, controlDetail, controlReviewImg
    },
    async mounted() {
        this.searchDetailShop();
        this.upView();
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
                const dataDocs = await dbDocs.collection(`items/`).doc(pathDocs).get()
                let itemsDocs = dataDocs.data()
                itemsDocs = {...itemsDocs , idDocs:pathDocs}

                const result = dateCalculate(itemsDocs.dates ,itemsDocs.timeFirst ,itemsDocs.timeEnd);
                if(!result.status){
                    delete itemsDocs.discount
                }else{
                    this.$refs.controlDetail.seconds = parseInt(result.far.seconds) 
                    this.$refs.controlDetail.min = parseInt(result.far.minutes)
                    this.$refs.controlDetail.hour = parseInt(result.far.hours)
  
                }
                this.$refs.controlDetail.items =  itemsDocs
                this.$refs.controlReview.itemsImg = itemsDocs.imgs                 
                
                db.ref(`items/${pathId}`).on('value', (snapshot) => {
                    const data = snapshot.val()
                    if(!data || !this.$refs.controlDetail) return
                    this.$refs.controlDetail.items = { ...this.$refs.controlDetail.items , ...data }
                })        
            } catch (error) {
                console.log(error)
                this.$refs.AlertButtom.snackbar = true
                this.$refs.AlertButtom.colorAlart = 'red'
                this.$refs.AlertButtom.text = 'ไม่พบข้อมูลสินค้าในระบบ'
                this.$refs.AlertButtom.icon = 'mdi mdi-alert-circle'
            }
        },
        upView() {
            // read path
            let path = this.$router.currentRoute.hash
            let pathSubId = path.split('#')
            const pathId = pathSubId[1]
            const pathDocs = pathSubId[2]
            setTimeout(() => {
                updateView(pathId);
            }, 10000);
        }
    },
}
</script>