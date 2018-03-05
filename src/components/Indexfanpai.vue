<template>
  <div class="page indexPage">
    <img class="bgimg" src="./../assets/images/p_indexbg01.jpg">
    <img class="bgimg"  src="./../assets/images/p_indexbg02.jpg">
    <img class="bgimg"  src="./../assets/images/p_indexbg03.jpg">
    <!-- 话题 -->
    <img class="ab huatibtn" @click="huaTi" src="./../assets/images/p_indexhtbtn.png">
    <!-- 我的榜单 -->
    <img class="ab bdbtn" @click="toPage('ucenter')" src="./../assets/images/p_indexmybtn.png">
    <!-- 赛事展示 -->
    <div class="ab race-ul">
      <div class="race-li re" v-for="item in actInfo.online_race" :key="item.index" @click="goRace(item.rid)">
        <img class="ab mediaimg" :src="item.mediaurl">
        <p class="ab racename" >{{item.name}}</p>
        <div class="ab racebtns">
          <img v-if="item.isbaoming" src="./../assets/images/p_racebmbtn.png">
          <img v-else src="./../assets/images/p_racenobm.png">
        </div>
      </div>           
    </div>
    <!-- 分享按钮 -->
    <img class="ab sharebtn" @click="toShare" src="./../assets/images/p_sharebtn.png">
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
        <p class="ab zword">可抽{{actInfo.total_lot_pan}}/10次</p>
      </div>
    </div>
    <!-- 福卡文字 -->
    <div class="ab fkword">
      <p class="desword">·你还可抽取{{actInfo.total_lot_card}}张福卡</p>
      <div class="heart-con">
        <div class="heart-li" v-for="item in 10" :key="item.index">
          <img v-if="actInfo.total_lot_card < item" src="./../assets/images/p_hreart_an.png">
          <img v-else src="./../assets/images/p_hreart_light.png">
        </div>
      </div>
    </div>
    <!-- 牌 -->
    <div class="ab pais-con">

      <div class="ab card-li" v-for="(item,index) in cardArr" :key="item.index" :id="index" v-bind:style="{ top: item.top + 'px' ,left: item.left+ 'px' }">
        <div class="fc_wrapper" @click="lotCard(index)">
          <div class="fc_inner" v-bind:class="{ 'fztogether': item.iszhuan}">
            <div class="fc_front"><img :src="item.frontimg"></div>
            <div class="fc_back"><img src="./../assets/images/p_cardbg.png"></div>
          </div>
        </div>
      </div>

    </div>
    <!-- 牌 按钮 -->
    <img class="ab paibtn" @click="xiPai" src="./../assets/images/p_cardbtn.png">
    <!-- 规则 按钮 -->
    <img class="ab rulebtn" @click="ruleShow(true)" src="./../assets/images/p_rulebtn.png">
    <!-- 我的奖牌 按钮 -->
    <img class="ab prizebtn" @click="toPage('bigprize')" src="./../assets/images/p_mypbtn.png">

    <!-- 规则弹窗 -->
    <Toastrule v-if='isShowRule' @showRule='ruleShow'></Toastrule>
    <!-- 中奖弹窗 -->
    <Toastrunlot v-if="isShowToast"></Toastrunlot>
    
    <!-- 更多活动按钮 -->
    <Morebtn v-if="isApp"></Morebtn>

  </div>
</template>

