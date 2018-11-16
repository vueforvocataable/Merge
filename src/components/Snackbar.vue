<template>
  <v-snackbar v-model="snackbar.show" :bottom="true" :timeout="snackbar.timeout">
    <span v-html="snackbar.text"> {{snackbar.text}}</span>
    <v-btn color="pink" flat @click="snackbar.show = false">
      <span>닫기</span>
    </v-btn>
    <v-btn flat @click="snackbar.show = false">
      <a :href="surveyLink" target="_blank" style="color: green;">열기</a>
    </v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    name: "Snackbar",
    props: {},
    watch: {},
    data() {
      return {
        surveyLink: "https://goo.gl/PdJtnB",
        snackbar: {
          show: true,
          timeout: 6000, //6 sec
          text: '<span>사용 후기를 말씀해 주세요. </br>추첨을 통해서 소정의 상품을 드립니다.</span>'
        },
      }
    },
    created() {

    },
    methods: {}
  }

</script>
