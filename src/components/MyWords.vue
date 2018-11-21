<template>
  <div>
    <b-card-group columns class="mt-5">
      <b-card class="card text-center" v-for="(words, index) in localStorage.myWords" :key="index">
        <pre>{{words | snippet}}</pre>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
  export default {
    name: "Explanation",
    props: {
      text: "",
      vocaProp: {
        type: Array,
        default: () => []
      },
      vocaHeaderProp: {
        type: Array,
        default: () => []
      },
    },
    watch: {},
    data() {
      return {
        localStorage: {
          texts: [],
          myWords: []
        },
      }
    },
    created() {
      this.getSavedDataOnLocalStorage()
    },
    mounted() {},
    destroyed() {
      this.saveDataOnLocalStorage()
    },
    computed: {
      //clipborad에 저장
      copy: function (index) {
        this.text = localStorage.myWords[index]
      },
    },
    methods: {

      //로컬스토리지에 저장한 데이터를 가져옴
      getSavedDataOnLocalStorage: function () {
        const keys = this.getKeysOnLocalStorage()

        for (let i in keys.reverse()) { //최신날짜 순으로 
          let text = ""
          let words = ""

          try {
            words = JSON.parse(localStorage.getItem(keys[i]))
          } catch (err) {
            console.log(err)
          }

          words.forEach((word, index) => {
            text += `${word.english}, ${word.korean}\n`
          })
          this.localStorage.myWords.push(text)
        }
      },
      //로컬스토리지에 저장한다
      saveDataOnLocalStorage: function () {
        if (this.vocaHeaderProp.length + this.vocaProp.length < 2) return

        localStorage.setItem(Date.now(), JSON.stringify(this.vocaHeaderProp.concat(this.vocaProp)))
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
