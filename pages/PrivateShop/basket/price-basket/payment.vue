<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card class="fontsPay">
                <v-card-title style="color: #f47a00;">
                    <v-spacer></v-spacer>
                    <h6 class="mt-2">กรุณาชำระเงินภายใน</h6> &nbsp;
                    <v-chip label outlined class="px-1 me-2" dark color="primary">
                        <div v-if="String(min).length == 1">0</div>
                        {{ min }}
                    </v-chip>
                    <v-chip label outlined class="px-1" dark color="primary">
                        <div v-if="String(seconds).length == 1">0</div>
                        {{ seconds }}
                    </v-chip>
                    <h6 class="ms-2 mt-2">นาที</h6>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <v-img contain max-height="600px"
                        :src="require('~/assets/img-payment/Payment.jpeg')">
                    </v-img>
                    <div class="d-flex justify-center">
                        <v-file-input
                            style="max-width: 300px;"
                            v-model="img"
                            :rules="[v => !!v || 'กรุณาอัพโหลดสลิปโอนเงิน']"
                            accept="image/png, image/jpeg, image/bmp"
                            placeholder="อัพโหลดสลิปโอนเงิน"
                            prepend-icon="mdi-camera"
                        ></v-file-input>
                    </div>
                    <v-img v-if="generateImg"
                        contain max-height="300px"
                        :src="generateImg">
                    </v-img>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="min = 0 , seconds = 0">
                        ยกเลิก
                    </v-btn>
                    <v-btn :disabled="img == null" color="success">
                        ชำระเงินแล้ว
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { processImg } from '~/services/img-sizing.js'
export default {
    data() {
        return {
            dialog: false,
            min: 0,
            seconds: 0,
            img: null,
            generateImg: null
        }
    },
    watch: {
        'seconds': function () {
            setTimeout(() => {
                this.settimeSeconds();
            }, 1000);
        },
        'img': async function () {
            if (this.img != null) {
                let generate = await processImg(this.img)
                this.generateImg = URL.createObjectURL(generate)
            }else{
                this.generateImg = null
            }
        }
    },
    methods: {
        settimeSeconds() {
            if (this.seconds === 0) {
                if (this.min === 0) {
                    this.dialog = false
                    return
                } else {
                    this.min--
                }
                this.seconds = 60
            } else {
                this.seconds--
            }
        },
    }
}
</script>

<style>
    .fontsPay{
        font-family: 'Prompt', sans-serif;
        font-weight: 300;
    }
</style>