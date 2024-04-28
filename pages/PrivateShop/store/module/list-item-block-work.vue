<template>
    <div class="m-3 fontsProList">
        <v-row dense class="mx-0">
            <v-col v-for="item in items" :key="item.id"
                :cols="!$store.state.deviceMode ? 4 : 12">
                <v-card class="rounded-xl mb-4">
                    <v-card-title style="color: #43A047">
                        {{ formatText(item.name) }}
                        <v-spacer></v-spacer>
                        {{ item.count }} <span class="mdi mdi-box-shadow"></span>
                    </v-card-title>
                    <v-card-subtitle class="d-flex justify-space-between align-center">                        
                        <div>
                            ID : {{ formatText(item.id) }}
                            <v-btn icon @click="copy(item.id)">
                                <v-icon>mdi-content-copy</v-icon>
                            </v-btn>
                        </div>                        
                        <v-chip label outlined
                            color="success" small 
                            class="ps-1 pe-0"
                            style="width: 80px;">
                            WORKING{{dots}}
                        </v-chip>
                    </v-card-subtitle>
                    <v-card-text 
                        class="d-flex justify-space-between align-center">
                        <div>
                            <v-progress-circular
                                :rotate="360"
                                :size="100"
                                :width="25"
                                value="10"
                                color="primary"
                                >
                                10%
                            </v-progress-circular>
                        </div>
                        <div class="text-end">
                            เริ่มทำงาน {{ item.createdAt }} <br>
                            สิ้นสุดทำงาน {{ item.endAt }}
                        </div>                        
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <AlertButtom ref="AlertButtom"></AlertButtom>
    </div>
</template>
<script>
import AlertButtom from '~/components/AlertButtom.vue';
import { formatText } from '~/services/format-number';
export default {
    data() {
        return {
            items : [],
            dots: "."
        }
    },
    components: {
        AlertButtom
    },
    watch: {
        'dots': function () {
            setTimeout(() => {
                this.setDotsSeconds();
            }, 500);
        },
    },
    mounted() {
        this.setDotsSeconds();
    },
    methods: {
        formatText(text) {
            return formatText(text , this.$store.state.deviceMode)
        },
        setDotsSeconds() {
            if(this.dots === ".") return this.dots = ".."
            if(this.dots === "..") return this.dots = "..."
            if(this.dots === "...") return this.dots = "."
        },
        copy(id) {
            navigator.clipboard.writeText(id)
            this.$refs.AlertButtom.snackbar = true
            this.$refs.AlertButtom.colorAlart = 'success'
            this.$refs.AlertButtom.text = 'คัดลอก ID สําเร็จ'
            this.$refs.AlertButtom.icon = 'mdi mdi-check-circle-outline'
        }
    }
}
</script>
<style>
.fontsProList {
    font-family: 'Prompt', sans-serif;
    font-weight: 300;
}
</style>