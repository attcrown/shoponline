<template>
    <div>
        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
    </div>
</template>
  
<script>
export default {
    inject: {
        theme: {
            default: { isDark: false },
        },
    },
}
</script>