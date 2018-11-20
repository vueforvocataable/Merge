<template>
  <div>
    <b-container class="px-0">

      <b-row>
        <!-- 버튼 그룹 -->
        <b-col sm="6">
          <b-button-group size="sm">
            <b-button v-on:click="downloadVoca()">
              <b-img width="35" height="35" :src="images.memo" alt="btn image" />
              <span class="btn-font-size">메모장으로 저장</span>
            </b-button>
            <b-button :state="!validateText.validation" :disabled="!validateText.validation" @click="sendVocaToTable()">
              <b-img width="35" height="35" :src="validateText.img" alt="btn image" />
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
              <b-dropdown-item @click="buttonGroup.category.text='ETC'">ETC</b-dropdown-item>
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
          <preview id="preview" :vocaProp="voca" :vocaHeaderProp="vocaHeader"></preview>
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
      <my-words :vocaProp="voca" :vocaHeaderProp="vocaHeader"></my-words>
      
    </b-container>

    <!-- 스낵바 -->
    <snackbar></snackbar>

  </div>
</template>

<script>
  import Preview from './Preview.vue'
  import category from './category.vue'
  import Snackbar from './Snackbar.vue'
  import Explanation from './Explanation.vue'
  import MyWords from './MyWords.vue'
  import {
    saveAs
  } from '@elastic/filesaver'
  import axios from 'axios'

  export default {
    name: 'VocaTextField',
    components: {
      'my-words': MyWords,
      'preview': Preview,
      'category': category,
      'snackbar': Snackbar,
      'explanation': Explanation,
    },
    data() {
      return {
        //텍스트 에이리어에 있는 텍스트를 담는 변수
        text: "",
        //텍스트를 리폼한 단어를 담는 변수
        voca: [],
        vocaHeader: [],
        //serverUrl: "https://vocatestsserver.herokuapp.com",
        serverUrl: "http://localhost:5001",
        remoteVocas: [],
        images: {
          check: require('../assets/check.png'),
          uncheck: require('../assets/uncheck.png'),
          memo: require('../assets/memo.png'),
          arrow: require('../assets/arrow.svg'),
        },
        buttonGroup: {
          category: {
            text: "ETC",
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
    computed: {
      validateText: function () {
        const csvRegexp = /^[^,]+(,[^,]*)$/ //단어, 단어 이런 형식인지 판별
        const vocas = this.text.split("\n")

        for (let i = 0; i < vocas.length; i++) {
          if (vocas[i] == "") continue //공백일 경우 스킵

          const result = csvRegexp.test(vocas[i])

          //정규식을 통과하지 못 하면 사진과 false반환
          if (result == false) {
            return {
              validation: false,
              img: this.images.uncheck
            }
          }
        }

        return {
          validation: true,
          img: this.images.check
        }
      },
    },
    methods: {
      postVocas: function (voca) {
        if (!voca || voca.length < 1) return
        let router = "/api/voca"

        let text = ""
        text += `${this.vocaHeader[0].english}, ${this.vocaHeader[0].korean}\n`
        voca.forEach((x, index) => {
          text += `${voca[index].english}, ${voca[index].korean}\n`
        })

        axios.post(this.serverUrl + router, {
            voca: text,
            category: this.buttonGroup.category.text
          })
          .then(res => {})
          .catch(err => {
            console.log(err)
          })
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
      //clipborad에 저장
      copy: function (words) {
        // this.text = remoteWords.voca
      },
    }
  }

</script>
