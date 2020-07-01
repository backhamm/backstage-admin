<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'App',
    computed: mapGetters(['isMB']),
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.isMB && document.body.classList.add('mb')
      }
    }
  }
</script>
