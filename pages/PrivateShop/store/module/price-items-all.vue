<template>
    <div>
        PriceAll
        <div style="width: 40%;">
            <v-sparkline
                :gradient="['#5EF7B7','#0CBB72']"
                type="bar"
                show-labels
                :value="value"
                :labels="valuelabels"
            ></v-sparkline>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: [1, 2, 5, 9, 5, 10, 3, 5 ,20 ,13 ,15 ,18] ,
            valuelabels: ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'] ,
        }
    },
}
</script>