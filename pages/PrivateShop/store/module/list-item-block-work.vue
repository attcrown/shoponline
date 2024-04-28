<template>
    <div class="m-3" 
        :class="!$store.state.deviceMode ? 
            'd-flex justify-center' : ''">
        <v-row dense class="mx-0">
            <v-col v-for="item in items" :key="item.id"
                :cols="!$store.state.deviceMode ? 4 : 12">
                <v-card class="rounded-xl mb-4">
                    <v-card-title>
                        {{ formatText(item.name) }}
                        <v-spacer></v-spacer>
                        {{ item.count }} <span class="mdi mdi-box-shadow"></span>
                    </v-card-title>
                    <v-card-subtitle class="d-flex justify-space-between">                        
                        ID : {{ item.id }}
                        <v-chip label outlined
                            color="success" small 
                            class="ps-1 pe-0"
                            style="width: 80px;">
                            WORKING{{dots}}
                        </v-chip>
                    </v-card-subtitle>
                    <v-card-text class="text-end">
                        เริ่มทำงาน {{ item.createdAt }} <br>
                        สิ้นสุดทำงาน {{ item.endAt }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import { formatText } from '~/services/format-number';
export default {
    data() {
        return {
            items : [],
            dots: "."
        }
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
        }
    }
}
</script>