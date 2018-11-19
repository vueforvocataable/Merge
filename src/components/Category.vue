<template>
  <div>

    <b-nav justified tabs>
      <b-nav-item v-for="(category, i) in categories" :key="i" :active="selectedCategory === category" @click="selectedCategory=category"
        v-cloak>{{category}}</b-nav-item>
    </b-nav>

    <b-card-group columns>
      <b-card class="card text-center" v-for="(words, i) in remoteWords" :key="i">
        <pre>{{words.voca | snippet}}</pre>
        <b-button-group>
          <b-form method="get" target="_blank" :action="serverUrl + '/api/voca/template/' + words._id" >
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
        serverUrl: "http://localhost:5001",
        remoteWords: [],
        categories: ['TOEIC', 'TEPS', 'JPLT', 'ETC'],
        selectedCategory: "",
      }
    },
    created() {
      //Set default category to TOEIC
      this.getWordsFromGivenCategory('TOEIC')
    },
    mounted() {},
    watch: {
      selectedCategory: function (category) {
        this.getWordsFromGivenCategory(category)
      },
    },
    methods: {
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
