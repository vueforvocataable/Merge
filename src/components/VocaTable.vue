<template>
  <div>
    <b-container class="a4">
      <b-row>
        <b-col>
          <b-table  :fields="fields" :items="Table.slice(0,30)" :striped="striped" :bordered="bordered" :small="small">
            <template slot="index" slot-scope="data"> {{data.index + 1}} </template>
            <template v-if="zigzag(data.index) || !blindEng " slot="english" slot-scope="data"> {{data.item.english}}
            </template>
            <template v-if="!blindKor || zigzag(data.index + 1)" slot="korean" slot-scope="data"> {{data.item.korean}}
            </template>
          </b-table>
        </b-col>
        <b-col>
          <b-table :fields="fields" :items="Table.slice(30,60)" :striped="striped" :bordered="bordered" :small="small">
            <template slot="index" slot-scope="data"> {{data.index + 31}} </template>
            <template v-if="zigzag(data.index) || !blindEng " slot="english" slot-scope="data"> {{data.item.english}}
            </template>
            <template v-if="!blindKor || zigzag(data.index + 1)" slot="korean" slot-scope="data"> {{data.item.korean}}
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
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
      },
      blindEng: false,
      blindKor: false,
      blindZigzag: false,
      striped: false,
      small: false,
      bordered: true,
      isSuffle: false,
      plusTable: "",
    },
    watch: {
      isSuffle: function () {
        if (this.isSuffle) {
          this.shuffle()
        }
      },
      vocaProp: function () {
        this.init()
      },
      tableHeaderProp: function (header) {
        if (header.length < 1) return;

        this.fields.splice(1, 1, {
          "class": "vocaWidth",
          key: "english",
          label: header[0].english
        })
        this.fields.splice(2, 1, {
          "class": "vocaWidth",
          key: "korean",
          label: header[0].korean
        })
      },
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
        word: "",
        Table: "",
        nomalIndex: "",
        smallTableIndex: ""
      }
    },
    created() {
      this.createTable();
    },
    computed: {},
    methods: {
      init: function () {
        //공백 만들 개수 생성.
        let emptyArr = Math.floor(this.vocaProp.length / 60) + 1;
        emptyArr = emptyArr * 100;
        this.Table = new Array(emptyArr).fill({
          "english": "",
          "korean": ""
        });

        this.fillTableContent()
      },
      //단어를 넣어줌.
      fillTableContent: function () {
        this.word = this.vocaProp;
        for (let i = 0; i < this.word.length; i++) {
          this.Table[i] = this.word[i];
        }
      },
      nextIndexNum: function (nextTableIndex) {
        nextTableIndex = this.Table.length / 2
        return nextTableIndex + 1
      },
      zigzag: function (value) {
        if (this.blindZigzag == true) {
          return value % 2;
        }
        if (this.blindEng == true) {
          return 0
        }
      },
      shuffle: function () {
        let suffled = _.shuffle(this.word);
        this.Table.splice(0, suffled.length, ...suffled);
      },
      //테이블 공백 채우기 예: 실제 단어 1개 + 공백 49개...
      createTable: function () {
        this.init()
        this.fillTableContent()
      }
    },
  }

</script>