<script>
import codoonBrige from 'codoon-native-bridge-js';
import Morebtn from './Morebtn';
import Toastrule from './Toastrule';
import Toastrunlot from './Toastrunlot';
import buttonShare from './../assets/scripts/buttonshare'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'index',
  components:{
    Toastrule,//规则
    Toastrunlot,//中奖弹窗
    Morebtn,//更多活动按钮
  },
  data () {
    return {
      isShowRule:false,
      isApp:navigator.userAgent.toLowerCase().indexOf('codoon') > -1,
      isxipai:false,
      iscanclick:false,
      cardArr:[
        {
          frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_card01.png',
          top:0,
          left:0,
          iszhuan:false,
          pname:'手机',
        },
        {
          frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_card03.png',
          top:0,
          left:193,
          iszhuan:false,
          pname:'耳机',
        },
        {
          frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_card04.png',
          top:0,
          left:386,
          iszhuan:false,
          pname:'优惠券',
        },  
        {
          frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_card02.png',
          top:259,
          left:0,
          iszhuan:false,
          pname:'VR一体机',
        }, 
        {
          frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_card06.png',
          top:259,
          left:193,
          iszhuan:false,
          pname:'运动装备',
        }, 
        {
          frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_cardno.png',
          top:259,
          left:386,
          iszhuan:false,
          pname:'没有中奖',
        },                             
      ],
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
    toPage(pname){
      this.$router.push(pname);
    },
    ruleShow(bool){
      this.isShowRule=bool;
    },
    huaTi(){
      if(!this.isApp) return this.downApp();
      _hmt.push(['_trackEvent', '玩赛到底', 'click', '话题按钮点击']);
      //正式：46358， 测试：948
      location.href="codoon://www.codoon.com/feed/feedlabel?label_id=46358"
    },
    goRace(sid){
      _hmt.push(['_trackEvent', '玩赛到底', 'click', '去赛事'+sid+'按钮点击']);
      var _self=this;
      var bri=new codoonBrige();
      bri.jumpNative({
        type: 'webView',
        value: 'https://race.codoon.com/race/'+sid+'#!/online_race',
      }, function() {
        _self.$store.dispatch('getUserInfo');
      });
    },
    toShare(){
      if(!this.isApp) return this.downApp();
      var _self=this;
      _hmt.push(['_trackEvent', '玩赛到底', 'click', '分享按钮点击']);
      // buttonShare(0);
      var bridge=new codoonBrige();
      var options = {
        shareImgUrl : "http://activity-codoon.b0.upaiyun.com/playover/upload/share.jpg",
        shareLineLink : "https://www.codoon.com/activity/v1/play-over/index.html",
        shareDescContent :'手机、VR眼镜、运动装备、赛事红包等你来拿',
        shareCodoonLineLink :"https://www.codoon.com/activity/v1/play-over/index.html",
        shareTitle : '2018玩赛到底，赛事好礼周周送！戳我抽奖>>'
      };
      bridge.nativeCustomerShare({
        sCodoonShareImgUrl : options.shareImgUrl,
        sCodoonShareLineLink : options.shareLineLink,
        sCodoonShareDescContent : options.shareDescContent,
        sCodoonShareCodoonLineLink : options.shareCodoonLineLink,
        sCodoonShareTitle : options.shareTitle,
        oCodoonShareDestination : {
          'codoonTimeline' : true,
          'codoonGroup' : false,
          'weixinToFriend' : true,
          'weixinToTimeline' : true,
          'sinaWeibo' : true,
          'tencentQQ' : false,
          'tencentQzone' : false
        }
      });
      bridge.nativeShareClickCallback(function (err, response) {
        // alert("测试，上线会删掉。err:"+err + ",response"+ JSON.stringify(response))
        if (err) return alert(err);
        _self.$store.dispatch('goShare');
      })
    },
    downApp(){
      location.href="https://static.codoon.com/html/cpm_download_codoon_app.html?id=https://www.codoon.com/activity/v1/play-over/index.html&codoon=activity";
    },
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
      if(!this.isApp) return this.downApp();

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
    rd(n,m){
      var c = m-n+1;
      return Math.floor(Math.random() * c + n);
    },
    deepClone(source){
      if(!source || typeof source !== 'object'){
        throw new Error('error arguments', 'shallowClone');
      }
      var targetObj = source.constructor === Array ? [] : {};
      for(var keys in source){
          if(source.hasOwnProperty(keys)){
            if(source[keys] && typeof source[keys] === 'object'){
              targetObj[keys] = source[keys].constructor === Array ? [] : {};
              targetObj[keys] = deepClone(source[keys]);
            }else{
              targetObj[keys] = source[keys];
            }
          } 
      }
      return targetObj;
    },
    oldxiPai(){
      if(!this.isApp) return this.downApp();
      
      var _self=this;
      if(this.actInfo.total_lot_card<=0) return this.$store.dispatch('whickToast',{isShowToast:true,type:0});
      
      // this.cardArr.forEach((ele,index)=>{
      //   ele.iszhuan=true;
      // })

      this.cardArr=[
        {
          frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_card01.png',
          top:0,
          left:0,
          iszhuan:true,
          pname:'手机',
        },
        {
          frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_card03.png',
          top:0,
          left:193,
          iszhuan:true,
          pname:'耳机',
        },
        {
          frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_card04.png',
          top:0,
          left:386,
          iszhuan:true,
          pname:'优惠券',
        },  
        {
          frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_card02.png',
          top:259,
          left:0,
          iszhuan:true,
          pname:'VR一体机',
        }, 
        {
          frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_card06.png',
          top:259,
          left:193,
          iszhuan:true,
          pname:'运动装备',
        }, 
        {
          frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_cardno.png',
          top:259,
          left:386,
          iszhuan:true,
          pname:'没有中奖',
        },                             
      ];

      setTimeout(()=>{
        // this.isxipai=true;
        this.cardArr.forEach((ele,index)=>{
          document.getElementById(index).style.top="259px";
          document.getElementById(index).style.left="193px";
        })
      },1000)

      setTimeout(()=>{
        this.cardArr.forEach((ele,index)=>{
          document.getElementById(index).style.top=ele.top+'px';
          document.getElementById(index).style.left=ele.left+'px';
        })
        // this.isxipai=false;
        this.iscanclick=true;
      },2600)
    },
    xiPai(){
      // if(!this.isApp) return this.downApp();
      
      var _self=this;
      if(this.actInfo.total_lot_card<=0) return this.$store.dispatch('whickToast',{isShowToast:true,type:0});

      this.cardArr=[
        {
          frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_card01.png',
          top:0,
          left:0,
          iszhuan:true,
          pname:'手机',
        },
        {
          frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_card03.png',
          top:0,
          left:193,
          iszhuan:true,
          pname:'耳机',
        },
        {
          frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_card04.png',
          top:0,
          left:386,
          iszhuan:true,
          pname:'优惠券',
        },  
        {
          frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_card02.png',
          top:259,
          left:0,
          iszhuan:true,
          pname:'VR一体机',
        }, 
        {
          frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_card06.png',
          top:259,
          left:193,
          iszhuan:true,
          pname:'运动装备',
        }, 
        {
          frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_cardno.png',
          top:259,
          left:386,
          iszhuan:true,
          pname:'没有中奖',
        },                             
      ];

      setTimeout(()=>{
        this.cardArr.forEach((ele,index)=>{
          document.getElementById(index).style.top=this.rd(10,250)+"px";
          document.getElementById(index).style.left=this.rd(10,360)+"px";
        })
      },500);


      setTimeout(()=>{
        this.cardArr.forEach((ele,index)=>{
          document.getElementById(index).style.top=this.rd(10,250)+"px";
          document.getElementById(index).style.left=this.rd(10,360)+"px";
        })
      },600);

      setTimeout(()=>{
        this.cardArr.forEach((ele,index)=>{
          document.getElementById(index).style.top=this.rd(10,250)+"px";
          document.getElementById(index).style.left=this.rd(10,360)+"px";
        })
      },700);

      setTimeout(()=>{
        this.cardArr.forEach((ele,index)=>{
          document.getElementById(index).style.top=this.rd(10,250)+"px";
          document.getElementById(index).style.left=this.rd(10,360)+"px";
        })
      },800);
        

      setTimeout(()=>{
        document.getElementById(5).style.top=this.cardArr[2].top+'px';
        document.getElementById(5).style.left=this.cardArr[2].left+'px';

        document.getElementById(0).style.top=this.cardArr[5].top+'px';
        document.getElementById(0).style.left=this.cardArr[5].left+'px';

        document.getElementById(1).style.top=this.cardArr[4].top+'px';
        document.getElementById(1).style.left=this.cardArr[4].left+'px';

        document.getElementById(4).style.top=this.cardArr[0].top+'px';
        document.getElementById(4).style.left=this.cardArr[0].left+'px';

        document.getElementById(2).style.top=this.cardArr[3].top+'px';
        document.getElementById(2).style.left=this.cardArr[3].left+'px';

        document.getElementById(3).style.top=this.cardArr[1].top+'px';
        document.getElementById(3).style.left=this.cardArr[1].left+'px';
 
        this.iscanclick=true;
      },900)

    },
    lotCard(numindex){
      var _self=this;
      if(!this.iscanclick) return;
      //抽奖操作
      this.iscanclick=false;
      this.$store.dispatch('goLotcard').then(()=>{

        if(this.actInfo.nowprize_name.indexOf('电影周边') == -1){
          // 随机打乱数组，换背面图片 start
          var cardImgArr=[
            {
              frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_card01.png',
              top:0,
              left:0,
              iszhuan:false,
              pname:'手机',
            },
            {
              frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_card03.png',
              top:0,
              left:193,
              iszhuan:false,
              pname:'耳机',
            },
            {
              frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_card04.png',
              top:0,
              left:386,
              iszhuan:false,
              pname:'优惠券',
            },  
            {
              frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_card02.png',
              top:259,
              left:0,
              iszhuan:false,
              pname:'VR一体机',
            }, 
            {
              frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_card06.png',
              top:259,
              left:193,
              iszhuan:false,
              pname:'运动装备',
            }, 
            {
              frontimg:'//activity-codoon.b0.upaiyun.com/playover/upload/p_cardno.png',
              top:259,
              left:386,
              iszhuan:false,
              pname:'没有中奖',
            },                             
          ];
          var zhenArr=[0,1,2,3,4,5];
          zhenArr.splice(numindex,1);
          var fuzhiArr=this.deepClone(zhenArr);//去掉点击的那张
          
          var pnameIndex=0;
          this.cardArr.forEach((element,index) => {
            if(this.actInfo.nowprize_name==''){
              return pnameIndex=5;
            }
            if(this.actInfo.nowprize_name.indexOf(element.pname) != -1){
              this.cardArr[numindex].frontimg=element.frontimg;
              pnameIndex=index;
            }
          });
          
          console.log('pnameIndex'+pnameIndex);
          var zhenBArr=[0,1,2,3,4,5];
          zhenBArr.splice(pnameIndex,1);
          var xuanArr=this.deepClone(zhenBArr);//cardArr 可以随意打乱的 eg:没有中奖[0,1,2,3,4]
          console.log('xuanArr:::'+xuanArr);
          fuzhiArr.forEach(function(item){
            //随机从xuanArr取一个 
            var rdnum=_self.rd(0,xuanArr.length-1);
            var nnn=xuanArr[rdnum];
            // console.log("随机数"+rdnum);
            console.log("nnn"+nnn);
            console.log(_self.cardArr[nnn].frontimg);

            _self.cardArr[item].frontimg=cardImgArr[nnn].frontimg;
            _self.cardArr[item].pname=cardImgArr[nnn].pname;

            xuanArr.splice(rdnum,1);
          })
          // 随机打乱数组，换背面图片 end

        }

        //中奖
        if(this.actInfo.is_nowprize){
          this.cardArr[numindex].iszhuan=false;

          if(this.actInfo.nowprize_name.indexOf('电影周边') == -1){
            cardImgArr.forEach(element => {
              if(this.actInfo.nowprize_name.indexOf(element.pname) != -1){
                this.cardArr[numindex].frontimg=element.frontimg;
              }
            });
          }else{
            //牌面上没有的奖品
            this.cardArr[numindex].frontimg="//activity-codoon.b0.upaiyun.com/playover/upload/p_card05.png";//电影周边
          }

          setTimeout(()=>{
            this.cardArr.forEach((ele,index)=>{
              ele.iszhuan=false;
            })
          },1000)

          setTimeout(()=>{
            this.$store.dispatch('whickToast',{isShowToast:true,type:2});
          },2000)

        }
        //没有中奖
        else{
          this.cardArr[numindex].iszhuan=false;
          this.cardArr[numindex].frontimg=cardImgArr[5].frontimg;
          setTimeout(()=>{
            this.cardArr.forEach((ele,index)=>{
              ele.iszhuan=false;
            })
          },1000)

          setTimeout(()=>{
            this.$store.dispatch('whickToast',{isShowToast:true,type:1});
          },2000)
          
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
    //牌面上没有但是会中到的奖品
    //电影周边 http://activity-codoon.b0.upaiyun.com/playover/upload/p_card05.png

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
.huatibtn{
  width: 170px;
  height: 48px;
  top:50px;
  left: 40px;
}
.bdbtn{
  width: 130px;
  height: 129px;
  top:40px;
  right:30px;
}
.race-ul{
  width: 660px;
  height: 376px;
  display: flex;
  display: -webkit-flex;
  flex-wrap:wrap;
  -webkit-flex-wrap: wrap;
  justify-content:space-between;
  -webkit-justify-content: space-between;
  top:670px;
  left: 50px;
  .race-li{
    width: 321px;
    height: 168px;
    background: url('./../assets/images/p_racelibg.png') no-repeat;
    background-size: 321px 168px;
    .mediaimg{
      // width: 100px;
      // height: 100px;
      // top:30px;
      // left: 30px;
      width: 120px;
      height: 120px;
      top: 33px;
      left: 15px;
    }
    .racename{
      width: 150px;
      height: 53px;
      // background: red;
      font-size: 22px;
      color: white;
      line-height: 26px;
      top:34px;
      left:160px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .racebtns{
      width: 156px;
      height: 48px;
      overflow: hidden;
      top:100px;
      left: 154px;
      img{
        width: 156px;
        height: 48px;
      }
    }
  }
}
.sharebtn{
  width: 98px;
  height: 98px;
  top:1160px;
  right: 40px;
  z-index: 20;
}
.zp-con{
  width: 638px;
  height: 638px;
  top:1190px;
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
.fkword{
  width: 550px;
  height: 40px;
  display: flex;
  display: -webkit-flex;
  top:2140px;
  left: 110px;
  .desword{
    width: 270px;
    height: 40px;
    font-size:24px;
    color: #fff36e;
    line-height: 40px;
  }
  .heart-con{
    width: 280px;
    height: 40px;
    .heart-li{
      width: 20px;
      height: 17px;
      overflow: hidden;
      float: left;
      margin-left: 6px;
      margin-top: 12px;
      img{
        width: 20px;
        height: 17px;
      }

    }
  }
  

}
.pais-con{
  width: 559px;
  height: 498px;
  top:2220px;
  left: 104px;
  .card-li{
    width: 173px;
    height: 239px;
    overflow: hidden;
    transition:all 0.1s;
    .fc_wrapper{
      width: 173px;
      height: 239px;
      perspective:1000px;
    }

    // .fc_lot{
    //   transform: rotateY(0deg) translateZ(0);
    // }
    .fztogether{
      transform: rotateY(-180deg) translateZ(0);
    }
    
    .fc_inner{
      position:relative;
      width:100%;
      height:100%;
      transform-style: preserve-3d;
      backface-visibility: hidden;
      transform-origin: center center;
      transition:transform 0.5s;
    }
    .fc_front{
      position:absolute;
      z-index: 4;
      left:0;
      top:0;
      width:100%;
      height:100%;
      backface-visibility: hidden;
      // opacity: 0;
    }
    .fc_back{
      position:absolute;
      z-index: 2;
      left:0;
      top:0;
      width:100%;
      height:100%;
      transform-origin: center center;
      transform: rotateY(180deg);
      backface-visibility: hidden;
    }
    .fc_front img,.fc_back img{
      width:100%;
      height:100%;
    }
  }

}
.paibtn{
  width: 338px;
  height:65px;
  top: 2775px;
  left: 206px;
}
.rulebtn{
  width: 175px;
  height:50px;
  top:2890px;
  left: 180px;
}
.prizebtn{
  width: 175px;
  height:50px;
  top:2890px;
  left: 417px;

}

//动画
.light_act_a{
    animation: animate_light_a .2s infinite linear;
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

</style>
