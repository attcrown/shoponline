import Vue from "vue";
import { Bar } from "vue-chartjs";

Vue.component("BarChart", {
    extends: Bar,
    props: {
        data: {
            type: Object,
            required: true,
        },
        options: {
            type: Object,
            required: false,
            default: () => ({
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
            }),
        },
    },
    watch: {
        data: {
            handler() {
                this.renderChart(this.data, this.options);
            },
            deep: true
        },
    },
    mounted() {
        this.renderChart(this.data, this.options);
    },
});
