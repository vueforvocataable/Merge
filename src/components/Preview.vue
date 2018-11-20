<template>
  <b-container>
    <b-row>
      <b-col>
        <b-table :fields="fields" :items="createTable.slice(0, rowNum*0.5)" :bordered="true" :small="true">
          <template slot="index" slot-scope="data" v-cloak> {{data.index + 1}} </template>
          <template slot="english" slot-scope="data" v-cloak> {{data.item.english}} </template>
          <template slot="korean" slot-scope="data" v-cloak> {{data.item.korean}} </template>
        </b-table>
      </b-col>
      <b-col>
        <b-table :v-model="fields" :fields="fields" :items="createTable.slice(rowNum*0.5, rowNum)" :bordered="true"
          :small="true">>
          <template slot="index" slot-scope="data" v-cloak> {{data.index + rowNum * 0.5 + 1}} </template>
          <template slot="english" slot-scope="data" v-cloak> {{data.item.english}} </template>
          <template slot="korean" slot-scope="data" v-cloak> {{data.item.korean}} </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: "Preview",
    props: {
      vocaProp: {
        type: Array,
        default: () => [{
          "english": "Hello",
          "korean": "안녕하세요"
        }]
      },
      vocaHeaderProp: {
        type: Array,
        default: () => [{
          "english": "영어",
          "korean": "한글"
        }]
      }
    },
    watch: {
      vocaProp: function () {
        this.init()
      },
      vocaHeaderProp: function (header) {
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
            label: this.vocaHeaderProp[0].english
          },
          {
            "class": "vocaWidth",
            key: "korean",
            label: this.vocaHeaderProp[0].korean
          }
        ],
        vocas: "",
        createTable: "",
        rowNum: 50,
      }
    },
    created() {
      this.init();
    },
    methods: {
      //공백 만들 개수 생성
      init: function () {
        let emptyArr = this.rowNum
        this.createTable = new Array(emptyArr).fill({
          "english": "",
          "korean": ""
        })

        this.fillTableContent()
      },
      //단어 넣기
      fillTableContent: function () {
        this.vocas = this.vocaProp;
        for (let i = 0; i < this.vocas.length; i++) {
          this.createTable.splice(i, 1, this.vocas[i])
        }
      }
    },
  }

</script>
