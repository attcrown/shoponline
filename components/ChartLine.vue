<template>
    <div>
        <client-only>
            <BarChart :data="chartData" :options="option" />
        </client-only>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    computed: {
        chartData() {
            return {
                labels: [1, 2, 3, 4, 5 ,6 ,7 ,8],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: [1, 4, 6, 3, 0.5 ,10 ,5 ,3],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(75, 192, 192, 0.2)'
                        ],
                        borderColor: [
                            'rgb(75, 192, 192)',
                            'rgb(75, 192, 192)',
                            'rgb(75, 192, 192)',
                            'rgb(75, 192, 192)',
                            'rgb(75, 192, 192)',
                            'rgb(75, 192, 192)',
                            'rgb(75, 192, 192)',
                            'rgb(75, 192, 192)'
                        ],
                        borderWidth: 1,
                    },
                ],
            }
        },
        option() {
            return {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
}
</script>