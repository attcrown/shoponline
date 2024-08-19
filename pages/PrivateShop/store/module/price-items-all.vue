<template>
    <div :class="$store.state.deviceMode ? '' : 'mx-3'">
        <div class="d-flex align-center justify-center">
            <v-card elevation="4"
                :class="$store.state.deviceMode ? '' : 'p-5 rounded-xxl'"
                :style="$store.state.deviceMode ? 'width: 100%;' : 'width: 60%;'">
                <ChartLine :chartData="chartData" />
            </v-card>
        </div>
    </div>
</template>
<script>
import ChartLine from '~/components/ChartLine.vue';

export default {
    data() {
        return { 
            chartData: {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                datasets: [
                    {
                        label: 'ราคาสินค้าทั้งหมด',
                        data: [0, 2, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 37, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            }
        }
    },
    components: {
        
    }
}
</script>