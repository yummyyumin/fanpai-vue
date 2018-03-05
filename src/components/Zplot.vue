<template>
   <!-- 转盘 -->
  <div class="ab zp-con">
    <img id="zpan" src="./../assets/images/p_zpbg.png">
    <!-- deng2 an -->
    <img class="ab dengimg" src="./../assets/images/p_light02.png">
    <div class="ab zhuanlight" v-bind:style="{ top: lightpArr[nowlightIndex].top + 'px' ,left: lightpArr[nowlightIndex].left+ 'px' }">
      <img src="./../assets/images/p_zhuanlight.png">
    </div>
    <div class="ab zhuanlight" v-bind:style="{ top: lightpArr[nowlightIndexa].top + 'px' ,left: lightpArr[nowlightIndexa].left+ 'px' }">
      <img src="./../assets/images/p_zhuanlight.png">
    </div>
    <div class="ab zhuanlight" v-bind:style="{ top: lightpArr[nowlightIndexb].top + 'px' ,left: lightpArr[nowlightIndexb].left+ 'px' }">
      <img src="./../assets/images/p_zhuanlight.png">
    </div>
    <div class="ab zhen" @click="startLot">
      <img v-if="ischangecimg" class="zhenimg" src="./../assets/images/p_zpzhenclick.png">
      <img v-else class="zhenimg" src="./../assets/images/p_zpzhen.png">
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'zplot',
  components:{
 
  },
  data () {
    return {
      prizedes_arr:[
        {pname:'手机',degnum:24},
        {pname:'VR',degnum:68},//VR眼镜 VR一体机
        {pname:'谢谢参与',degnum:113},
        {pname:'电影周边',degnum:157},
        {pname:'耳机',degnum:200},
        {pname:'优惠券',degnum:250},
        {pname:'谢谢参与',degnum:296},
        {pname:'电影周边',degnum:340},
      ],
      isloting:false,
      ischangecimg:false,
      nowlightIndex:0,
      nowlightIndexa:1,
      nowlightIndexb:2,
      lightpArr:[
        {'top':-6,'left':294,},
        {'top':0,'left':354,},
        {'top':16,'left':410,},
        {'top':44,'left':460,},
        {'top':80,'left':508,},
        {'top':126,'left':542,},
        {'top':178,'left':570,},
        {'top':234,'left':590,},
        {'top':290,'left':594,},
        {'top':350,'left':590,},
        {'top':407,'left':572,},
        {'top':460,'left':544,},
        {'top':506,'left':510,},
        {'top':540,'left':464,},
        {'top':570,'left':412,},
        {'top':590,'left':356,},
        {'top':596,'left':296,},//
        {'top':590,'left':236,},
        {'top':570,'left':180,},
        {'top':544,'left':130,},
        {'top':506,'left':84,},
        {'top':460,'left':48,},
        {'top':410,'left':18,},
        {'top':353,'left':4,},
        {'top':296,'left':-4,},
        {'top':236,'left':4,},
        {'top':180,'left':19,},
        {'top':128,'left':49,},
        {'top':84,'left':84,},
        {'top':44,'left':129,},
        {'top':18,'left':178,},
        {'top':0,'left':236,},
      ],
    }
  },
  methods: {
    resetDeg(){
      var zhuanpan=document.getElementById('zpan');
      zhuanpan.style.transition='all 0s 0s';
      zhuanpan.style.transform="rotate(0deg)";
    },
    zprotate(idname,z_deg,cb){
      z_deg=360*5+z_deg;
      var zhuanpan=document.getElementById(idname);
      zhuanpan.style.transition='all 4s 0s';
      zhuanpan.style.transform="rotate("+z_deg+"deg"+")";
      setTimeout(() => {
        this.isloting=false;
        this.ischangecimg=false;
        cb();
      }, 4000);
    },
    startLot(){
      var _self=this;
      if(this.actInfo.total_lot_pan<=0) return this.$store.dispatch('whickToast',{isShowToast:true,type:0});
      this.resetDeg();
      if(this.isloting) return this.setDialog({time: 2000, msg: '正在抽奖呢！'});
      this.isloting=true;

      this.$store.dispatch('goLotpan').then(()=>{
        if(this.actInfo.is_nowprize){
          this.prizedes_arr.forEach(element => {
            if(this.actInfo.nowprize_name.indexOf(element.pname) != -1){
              this.zprotate('zpan',element.degnum,function(){_self.$store.dispatch('whickToast',{isShowToast:true,type:2})});
            }
          });
        }else{
          this.zprotate('zpan',296,function(){_self.$store.dispatch('whickToast',{isShowToast:true,type:1})});
        }
      });

    },
    ...mapActions({
      setDialog: 'setDialog',
      setMum: 'setMum'
    })
  },
  computed: {
    ...mapGetters({
      actInfo: 'actInfo',
      isShowToast:"isShowToast",
    }),
  },
  mounted: function () {

    //跑马灯
    setInterval(()=>{
      if(this.nowlightIndex>30) return this.nowlightIndex=0;
      if(this.nowlightIndexa>30) return this.nowlightIndexa=0;
      if(this.nowlightIndexb>30) return this.nowlightIndexb=0;
      this.nowlightIndex++;
      this.nowlightIndexa++;
      this.nowlightIndexb++;
    },50)
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped lang="scss">
.zp-con{
  width: 638px;
  height: 638px;
  top:730px;
  left: 56px;
  .dengimg{
    width: 630px;
    height: 630px;
    top:2px;
    left: 4px;
  }
  .zhuanlight{
    width: 44px;
    height: 44px;
  }
  .zhen{
    width: 174px;
    height: 289px;
    top:120px;
    left: 232px;
    .zword{
      width: 174px;
      height: 50px;
      top:238px;
      left: 0px;
      text-align: center;
      font-size: 16px;
      color: white;
    }
  }
}
</style>
