<template>
  <transition name="fade">
    <div class="loading" v-if="show">
      <!--people-->
      <div class="people">
        <img class="zpbg motianzhuan" src="./../assets/images/p_loadingzp.png">
        <!-- zhen -->
        <img class="ab zhenimg" src="./../assets/images/p_loadingzhen.png">
        <!-- deng1 -->
        <img class="ab dengimg light_act_a" src="./../assets/images/p_loadinglight01.png">
        <!-- deng2 -->
        <img class="ab dengimg light_act_b" src="./../assets/images/p_loadinglight02.png">
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">

  import imgList from '../assets/scripts/loadimg.js'

  export default {

    data () {
      return {
        show: true,
        progress: 0,
        temp: 0,
        showimg_num:0,
      }
    },

    mounted () {
      var _self = this
      let list = imgList.list
      let images = []
      let len = list.length;
      let count = 0;

      if (len > 0) {
        list.forEach((item) => {
          let imgUrl = require('../assets/images/' + item);
          let img = document.createElement('img');
          img.crossOrigin = "anonymous";
          img.src = imgUrl;
          images.push(img);
        })
      }

      let bgUrl = require('../assets/images/logo.png')
      let bgImg = document.createElement('img')
      bgImg.src = bgUrl

      bgImg.onload = () => {

        var timer = window.setInterval( ()=>{

          images.forEach(function(img, index){
            if(img.complete){
              count = count + 1
              images.splice(index, 1)
            }
          })

          _self.progress = parseInt(count * 100 / len)

          if (_self.temp < _self.progress - 1) {

            _self.temp += 5;
            // console.log(_self.showimg_num);
            if(_self.showimg_num<=3){
              _self.showimg_num++;
              if(_self.showimg_num>=4){
                _self.showimg_num=0;
              }
            }
    
          }

          if(_self.progress >= 100 && _self.temp >= _self.progress - 1){

            window.clearInterval(timer)

            window.setTimeout(function(){

              _self.show = false

              _self.$emit('showView', true)

            }, 500)

          }
        }, 150)//33
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .loading {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 97;
    width: 100%;
    position: fixed;
    background:#110324;
    background:url('./../assets/images/p_loading.jpg') no-repeat;
    background-size: cover;
  }
  .people{
    width: 540px;
    height: 540px;
    margin: 0 auto;
    text-align: center;
    top: 40%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }
  .people .zpbg{
    width: 540px;
    height: 540px;
  }
  .people .zhenimg{
    width: 147px;
    height: 244px;
    top:100px;
    left: 196px;
  }
  .dengimg{
    width: 530px;
    height: 530px;
    top:5px;
    left: 5px;
  }

  .motianzhuan{
    animation: rotate 10s linear infinite;
  }
  @keyframes rotate {
    0%{
      -webkit-transform: rotate(0deg);
      }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  .light_act_a{
    animation: animate_light_a .5s infinite linear;
  }
  @keyframes animate_light_a {
    0%{
      opacity: 0;
      }
    50% {
      opacity: 1;
    }
  }
  .light_act_b{
    animation: animate_light_b .5s infinite linear;
  }
  @keyframes animate_light_b {
    0%{
      opacity: 1;
      }
    50% {
      opacity: 0;
    }
  }


</style>
