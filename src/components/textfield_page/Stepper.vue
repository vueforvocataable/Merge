<template>
  <v-stepper v-model="e1" class="mx-auto" style="width:100%;" v-if="!isCancel">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">단어 입력하기</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">버튼 누르기</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">인쇄하기</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items class="text-xs-right">

      <v-stepper-content step="1">
        <v-card class="mb-5" height="200px">
          <v-img :src="images.step1"></v-img>
        </v-card>

        <v-btn class="btn-keep-going" @click="e1 = 2">
          계속하기
        </v-btn>

        <v-btn class="btn-cancel" flat @click="isCancel = true">닫기</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-5" height="200px">
          <v-img :src="images.step2"></v-img>
        </v-card>

        <v-btn class="btn-keep-going" @click="e1 = 3">
          계속하기
        </v-btn>

        <v-btn class="btn-cancel" flat @click="isCancel = true">닫기</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-5" height="200px">
            <v-img :src="images.step3"></v-img>
        </v-card>

        <v-btn class="btn-keep-going" @click="e1 = 1">
          계속하기
        </v-btn>

        <v-btn class="btn-cancel" flat @click="isCancel = true">닫기</v-btn>
      </v-stepper-content>

    </v-stepper-items>
  </v-stepper>
</template>

<script>
  export default {
    name: "Stepper",
    props: {},
    watch: {},
    data() {
      return {
        e1: 0,
        isCancel: false,
        images: {
          step1: require('../../assets/step1.png'),
          step2: require('../../assets/step2.png'),
          step3: require('../../assets/step3.png'),
        },
      }
    },
    created() {
    },
    methods: {}
  }

</script>
