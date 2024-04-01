<template>
    <v-stepper>
        <v-stepper-header>
            <v-stepper-step step="1" :complete="step1" :rules="[() => step1 !== false]">
                Ad unit details
            </v-stepper-step>

            <v-divider style="border: 1px solid #000"></v-divider>

            <v-stepper-step :rules="[() => false]" step="2">
                Ad templates
                <small>Alert message</small>
            </v-stepper-step>

            <v-divider style="border: 1px solid #000"></v-divider>

            <v-stepper-step step="3">
                Ad sizes
            </v-stepper-step>

            <v-divider style="border: 1px solid #000"></v-divider>

            <v-stepper-step step="4">
                success
            </v-stepper-step>

        </v-stepper-header>
    </v-stepper>
</template>

<script>
    export default {
        data() {
            return {
                step1 : true
            }
        },
    }
</script>
