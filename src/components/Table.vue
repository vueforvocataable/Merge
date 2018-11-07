<template>
  <b-container>
    <b-row>
      <b-col>
        <b-table :fields="fields" :items="tableMake.slice(0 + (vocaPagination - 1) * 50, 25 + (vocaPagination - 1) * 50)"
          :small="small" :striped="striped" :bordered="bordered">
          <template slot="index" slot-scope="data"> {{data.index + 1 +(vocaPagination - 1) * 50}} </template>
          <template v-if="!blindEng" slot="english" slot-scope="data"> {{data.item.english}} </template>
          <template v-if="!blindKor" slot="korean" slot-scope="data"> {{data.item.korean}} </template>
        </b-table>
      </b-col>
      <b-col>
        <b-table :v-model="this.fields.label" :fields="fields" :items="tableMake.slice(25 + (vocaPagination - 1) * 50, 50 + (vocaPagination - 1) * 50)"
          :small="small" :striped="striped" :bordered="bordered">
          <template slot="index" slot-scope="data"> {{data.index + 26 + (vocaPagination - 1) * 50}} </template>
          <template v-if="!blindEng" slot="english" slot-scope="data"> {{data.item.english}} </template>
          <template v-if="!blindKor" slot="korean" slot-scope="data"> {{data.item.korean}} </template>
        </b-table>
        <div>{{fields.label}}</div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  //TODO : 1. html태그 외부 파일로 두고, 변수하나로 묶기
  //3. "", '' 중 어떤것 쓸지 통일하기 (Airbnb 코딩규칙 찾아보면 더 좋음)
  //4. css 외부 파일로 두기
  //5. 변수, 함수 이름 한번더 검토
  //6. data부분 vue store찾아서 외부 파일로 두기
  import _ from 'underscore';
  export default {
    name: "Table",
    props: {
      vocaProp: {
        type: Array,
        default: () => [{
          "english": "Hello",
          "korean": "안녕하세요"
        }]
      },
      tableHeaderProp: {
        type: Array,
        default: () => [{
          "english": "영어",
          "korean": "한글"
        }]
      }
    },
    data() {
      return {
        fields: [{
            "class": "indexWidth",
            key: "index",
            label: ""
          },
          {
            "class": "vocaWidth",
            key: "english",
            label: this.tableHeaderProp[0].english
          },
          {
            "class": "vocaWidth",
            key: "korean",
            label: this.tableHeaderProp[0].korean
          }
        ],
        vocas: "",
        tableMake: "",
        vocaPagination: 1,
        striped: false,
        small: false,
        bordered: true,
        blindEng: false,
        blindKor: false,
      }
    },
    //@desc: 테이블이 생성될때 들어오는 값
    //@params:
    //@returns: 
    created() {
      this.init();
      console.log(this.vocaProp)
    },
    //vocas 랜덤으로 섞기
    methods: {
      shuffle: function () {
        let suffled = _.shuffle(this.vocas);
        this.tableMake.splice(0, suffled.length, ...suffled);
      },
      //테이블 공백 채우기 예: 실제 단어 1개 + 공백 49개...
      init: function () {
        //공백 만들 개수 생성.
        let emptyArr = Math.floor(this.vocaProp.length / 50) + 1;
        emptyArr = emptyArr * 50;
        this.tableMake = new Array(emptyArr).fill({
          "english": "",
          "korean": ""
        });
        //공백에 단어를 넣어준다.
        this.vocas = this.vocaProp;
        for (let i = 0; i < this.vocas.length; i++) {
          this.tableMake[i] = this.vocas[i];
        }
      }
    },
  }

</script>