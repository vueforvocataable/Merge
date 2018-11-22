<template>
  <div>
    <b-card-group columns>
      <b-card class="card text-center" v-for="(words, index) in localStorage" :key="index" @click="copyText(words.myWords)">
        <pre>{{words.myWords | snippet}}</pre>
        <b-button-group>
          <b-form method="get" target="_blank" :action="serverUrl + '/api/voca/template/' + words.id">
            <!-- 쿼리 보내기위한 hidden input -->
            <input type="hidden" name="category" :value="words.category" />
            <input type="submit" value="전체보기" />
          </b-form>
        </b-button-group>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
  export default {
    name: "Explanation",
    props: {
      myWords: {
        type: Array,
        default: () => {
          []
        }
      },
    },
    watch: {},
    data() {
      return {
        serverUrl: "https://vocatestsserver.herokuapp.com",
        // serverUrl: "http://localhost:5001",
        localStorage: [],
      }
    },
    created() {
      this.getSavedDataOnLocalStorage()
    },
    destroyed() {
      this.saveDataOnLocalStorage()
    },
    computed: {},
    methods: {
      copyText: function (text) {
        this.$emit('copyText', text)
      },
      //로컬스토리지에 저장한 데이터를 가져옴
      getSavedDataOnLocalStorage: function () {
        const keys = this.getKeysOnLocalStorage()

        for (let i in keys.reverse()) { //최신날짜 순으로 
          let text = ""
          let words = ""
          let item = ""
          try {
            item = JSON.parse(localStorage.getItem(keys[i]))
          } catch (err) {
            console.log(err)
          }
          words = item.vocaHeader.concat(item.voca)

          words.forEach((word, index) => {
            text += `${word.english}, ${word.korean}\n`
          })

          this.localStorage.push({
            category: item.category,
            date: item.date,
            id: item.id,
            myWords: text
          })
        }
      },
      //로컬스토리지에 저장한다
      saveDataOnLocalStorage: function () {
        let words = this.myWords[0]
        if (words.vocaHeader.length + words.voca.length < 2) return

        localStorage.setItem(Date.now(), JSON.stringify(words))
        this.deleteOldDataOnLocalStorage()
      },
      //최신단어 limit 개만 남김
      deleteOldDataOnLocalStorage: function () {
        let limit = 9 //자신이 기록한 단어 9개만 보여주기

        let keys = this.getKeysOnLocalStorage()
        keys = keys.reverse().slice(limit) //limit부터 끝까지

        for (let i in keys) {
          localStorage.removeItem(keys[i])
        }
      },
      getKeysOnLocalStorage: function () {
        let keys = new Array()

        Array.apply(0, new Array(localStorage.length)).map(function (o, i) {
          if (/\d/.test(localStorage.key(i))) { //숫자일 경우만 
            keys.push(localStorage.key(i))
          }
        })

        return keys
      },
    }
  }

</script>
