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
                
                <v-divider class="mx-2" vertical style="border: 1px solid #B71C1C; height: 30px"></v-divider>
                
                <p style="font-size: 12px; color: rgb(73, 73, 73); margin-bottom: -4px;">
                    ขายแล้ว {{ 50+Math.floor(Math.random() * 100) }} ชิ้น</p>

                <v-divider class="mx-2" vertical style="border: 1px solid #B71C1C; height: 30px"></v-divider>

                <p style="font-size: 12px; color: rgb(73, 73, 73); margin-bottom: -4px;">100 view</p>

            </div>
            
            <v-divider style="border: 1px solid #B71C1C;"></v-divider>

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
            items: []
        }
    },
}
</script>

<style>
.fontsProDetail {
    font-family: 'Prompt', sans-serif;
    font-weight: 100;
    font-size: 25px;
}
</style>