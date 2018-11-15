<template>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="(item,i) in ['TOEIC', 'TEPS', 'JPLT', 'ETC']" :key="i">
      <div slot="header" @click="test(item)">{{item}}</div>
      <b-card-group columns>
        <b-card tag="article" style="max-width: 20rem;" v-for="(item, i) in 5" :key="i">
          <pre class="card-text">
            영어단어, 뜻\n
            advertisement, 광고
            produce, 만들다
            excess, 지나침
            guaranetee, 보장하다
            value, 가치
            conveyance, 운반
            industrialize, 산업화되다
            puzzle, 퍼즐
          </pre>
          <b-button-group>
            <b-button>전체보기</b-button>
            <b-button>공유하기</b-button>
          </b-button-group>
        </b-card>
      </b-card-group>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  export default {
    name: "ExpansionPanel",
    props: {},
    watch: {},
    data() {
      return {

      }
    },
    created() {

    },
    methods: {
      test: function (i) {
        console.log(i)
        //TODO: 서버에서 단어 불러오기
      }
    }
  }

</script>
