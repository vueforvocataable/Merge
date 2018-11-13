<template>
  <div>
    <b-col>
      <b-table :fields="fields" :items="tableMake.slice(0,this.tableMake.length / 2)" :small="small" :striped="striped"
        :bordered="bordered">
        <template slot="index" slot-scope="data"> {{data.index + 1}} </template>
        <template v-if="Zigzag(data.index) || !blindEng " slot="english" slot-scope="data"> {{data.item.english}}
        </template>
        <template v-if="!blindKor || Zigzag(data.index + 1)" slot="korean" slot-scope="data"> {{data.item.korean}}
        </template>
      </b-table>
    </b-col>
    <b-col>
      <b-table :v-model="this.fields.label" :fields="fields" :items="tableMake.slice(this.tableMake.length / 2,this.tableMake.length)"
        :small="small" :striped="striped" :bordered="bordered">
        <template slot="index" slot-scope="data"> {{indexNum(data.index) + data.index}} </template>
        <template v-if="Zigzag(data.index) || !blindEng " slot="english" slot-scope="data"> {{data.item.english}}
        </template>
        <template v-if="!blindKor || Zigzag(data.index + 1)" slot="korean" slot-scope="data"> {{data.item.korean}}
        </template>
      </b-table>
      <div>{{fields.label}}</div>
    </b-col>
  </div>
</template>

<script>
  import _ from 'underscore';
  export default {
    name: "VocaTable",
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
        // vocaPagination: 1,
        striped: false,
        small: false,
        bordered: true,
        blindEng: false,
        blindKor: false,
        blindZigzag: false
      }
    },
    //@desc: 테이블이 생성될때 들어오는 값
    //@params:
    //@returns: 
    created() {
      this.init();
    },
    computed: {},
    //vocas 랜덤으로 섞기
    methods: {
      indexNum: function (tableindex) {
        tableindex = this.tableMake.length / 2
        return tableindex + 1
      },
      Zigzag: function (value) {

        if (this.blindZigzag == true) {
          return value % 2;
        }
        if (this.blindEng == true) {
          return 0
        }
      },
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
