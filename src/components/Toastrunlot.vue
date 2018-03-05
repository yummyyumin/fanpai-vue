<template>
  <div class="toast toastrunlot" v-if="isShowToast">
    <!--没有抽奖机会-->
    <div class="wordp nochance ab" v-if="toastType==0">
      <div class="ab des"><p>啊哦~您还没有抽奖机会~</p></div>
      <div class="ab closebtn" @click='closeLottc'></div>
    </div>
    <!--抽－未中奖word-->
    <div class="wordp nolot ab" v-if="toastType==1">
      <div class="ab des"><p>没有中奖哦~</p></div>
      <!-- closebtn -->
      <div class="ab closebtn" @click='closeLottc'></div>
    </div>
    <!--抽－中奖(虚拟奖，实体奖)-->
    <div class="wordp haslot ab" v-if="toastType==2">
      <!-- 实体奖 -->
      <div v-if="actInfo.nowprize_name.indexOf('券') == -1" class="ab shiti-p">
        <img v-if="actInfo.nowprize_name.indexOf('手机') != -1"  class="prizeimg" src="//activity-codoon.b0.upaiyun.com/playover/upload/p_icon_phone.png">
        <img v-if="actInfo.nowprize_name.indexOf('VR') != -1" class="prizeimg" src="//activity-codoon.b0.upaiyun.com/playover/upload/p_icon_vr.png">
        <img v-if="actInfo.nowprize_name.indexOf('耳机') != -1" class="prizeimg" src="//activity-codoon.b0.upaiyun.com/playover/upload/p_icon_erji.png">
        <img v-if="actInfo.nowprize_name.indexOf('电影周边') != -1" class="prizeimg" src="//activity-codoon.b0.upaiyun.com/playover/upload/p_icon_movie.png">
        <img v-if="actInfo.nowprize_name.indexOf('运动装备') != -1" class="prizeimg" src="//activity-codoon.b0.upaiyun.com/playover/upload/p_icon_sport.png">
        <p class="tit">{{actInfo.nowprize_name}}</p>
        <img class="addressbtn" @click='goAddress' src="./../assets/images/p_lotaddress.png">
      </div>
      <!-- 虚拟奖 -->
      <div v-else class="ab vir-p">
        <img class="prizeimg" src="//activity-codoon.b0.upaiyun.com/playover/upload/p_icon_quan.png">
        <P class="tit">{{actInfo.nowprize_name}}</P>
        <p class="tip">*可在“我的”—“钱包”中查看详情。</p>
      </div>
      <!-- closebtn -->
      <div class="ab closebtn" @click='closeLottc'></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'toastrunlot',
  components:{

  },
  methods: {
    closeLottc(){
      this.$store.dispatch('whickToast',{isShowToast:false,type:0});
    },
    goAddress(){
      location.href="";
    },
    ...mapActions({
      setDialog: 'setDialog',
      setMum: 'setMum'
    })
  },
  data () {
    return {
      prizeArr:[
        {name:'手机',url:'//activity-codoon.b0.upaiyun.com/playover/upload/p_icon_phone.png'},
        {name:'电影周边',url:'//activity-codoon.b0.upaiyun.com/playover/upload/p_icon_movie.png'},
        {name:'优惠券',url:'//activity-codoon.b0.upaiyun.com/playover/upload/p_icon_quan.png'},
        {name:'耳机',url:'//activity-codoon.b0.upaiyun.com/playover/upload/p_icon_erji.png'},
        {name:'VR眼镜',url:'//activity-codoon.b0.upaiyun.com/playover/upload/p_icon_vr.png'},
        {name:'运动装备',url:'//activity-codoon.b0.upaiyun.com/playover/upload/p_icon_sport.png'},
      ],
    }
  },
  computed: {
    ...mapGetters({
      actInfo: 'actInfo',
      isShowToast:'isShowToast',
      toastType:'toastType',
    }),
  },
  mounted: function () {
   

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped lang="scss">
  .wordp{
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }
  .nochance{
    width: 459px;
    height: 675px;
    background: url('./../assets/images/p_toastbg02.png') no-repeat;
    background-size:459px 675px;
    .des{
      width: 100%;
      top:350px;
      left: 0px;
      font-size: 33px;
      color:#ffffff;
      text-align: center;
    }
    .closebtn{
      top:0px;
      right: 10px;
    }

  }
  .nolot{
    width: 459px;
    height: 675px;
    background: url('./../assets/images/p_toastbg02.png') no-repeat;
    background-size:459px 675px;
    .des{
      width: 100%;
      top:360px;
      left: 0px;
      font-size: 36px;
      color:#ffffff;
      text-align: center;
    }
    .closebtn{
      top:0px;
      right: 10px;
    }
  }
  .haslot{
    width: 581px;
    height: 771px;
    background: url('./../assets/images/p_toastbg01.png') no-repeat;
    background-size:581px 771px;
    .shiti-p{
      width: 440px;
      margin-left: 88px;
      margin-top: 300px;
      text-align: center;
      color: #ffffff;
      .prizeimg{

      }
      .tit{
        font-size: 32px;
        color:white;
        margin-top: 10px;
        margin-bottom: 20px; 
      }
      .addressbtn{
        width:218px;
        height:48px;
      }
    }
    .vir-p{
      width: 440px;
      margin-left: 88px;
      margin-top: 280px;
      text-align: center;
      color: #ffffff;
      .prizeimg{

      }
      .tit{
        font-size: 32px;
        margin-top: 30px;
        margin-bottom: 30px;        
      }
      .tip{
        font-size: 20px; 
      }
    }
    .closebtn{
      top:30px;
      right: 60px;
    }
  }
 

</style>
