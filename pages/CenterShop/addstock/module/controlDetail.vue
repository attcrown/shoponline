<template>
    <div :class="!$store.state.deviceMode ? 'ms-5' : 'mt-5'">
        <h4 class="max-length">{{ items.name }}</h4>
        <p>{{ items.title }}</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items: []
        }
    },
}
</script>