<template>
  <div>
    <b-container>

      <b-row>
        <!-- 버튼 그룹 -->
        <b-col sm="6">
          <b-button-group size="sm">
            <b-button v-on:click="downloadVoca()">
              <b-img width="35" height="35" :src="images.memo" alt="btn image" />
              <span class="btn-font-size">메모장으로 저장</span>
            </b-button>
            <b-button :state="validationImage[0]" :disabled="validationImage[0]" @click="sendVocaToTable()">
              <b-img width="35" height="35" :src="validationImage[1]" alt="btn image" />
              <span class="btn-font-size">단어시험지 만들기</span>
            </b-button>
            <b-dropdown left text="카테고리">
              <b-dropdown-header>영어</b-dropdown-header>
              <b-dropdown-item @click="buttonGroup.category.text='TOEIC'">TOEIC</b-dropdown-item>
              <b-dropdown-item @click="buttonGroup.category.text='TEPS'">TEPS</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-header>일본어</b-dropdown-header>
              <b-dropdown-item @click="buttonGroup.category.text='JPLT'">JPLT</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="buttonGroup.category.text='기타'">기타</b-dropdown-item>
            </b-dropdown>
          </b-button-group>
        </b-col>

        <!-- 웹 한 줄 설명  -->
        <b-col sm="6">
          <b-alert show variant="primary">빠르고 간단하게 텍스트를 단어시험지로 만들어 보세요.</b-alert>
        </b-col>
      </b-row>

      <!-- 텍스트에어리아 -->
      <b-row class="mt-2">
        <b-col sm="6">
          <div id="preview-label" v-cloak>{{buttonGroup.category.text}}</div>
          <b-form-textarea placeholder="영어단어, 한글
  Simple, 간단한
  Voca, 단어
  Test paper, 시험지 " title="사용법" autofocus
            class="textfield" id="inputField" no-resize v-model="text" />
        </b-col>

        <!-- 프리뷰 -->
        <b-col sm="6" class="preview-container">
          <div id="preview-label">미리보기</div>
          <preview id="preview" :vocaProp="voca" :tableHeaderProp="vocaHeader"></preview>
        </b-col>
      </b-row>

      <!-- 텍스트에어리아 호버 툴팁 -->
      <b-tooltip target="inputField" placement="right">
        <span>각 단어 사이는 <strong>,</strong> 로 구분합니다.</span>
      </b-tooltip>

      <!-- 설명 칸 -->
      <explanation class="mt-5"></explanation>

      <!-- 다른 사용자가 사용한 단어를 카테고리로 정렬 후 불러옴 -->
      <category class="mt-5"></category>


      <!-- 사용자가 사용한 단어를 불러옴 -->
      <b-row>
        <b-card-group columns class="mt-5">
          <b-card class="card text-center" v-for="(remoteVoca, index) in remoteVocas" :key="index">
            <pre v-on:click="copy(remoteVoca)">{{remoteVoca.voca}}</pre>
          </b-card>
        </b-card-group>
      </b-row>
    </b-container>

    <!-- 스낵바 -->
    <snackbar></snackbar>

  </div>
</template>

