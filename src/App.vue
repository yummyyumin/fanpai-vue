<template>
  <div id="container">
    <Loading @showView="view"></Loading>
    <Mum></Mum>
    <Hint></Hint>
    <transition name="scale">
      <router-view v-if="isView"></router-view>
    </transition>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex'

  import Loading from './components/Loading.vue'
  import Mum  from './components/Mum.vue'
  import Hint from './components/Hint.vue'

  export default {

    data () {
      return  {
        isView: false,            //  load 结束显示 router-view
      }
    },

    components: {
      Loading,
      Mum,
      Hint,
    },

    methods: {

      /**
       * @name router-view
       * @param Boolean
       * */
      view (flag) {
        this.isView = flag
      },
      ...mapActions({
        setDialog: 'setDialog',
        setMum: 'setMum'
      })

    },

    computed: {
      ...mapGetters({
        actInfo: 'actInfo'
      })
    },

    mounted () {
      // this.$store.dispatch('getUserInfo');
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import './assets/styles/reset.scss';
</style>
