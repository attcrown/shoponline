<template>
    <div>
        <v-file-input
            v-model="img"></v-file-input>
    </div>
</template>
<script>
export default {
    data() {
        return {
            img:null,
            property: 'value',
        };
    },
}
</script>