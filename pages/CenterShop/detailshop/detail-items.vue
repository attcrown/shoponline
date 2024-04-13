<template>
    <div>
        details items
        {{ items.seller }}
        {{ items.stockItems }}
    </div>
</template>
<script>
export default {
    data() {
        return {
            items : []
        };
    },
    async mounted() {
        await this.$store.state.detail_item;
        this.searchDetailShop();
    },
    methods: {
        searchDetailShop() {
            // read path
            this.path = this.$router.currentRoute.hash
            this.pathSubId = this.path.split('#')
            const pathId = this.pathSubId[1]
            const pathDocs = this.pathSubId[2]

            this.items = this.$store.state.detail_item
            const db = this.$fire.database;
            // reatlTime search id
            db.ref(`items/${pathId}`).on('value', (snapshot) => {
                if (!snapshot.exists()) return
                
                const data = snapshot.val();
                this.items = {...this.items , ...data}
                console.log(this.items)
            })
        }
    },
}
</script>