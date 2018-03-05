<template>
  <transition name="scale">
    <div v-show="isDialog" class="hint">
      <button class="hint_wrap">
        <span v-text="msg"></span>
      </button>
    </div>
  </transition>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {

    data () {
      return {

      }
    },

    computed: {
      ...mapGetters({
        isDialog: 'isDialog',
        msg: 'msg'
      })
    }

  }

</script>

<style rel="stylesheet/scss" scoped lang="scss">
  .hint{
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000000;
    position: fixed;
  }
  .hint_wrap{
    top: 50%;
    left: 50%;
    max-width: 350px;
    position: absolute;
    border-radius: 7px;
    padding: 15px 30px;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, .6);
    span{
      color: #fff;
      line-height: 1.3;
      font-size: 25px;
    }
  }
</style>