<script>
  import Preview from './Preview.vue'
  import Category from './Category.vue'
  import Snackbar from './Snackbar.vue'
  import Explanation from './Explanation.vue'
  import {
    saveAs
  } from '@elastic/filesaver'
  // import XLSX from 'xlsx'
  import axios from 'axios'

  export default {
    name: 'VocaTextField',
    components: {
      'preview': Preview,
      'Category': Category,
      'snackbar': Snackbar,
      'explanation': Explanation,
    },
    data() {
      return {
        //텍스트 에이리어에 있는 텍스트를 담는 변수
        text: "",
        //텍스트를 리폼한 단어를 담는 변수
        voca: [{
          "english": "",
          "korean": ""
        }],
        vocaHeader: [{
          "english": "",
          "korean": ""
        }],
        serverUrl: "https://vocatestsserver.herokuapp.com",
        // serverUrl: "http://localhost:5001",
        remoteVocas: [],
        images: {
          check: require('../assets/check.png'),
          uncheck: require('../assets/uncheck.png'),
          memo: require('../assets/memo.png'),
          arrow: require('../assets/arrow.svg'),
        },
        buttonGroup: {
          category: {
            text: "기타",
          },
        },
      }
    },
    watch: {
      text: function (text) {
        let reformedText = this.reformText(text)
        this.voca = this.formatTextToVoca(reformedText)
      }
    },
    created() {
      this.getSavedDataOnLocalStorage()
      this.getVocas()
    },
    destroyed() {
      this.saveDataOnLocalStorage()
    },
    computed: {
      validationImage: function () {
        if (this.checkTextValidation(this.text)) {
          return new Array(true, this.images.uncheck) //boolean값과 그에 맞는 사진 url을 반환
        }
        return new Array(false, this.images.check) //boolean값과 그에 맞는 사진 url을 반환
      },
    },
    methods: {
      checkTextValidation: function (text) {
        const csvRegexp = /^[^,]+(,[^,]*)$/ //단어, 단어 이런 형식인지 판별
        const vocas = text.split("\n")

        for (let i = 0; i < vocas.length; i++) {
          if (vocas[i] == "") continue //공백일 경우 스킵

          const result = csvRegexp.test(vocas[i])

          //TODO: test를 통과하지 못 했을 때 false반환으로 수정하기
          if (!result) {
            return true
          }
        }

        return false
      },
      postVocas: function (voca) {
        if (!voca || voca.length < 1) return
        let router = "/api/voca"

        let text = ""
        text += `${this.vocaHeader[0].english}, ${this.vocaHeader[0].korean}\n`
        voca.forEach((x, index) => {
          text += `${voca[index].english}, ${voca[index].korean}\n` //서버에 보낼 형식
        })

        axios.post(this.serverUrl + router, {
            voca: text
          })
          .then(res => {})
          .catch(err => {
            console.log(err)
          })
      },
      //서버로 부터 텍스트 받음
      getVocas: function () {
        let router = "/api/voca";

        axios.get(this.serverUrl + router)
          .then((res) => {
            this.remoteVocas = res.data.vocas;
          })
          .catch((err) => {
            console.log(err);
          });

      },
      //입력받은 텍스트를 다듬은 후, 문자열 배열로 바꿔줌
      reformText: function (text) {
        text = text.replace(/\n/g, ",").split(',') //엔터값없애줌
          .map((item) => { //공백없애줌
            return item.trim();
          })
          .filter((item) => { //""값 없애줌
            return item != "";
          });

        return text;
      },
      //유저가 작성한 텍스트를 테이블에 보낼 형식으로 바꿔주는 함수
      formatTextToVoca: function (text) {
        let vocaObj = new Array();
        let cnt = 0;
        let englishItemTemp;

        text.forEach((item) => {
          cnt++;
          if (cnt % 2 == 1) {
            englishItemTemp = item;
          } else {
            vocaObj.push({
              "english": englishItemTemp,
              "korean": item
            });
          }
        });

        this.vocaHeader = vocaObj.splice(0, 1);

        return vocaObj;
      },
      //버튼클릭시 App.vue로 값을 보냄
      sendVocaToTable: function () {
        let reformedText = this.reformText(this.text);
        this.voca = this.formatTextToVoca(reformedText);

        this.postVocas(this.voca);
        //router에서 table로 값을 전달함
        this.$router.push({
          name: 'Table',
          params: {
            vocaProp: this.voca,
            tableHeaderProp: this.vocaHeader
          }
        });
      },
      //파일 저장 버튼 누르면 실행
      //텍스트 필드의 텍스트를 파일로 저장함
      downloadVoca: function () {
        if (this.text === undefined || this.text.length < 1) return;

        const text = this.text
        const newlineRegexp = /\r\n|\r|\n/
        const noNewlineTexts = text.split(newlineRegexp)

        let temp = ""
        noNewlineTexts.forEach(str => {
          temp += (str += "\r\n") //각 배열에 newline을 추가해줌
        })

        const blob = new Blob([temp], {
          type: "text/plain;charset=utf-8"
        })

        saveAs(blob, "Voca.txt");
      },
      //로컬스토리지에 저장한 데이터를 가져옴
      getSavedDataOnLocalStorage: function () {
        try {
          let savedVocas = JSON.parse(localStorage.getItem('savedItems'))

          if (!savedVocas) return

          this.text = "";
          savedVocas.forEach((item) => {
            this.text += `${item.english}, ${item.korean}\n`
          })
        } catch (err) {
          this.text = ""
        }
      },
      //값을 전달하기전 로컬스토리지에 저장한다
      saveDataOnLocalStorage: function () {
        if (this.vocaHeader.length < 1) return;
        localStorage.setItem('savedItems', JSON.stringify(this.vocaHeader.concat(this.voca)));
      },
      copy: function (remoteVoca) {
        this.text = remoteVoca.voca
      },
    }
  }

</script>
