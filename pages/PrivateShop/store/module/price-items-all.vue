<template>
    <div :class="$store.state.deviceMode ? '' : 'mx-3'">
        <div class="d-flex align-center justify-center">
            <v-card elevation="4"
                :class="$store.state.deviceMode ? '' : 'p-5 rounded-xxl'"
                :style="$store.state.deviceMode ? 'width: 100%;' : 'width: 60%;'">
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