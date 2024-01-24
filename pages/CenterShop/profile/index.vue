<template>
    <v-app>
        <detail></detail>
    </v-app>
</template>
<script>
import detail from './detail.vue';
export default {
    layout: 'default',
    data() {
        return {
            property: 'value',
        };
    },
    methods: {
        
    },
    components: {
        detail
    }
}
</script>