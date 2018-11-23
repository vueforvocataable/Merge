<template>
  <div id="category-container">

    <b-nav justified id="category-nav" class="mb-1" pills>
      <b-nav-item v-for="(category, i) in categories" :key="i" :active="selectedCategory === category" @click="selectedCategory=category"
        v-cloak>{{category}}</b-nav-item>
    </b-nav>

    <b-card-group columns>
      <b-card class="card text-center" v-for="(words, i) in remoteWords" :key="i" @click="copyText(words.voca)">
        <pre>{{words.voca | snippet}}</pre>
        <b-button-group>
          <b-form method="get" target="_blank" :action="serverUrl + '/api/voca/template/' + words._id" >
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
  import axios from 'axios'

  export default {
    name: "Category",
    props: {},
    watch: {},
    data() {
      return {
        // serverUrl: "https://vocatestsserver.herokuapp.com",
        serverUrl: "http://localhost:5001",
        remoteWords: [],
        categories: ['TOEIC', 'TEPS', 'JPLT', 'ETC'],
        selectedCategory: "ETC",
      }
    },
    created() {
      //Set default category to TOEIC
      this.getWordsFromGivenCategory('ETC')
    },
    mounted() {},
    watch: {
      selectedCategory: function (category) {
        this.getWordsFromGivenCategory(category)
      },
    },
    methods: {
      copyText: function (text) {
        this.$emit('copyText', text)
      },
      //서버로 부터 텍스트 받음
      getWordsFromGivenCategory: function (category) {
        let query = "?category=" + category
        let router = "/api/voca" + query

        axios.get(this.serverUrl + router).then((res) => {
          let words = res.data.vocas

          if (words.length < 1) {
            this.remoteWords = new Array()
            return new Array()
          }

          this.remoteWords = words
        }).catch((err) => {
          console.log(err)
        })
      },
    },
  }

</script>
