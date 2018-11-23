<template>
  <div id="app">

    <div>
      <b-navbar toggleable class="nav d-print-none" id="main-navbar">
        <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_dropdown_collapse">
          <b-navbar-nav class="mx-auto">
            <b-navbar-brand class="mr-2">
              <img :src="logo" alt="Logo" style="filter: invert(26%) sepia(36%) saturate(2827%) hue-rotate(324deg) brightness(101%) contrast(93%); width:35px; height:35px;"></b-navbar-brand>
            <b-nav-item>
              <router-link to="/textfield" replace>입력</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/table" replace>단어시험지</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/help" replace>HELP!</router-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <body>
      <router-view></router-view>
    </body>

    <v-footer class="pa-5 d-print-none footer" light>
      <v-spacer></v-spacer>
      <v-layout wrap>
        <span id="footer-text"><span id="year">&copy;2018</span> TestPaper - Made with <span id="heart">♥</span> for
          the people of the internet.</span>
      </v-layout>
    </v-footer>

  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    data: function () {
      return {
        logo: require('./assets/logo.svg'),
      }
    }
  };

</script>

<style lang="scss">
  @import url(./css/main.css);

</style>
