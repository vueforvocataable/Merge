<template>
  <div id="app">

    <div>
      <b-navbar toggleable class="nav d-print-none">
        <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_dropdown_collapse">

          <b-navbar-nav class="mx-auto">
            <b-nav-item>
              <router-link to="/textfield" replace>입력</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/table" replace>단어시험지</router-link>
            </b-nav-item>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <body >
      <router-view></router-view>
    </body>

    <v-footer class="pa-3 d-print-none" light>
      <v-spacer></v-spacer>
      <v-layout wrap >
        &copy;2018 Team xxx - Made with ♥ for the people of the internet.
      </v-layout>
    </v-footer>

  </div>
</template>

<script>
  // import Explanation from './components/Explanation.vue'

  export default {
    name: 'App',
    components: {
      // Explanation
    },
    data: function () {
      return {}
    }
  };

</script>

<style lang="scss">
  @import url(./css/main.css);

</style>
