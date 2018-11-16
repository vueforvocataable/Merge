<template>
  <b-row class="text-center explanation">
        <b-col>
          <b-img width="35" height="35" :src="images.thumbsUp" alt="thumbs-up icon" />
          <h5>사용이 간편합니다!</h5>
          <p>텍스트를 입력 후 단어시험지 만들기 버튼을 클릭하고 단어를 가리거나 섞은 후 인쇄버튼을 클릭합니다.</p>
        </b-col>

        <b-col>
          <b-img width="35" height="35" :src="images.chrome" alt="chrome icon" />
          <h5>크롬 최적화</h5>
          <p>TestPaper은 크롬에 최적화되어있습니다.</p>
        </b-col>
      </b-row>
</template>

<script>
  export default {
    name: "Explanation",
    props: {},
    watch: {},
    data() {
      return {
          images: {
          thumbsUp: require('../assets/thumbs-up.svg'),
          chrome: require('../assets/chrome.svg'),
        },
      }
    },
    created() {

    },
    methods: {}
  }

</script>