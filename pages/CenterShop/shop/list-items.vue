<template>
    <div>
        <!-- <div style="background-color: #0240aa;" class="pt-3 pb-3">
            <hr class="mx-10" style="border-bottom: 2px solid #212020c0">
        </div> -->
        <div style="background-color: #d7d7d7;">
            <v-container fluid :class="!$store.state.deviceMode ? 'd-flex justify-center' : ''"
                :style="!$store.state.deviceMode ? 'max-width: 1200px' : ''">
                <v-row dense class="fontsProList">
                    <v-col cols="12" class="text-center">
                        <div style="font-size: 28px;" class="mt-5">
                            <v-icon left 
                                :color="this.cards.length === 0 ? 'red' : '#FF9800'" 
                                style="font-size: 32px;">
                                {{ this.cards.length === 0 ? 'mdi-archive-cancel-outline' : 'mdi-label'}}
                            </v-icon>
                            {{ this.cards.length === 0 ? 'ไม่พบสินค้า' : 'รายการสินค้าแนะนำ'}}
                        </div>
                    </v-col>
                    <v-col v-for="card in cards" :key="card.title" :cols="$store.state.deviceMode ? 6 : 3">
                        <v-hover v-slot="{ hover }">
                            <v-card  
                                :elevation="hover ? 16 : 2" 
                                :class="!$store.state.deviceMode ? 'm-1' : 'mb-4'">
                                <v-img :src="card.src" class="white--text align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                                    <v-card-title v-text="card.title"></v-card-title>
                                </v-img>

                                <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn icon>
                                        <v-icon>mdi-heart</v-icon>
                                    </v-btn>

                                    <v-btn icon>
                                        <v-icon>mdi-bookmark</v-icon>
                                    </v-btn>

                                    <v-btn icon>
                                        <v-icon>mdi-share-variant</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        {{ checkShowListItems }}
    </div>
</template>
<script>
export default {
    data: () => ({
        cards: [],
    }),
    computed: {
        checkShowListItems() {
            this.cards = this.$store.state.show_list_item;
            return;
        }
    },
    methods: {

    }
}
</script>
<style>
.fontsProList {
    font-family: 'Prompt', sans-serif;
    font-weight: 300;
}
</style>