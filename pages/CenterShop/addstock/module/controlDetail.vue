<template>
    <div :class="!$store.state.deviceMode ? 'ms-5' : 'mt-5'" class="fontsProDetail">
        <v-card outlined style="border: 0px;">
            <v-card-title style="padding: 0px;">
                <v-chip label color="#B71C1C" text-color="white" small class="px-1"><i
                        class="mdi mdi-shopping me-1"></i>Top</v-chip> &nbsp; {{ items.name }}
            </v-card-title>
            <div class="d-flex align-center">
                <v-rating 
                    v-model="rating" 
                    background-color="white" 
                    color="yellow accent-4" 
                    dense half-increments hover
                    style="margin-top: -15px; margin-bottom: -15px;"
                size="18" readonly></v-rating>
                
                <v-divider class="mx-2" vertical style="border: 1px solid rgb(73, 73, 73); height: 30px"></v-divider>
                
                <p style="font-size: 12px; color: rgb(73, 73, 73); margin-bottom: -4px;">
                    ขายแล้ว {{ 50+Math.floor(Math.random() * 100) }} ชิ้น</p>

                <v-divider class="mx-2" vertical style="border: 1px solid rgb(73, 73, 73); height: 30px"></v-divider>

                <p style="font-size: 12px; color: rgb(73, 73, 73); margin-bottom: -4px;">100 view</p>
            </div>
            
            <v-divider style="border: 1px solid #B71C1C; margin-top: 4px"></v-divider>

            <v-navigation-drawer
                dark
                src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
                width="100%" permanent height="40">
                <div class="d-flex align-center justify-space-between" style="height: 100%;">
                    <div class="ms-5 d-flex" style="color: white;">
                        <i class="mdi mdi-alpha-f"></i>
                        <i class="mdi mdi-flash"></i>
                        <i class="mdi mdi-alpha-a"></i>
                        <i class="mdi mdi-alpha-s"></i>
                        <i class="mdi mdi-alpha-h me-3"></i>
                        <i class="mdi mdi-alpha-s"></i>
                        <i class="mdi mdi-alpha-a"></i>
                        <i class="mdi mdi-alpha-l"></i>
                        <i class="mdi mdi-alpha-e"></i>                     
                    </div>
                    <div class="me-5" style="color: white; font-size: 16px;">
                        <i class="mdi mdi-clock-time-eight-outline"></i> จบใน 
                        <v-chip label outlined class="px-1">
                            <div v-if="String(hour).length == 1">0</div>
                            {{hour}}
                        </v-chip>
                        <v-chip label outlined class="px-1">
                            <div v-if="String(min).length == 1">0</div>
                            {{min}}
                        </v-chip>
                        <v-chip label outlined class="px-1">
                            <div v-if="String(seconds).length == 1">0</div>
                            {{seconds}}
                        </v-chip>
                    </div>
                </div>
            </v-navigation-drawer>

            <div class="d-flex align-center p-3" style="background-color: rgb(73, 73, 73, 0.1);">
                <span style="font-size: 16px; text-decoration: line-through; color: rgb(171, 171, 171);">฿300</span>
                <span class="ms-3" style="color: #0240aa;">฿230</span> 
                <v-chip dark color="#B71C1C" class="px-1 ms-3" small label>                    
                    10% ส่วนลด<i class="mdi mdi-sale ms-1"></i> 
                </v-chip>
            </div>

            <v-card-text>
                {{ items.title }}
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            rating: 4.3,
            items: [],
            seconds: 5,
            min: 1,
            hour: 0
        }
    },
    watch: {
        'seconds': function (newVal, oldVal) {
            setTimeout(() => {
                this.settimeSeconds();
            }, 1000);
        }
    },
    mounted() {
        this.settimeSeconds()
    },

    methods: {
        settimeSeconds() {
            if (this.seconds === 0) {                
                if (this.min == 0) {                                       
                    if (this.hour == 0) {
                        return
                    }else {
                        this.hour--
                    }   
                    this.min = 60                  
                }else {
                    this.min--
                }    
                this.seconds = 60            
            }else {
                this.seconds--
            }
        }
    }
}
</script>

<style>
.fontsProDetail {
    font-family: 'Prompt', sans-serif;
    font-weight: 100;
    font-size: 25px;
}
</style>