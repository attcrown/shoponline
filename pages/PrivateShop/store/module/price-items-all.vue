<template>
    <div>
        <div class="d-flex align-center justify-center">
            <v-card class="p-5 rounded-xxl" elevation="4" :style="$store.state.deviceMode ? 'width: 100%;' : 'width: 60%;'">
                <ChartLine></ChartLine>
            </v-card>
        </div>
    </div>
</template>
<script>
import ChartLine from '~/components/ChartLine.vue';
export default {
    data() {
        return { }
    },
    components: {
        ChartLine
    },
    mounted() {

    }

}
</script>