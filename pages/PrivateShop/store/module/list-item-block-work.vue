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
                            class="ms-4"
                            style="width: 88px;">
                            WORKING{{dots}}
                        </v-chip>
                    </v-card-subtitle>
                    <v-card-text class="text-end">
                        เริ่มทำงาน {{ item.createdAt }} <br>
                        สิ้นสุดทำงาน {{ item.createdAt }}
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
            items : [
                {
                    id : "EDti-1231sda-213",
                    name : 'Cymera-Photo Editor Camera Cymera-Photo Editor Camera',
                    count : 10,
                    createdAt : '2021-01-01 00:00:00', 
                },
                {
                    id : "EDti-1231sda-21323",
                    name : 'Cymera-Photo Editor Camera Cymera-Photo Editor Camera',
                    count : 5,
                    createdAt : '2021-01-01 00:00:00', 
                },
                {
                    id : "EDti-1231sda-21311-sdaa-a",
                    name : 'Cymera-Photo Editor Camera Cymera-Photo Editor Camera',
                    count : 3,
                    createdAt : '2021-01-01 00:00:00', 
                },
                {
                    id : "EDti-1231sda-21311-sdaa-121a",
                    name : 'Cymera-Photo Editor Camera Cymera-Photo Editor Camera',
                    count : 4,
                    createdAt : '2021-01-01 00:00:00', 
                },
                {
                    id : "EDti-1231sda-21311-sdaa-saada",
                    name : 'Cymera-Photo Editor Camera Cymera-Photo Editor Camera',
                    count : 10,
                    createdAt : '2021-01-01 00:00:00', 
                },
                {
                    id : "EDti-1231sda-21311-sdaa-sada",
                    name : 'Cymera-Photo Editor Camera Cymera-Photo Editor Camera',
                    count : 5,
                    createdAt : '2021-01-01 00:00:00', 
                },
                {
                    id : "EDti-1231sda-21311-sdaa-aadas",
                    name : 'Cymera-Photo Editor Camera Cymera-Photo Editor Camera',
                    count : 8,
                    createdAt : '2021-01-01 00:00:00', 
                }
            ],
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