<template>
  <div>
    <b-container>

      <b-row>
        <b-col sm="6">
          <b-alert show variant="primary">빠르고 간단하게 텍스트를 단어시험지로 만들어 보세요.</b-alert>
        </b-col>
        <b-col sm="6">
          <b-button-group size="sm">
            <b-button class="btn" v-on:click="downloadVoca()">
              <b-img width="35" height="35" :src="images.memo" alt="btn image" />
              <span class="font-weight-bold">메모장으로 저장</span>
            </b-button>
            <b-button :state="validationImage[0]" :disabled="validationImage[0]" class="btn" v-on:click="sendVocaToTable()">
              <b-img width="35" height="35" :src="validationImage[1]" alt="btn image" />
              <span class="font-weight-bold">단어시험지 만들기</span>
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="6">
          <b-form-textarea v-b-popover.hover="'각 단어 사이는 \' , \'로 구분합니다.'" placeholder="영어단어, 한글
  Simple, 간단한
  Voca, 단어
  Test paper, 시험지 "
            title="사용법" autofocus class="textfield" id="inputField" no-resize v-model="text" />
        </b-col>
        <b-col sm="6">
          <div id="preview-label">미리보기</div>
          <vocatable id="preview" :vocaProp="voca" :tableHeaderProp="vocaHeader"></vocatable>
        </b-col>

      </b-row>
      <b-row>
        <b-col>
          <b-card-group columns class="mt-4">
            <b-card class="card text-center" v-for="(remoteVoca, index) in remoteVocas" :key="index">
              <pre v-on:click="copy(remoteVoca)">{{remoteVoca.voca}}</pre>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>

    <!-- <v-snackbar v-model="snackbar.show" :bottom="true" :timeout="snackbar.timeout">
      테스트 스낵바
      <v-btn color="pink" flat @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar> -->
  </div>
</template>

<script>
  import Table from './Table.vue';
  import {
    saveAs
  } from '@elastic/filesaver';
  import XLSX from 'xlsx';
  import axios from 'axios';

  export default {
    name: 'VocaTextField',
    components: {
      'vocatable': Table
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
        remoteVocas: [],
        images: {
          check: require('../assets/check.png'),
          uncheck: require('../assets/uncheck.png'),
          memo: require('../assets/memo.png')
        },
        // snackbar: {
        //   show: false,
        //   timeout: 10000,
        // },
      }
    },
    watch: {
      text: function (text) {
        let reformedText = this.reformText(text)
        this.voca = this.formatTextToVoca(reformedText)
      }
    },
    created() {
      this.getSavedDataOnLocalStorage();
      this.getVocas();
    },
    destroyed() {
      this.saveDataOnLocalStorage();
      this.postVocas(this.voca);
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

          if (!result) {
            return true
          }
        }

        return false
      },
      postVocas: function (voca) {
        if (!voca || voca.length < 1) return;
        let router = "/api/voca";

        let text = "";
        voca.forEach((x, index) => {
          text += `${voca[index].english}, ${voca[index].korean}\n`; //서버에 보낼 형식
        });

        axios.post(this.serverUrl + router, {
            voca: text
          })
          .then(res => {})
          .catch(err => {
            console.log(err);
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
        });

        saveAs(blob, "Voca.txt");
      },
      //로컬스토리지에 저장한 데이터를 가져옴
      getSavedDataOnLocalStorage: function () {
        let savedVocas = JSON.parse(localStorage.getItem('savedItems'));

        if (!savedVocas) return;

        this.text = "";
        savedVocas.forEach((item) => {
          this.text += `${item.english}, ${item.korean}\n`;
        })
      },
      //값을 전달하기전 로컬스토리지에 저장한다
      saveDataOnLocalStorage: function () {
        if (this.vocaHeader.length < 1) return;
        localStorage.setItem('savedItems', JSON.stringify(this.vocaHeader.concat(this.voca)));
      },
      copy: function (remoteVoca) {
        this.text = remoteVoca.voca
      }
    }
  }

</script>
