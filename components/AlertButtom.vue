<template>
    <div class="text-center ma-2">
        <v-snackbar v-model="snackbar" :color="colorAlart" outlined >
            {{ text }}
            <template v-slot:action="{ attrs }">
                <v-btn 
                  :color="colorAlart" 
                  text v-bind="attrs" 
                  @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
  export default {
    data: () => ({   
      text: 'Error',
      colorAlart: 'white',
      snackbar: false
    }),
  }
</script>