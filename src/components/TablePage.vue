<template>
  <div>
    <b-container>
      <div class="d-print-none">
        <a href="javascript:window.print()">
          <b-button class="btn btn-lg">인쇄</b-button>
        </a>
        <b-button class="btn btn-lg" @click="isSuffle = !isSuffle">단어섞기</b-button>
        <b-button v-b-modal.upLoad class="btn btn-lg">워터마크</b-button>
        <b-button-group v-show="image">
          <b-button @click="fullBackgroundImg()" class="btn btn-sm">워터마크 a4크기</b-button>
          <b-button @click="resetBackgroundImg()" class="btn btn-sm">워터마크 원래대로</b-button>
          <b-button @click="removeImage()" class="btn btn-sm">워터마크 지우기</b-button>
        </b-button-group>
        <b-form-group>
          <b-form-checkbox class="checkbox" v-model="blindZigzag">무작위 가리기</b-form-checkbox>
          <b-form-checkbox class="checkbox" v-model="blindEng">영어 가리기</b-form-checkbox>
          <b-form-checkbox class="checkbox" v-model="blindKor">뜻 가리기</b-form-checkbox>
          <b-form-checkbox class="checkbox" v-model="striped">줄무늬</b-form-checkbox>
          <b-form-checkbox class="checkbox" v-model="bordered">줄칸 나누기</b-form-checkbox>
        </b-form-group>
      </div>


      <div class="table-container">
        <div v-for="(items, index) in countTable" :key="index">
          <div class="repeatTable">
            <div class="backgroundImg">
              <img id="img" :src="image" v-show="image" />
            </div>
            <voca-table :src="image" :is="items" :vocaProp="cutVoca(index)" :blindEng="blindEng" :blindKor="blindKor"
              :blindZigzag="blindZigzag" :small="small" :striped="striped" :bordered="bordered" :tableHeaderProp="tableHeaderProp"
              :isSuffle="isSuffle"></voca-table>
          </div>
        </div>
      </div>
    </b-container>
    <upLoadModal @show-Img="showImg2"></upLoadModal>
  </div>

</template>

<script>
  import VocaTable from './VocaTable.vue';
  import UpLoadModal from './UpLoadModal.vue';
  import _ from 'underscore';
  export default {
    name: "TablePageLayout",
    components: {
      'vocaTable': VocaTable,
      'upLoadModal': UpLoadModal,
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
        showModal: false,
        image: "",
      }
    },
    watch: {
      blindZigzag: function () {
        if (this.blindZigzag == true) {
          this.blindEng = true
          this.blindKor = true
        }
        if (this.blindZigzag == false) {
          this.blindEng = false
          this.blindKor = false
        }
      }
    },
    mounted() {
      this.addTable()
    },
    methods: {
      removeImage: function () {
        this.image = '';
      },
      resetBackgroundImg: function () {
        let resetBackgroundImg = document.getElementById("img")
        resetBackgroundImg.style.width = "auto"
        resetBackgroundImg.style.height = "auto"
      },
      fullBackgroundImg: function () {
        let fullBackgroundImg = document.getElementById("img")
        fullBackgroundImg.style.width = "100%"
        fullBackgroundImg.style.height = "100%"
      },
      showImg2: function (modalImage) {
        this.image = modalImage
        return this.image
      },
      addTable: function () {
        for (let tablePushNum = 0; tablePushNum < this.vocaProp.length / 50; tablePushNum++) {
          this.countTable.push("vocaTable")
        }
      },
      cutVoca: function (cut) {
        let slicedVoca
        slicedVoca = this.vocaProp.slice(50 * cut, 50 + 50 * cut)
        return slicedVoca
      },
    },
  }

</script>
