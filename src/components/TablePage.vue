<template>
  <div>
    <b-container>
      <div class="d-print-none">
        <a href="javascript:window.print()">
          <b-button class="btn btn-primary">인쇄</b-button>
        </a>
        <b-button class="btn btn-primary" @click="isSuffle = !isSuffle">단어섞기</b-button>

        <b-button-group vertical>
          <b-button class="btn btn-primary" @click="blindZigzag = !blindZigzag">지그재그</b-button>
          <b-button-group v-if="blindZigzag">
            <b-button class="btn btn-primary btn-sm" @click="blindEng = !blindEng">왼쪽
              <b-img v-show="blindEng == true" width="15" height="15" :src="images.smallcheck" />
            </b-button>
            <b-button class="btn btn-primary btn-sm" @click="blindKor = !blindKor">오른쪽
              <b-img v-show="blindKor == true" width="15" height="15" :src="images.smallcheck" />
            </b-button>
          </b-button-group>
        </b-button-group>

        <b-button-group vertical>
          <b-button class="btn btn-primary btn-sm" disabled>가려주기</b-button>
          <b-button-group>
            <b-button class="btn btn-primary btn-sm" @click="blindEng = !blindEng">왼쪽
              <b-img v-show="blindEng == true" width="15" height="15" :src="images.smallcheck" />
            </b-button>
            <b-button class="btn btn-primary btn-sm" @click="blindKor = !blindKor">오른쪽
              <b-img v-show="blindKor == true" width="15" height="15" :src="images.smallcheck" />
            </b-button>
          </b-button-group>
        </b-button-group>

        <b-button-group vertical>
          <b-button class="btn btn-primary btn-sm" disabled>꾸미기</b-button>
          <b-button-group>
            <b-button class="btn btn-primary btn-sm" @click="small = !small">작게
              <b-img v-show="small == true" width="15" height="15" :src="images.smallcheck" />
            </b-button>
            <b-button class="btn btn-primary btn-sm" @click="striped = !striped">줄무늬
              <b-img v-show="striped == true" width="15" height="15" :src="images.smallcheck" />
            </b-button>
            <b-button class="btn btn-primary btn-sm" @click="bordered = !bordered">줄칸 나누기
              <b-img v-show="bordered == true" width="15" height="15" :src="images.smallcheck" />
            </b-button>
          </b-button-group>
        </b-button-group>

      </div>
    </b-container>
    <div class="table-container">
      <voca-table v-for="(items, index) in countTable" :key=" index" :is="items" :vocaProp="cutVoca(index)" :blindEng="blindEng"
        :blindKor="blindKor" :blindZigzag="blindZigzag" :small="small" :striped="striped" :bordered="bordered"
        :tableHeaderProp="tableHeaderProp" :isSuffle="isSuffle"></voca-table>
    </div>
  </div>
</template>

<script>
  import VocaTable from './VocaTable.vue';
  import _ from 'underscore';
  export default {
    name: "TablePageLayout",
    components: {
      'vocaTable': VocaTable
    },
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
        images: {
          smallcheck: require('../assets/smallcheck.png'),
        },
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
        striped: false,
        small: false,
        bordered: true,
        blindEng: false,
        blindKor: false,
        blindZigzag: false,
        countTable: [],
        sliceVocaProps: [],
        isSuffle: false,
      }
    },
    mounted() {
      this.addTable()
    },
    methods: {
      addTable: function () {
        for (let tablePushNum = 0; tablePushNum < this.vocaProp.length / 60; tablePushNum++) {
          this.countTable.push("vocaTable")
        }
      },
      cutVoca: function (cut) {
        let slicedVoca
        slicedVoca = this.vocaProp.slice(60 * cut, 60 + 60 * cut)
        return slicedVoca
      },
    },
  }

</script>
