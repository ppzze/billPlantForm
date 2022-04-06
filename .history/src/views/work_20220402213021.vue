<template>
  <div class="work">
    <div class="WorkTitle2">
      <div class="WorkTitleImg2">
        <img src="./img/logo.png" alt="" />
      </div>
      <div class="WorkTitleName2">
        充&nbsp;电&nbsp;站&nbsp;1&nbsp;号&nbsp;流&nbsp;水&nbsp;线&nbsp;1&nbsp;号&nbsp;工&nbsp;位
      </div>
      <div class="WorkTitleKuohao">( 生&nbsp;产&nbsp;中 )</div>
      <div class="WorkTitleRight">
        <div class="WorkTitleRightOne">
          <img src="./img/user.png" alt="" />
          <div class="WorkTitleRightOneWord">林&nbsp;一&nbsp;凡</div>
        </div>
        <div class="WorkTitleRightTwo" @click="exit">
          <img src="./img/exit.png" alt="" />
          <div class="WorkTitleRightTwoWord">退&nbsp;出</div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="zhang" @click="showZhang" v-show="zhanshi" id="menu" ref="Menu">障</div>
      <div class="showzhang" v-if="xianshi" id="model" ref="Model">
        <ul>
          <li :key="guzhang" v-for="guzhang in this.GongXuError">
            <img style="width: 22px; height: 22px" src="./img/红点.png" />
            {{ guzhang}}
          </li>
        </ul>
      </div>
      <div class="video" style="position:relative;">
        <div class="AllWarning"  v-show="warning">
          <img src="./img/Slice 1.png" alt="" />
          <span >{{this.gongxuerror}}出现故障，请检查 </span>
        </div>
        <div>
          <video-player class="video-player vjs-custom-skin" 
          ref="videoPlayer" :playsline="false" 
          :options="playerOptions"></video-player>
        </div>
        
      </div>
      <div class="process">

        <!-- 下面是循环生成li -->
        <ul :key="item.pcdId" v-for="item in procedureList">
          <div>
            <!-- 这上面的div中有:class="item.pcdSt == true ? 'success' : 'undo'" -->
            <img
              style="width: 22px; height: 22px"
              :src="
                item.pcdSt == false
                  ? require('./icon/grey-circle.png')
                  : require('./icon/blue-circle.png')
              "
            />
            {{ item.prdDesc }}
          </div>
          <li
            :key="video.opId"
            v-for="video in item.operateList"
            :class="nextOpId.indexOf(video.opId) == -1 ? 'undo' : 'next'"
          >
            <img
              style="width: 22px; height: 22px"
              :src="
                video.opRs == false
                  ? require('./icon/grey-circle.png')
                  : require('./icon/right.png')
              "
            />
            {{ video.opDesc }}
          </li>
        </ul>

        <!-- 循环生成li结束 -->
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      ok: true,
      state: 1,
      warning: true,
      zhanshi: true,
      xianshi: false,
      videoUrl :'',
      nextVideoIndex:[],
      stationId: "",
      GongXuError: [],
      gongxuerror:'',
      nextOperateSet: [],
      nextOpId: [],
      procedureList: [],
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], 
        autoplay: false, 
        muted: false, 
        loop: false, 
        preload: 'auto', 
        language: 'zh-CN',
        aspectRatio: '16:9',
        fluid: true, 
        sources: [{
          type: 'video/mp4', 
          src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
        }],
        notSupportedMessage: '此视频暂无法播放，请稍后再试', 
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      },
     


      // :src="imagepath"
      //poster: "http://39.106.117.192:8080/static/indexImg.png", //你的封面地址（覆盖在视频上面的图片）
      // imagepath:require('./icon/blue-circle.png'),
      // 新的paper格式如下：
      // { fileUrl
      //   procedureIdstep
      //   procedureIdprogress
      //
      // },

      paper: [],
      label: [],
    
      guZhang: [
        {
          key: "zhang1",
          word: "电动螺丝刀1",
        },
        {
          key: "zhang2",
          word: "电动螺丝刀2",
        },
        {
          key: "zhang3",
          word: "电动螺丝刀3",
        },
        {
          key: "zhang4",
          word: "电动螺丝刀4",
        },
        {
          key: "zhang5",
          word: "电动螺丝刀5",
        },
        {
          key: "zhang6",
          word: "电动螺丝刀6",
        },
        {
          key: "zhang7",
          word: "电动螺丝刀7",
        },
        {
          key: "zhang8",
          word: "电动螺丝刀8",
        },
        {
          key: "zhang9",
          word: "电动螺丝刀9",
        },
        {
          key: "zhang10",
          word: "电动螺丝刀1",
        },
      ],
    };
  },
  methods: {
    exit(){
      localStorage.removeItem('staffId')
      localStorage.removeItem('staffName')
      localStorage.removeItem('staffNum')
      this.$router.push({path:'/login2'})
    },

    async getGongXu() {
      let resGongXu = await this.$http.get(
        `/proline/station/listErrorEquipment/?positionId=p1`
      );
      console.log("我是getGongXu里面的res", resGongXu);
      var GOngxuCode = resGongXu.data.code;
      var GongXuData = resGongXu.data.data;
      var GongXuDataLength = GongXuData.length;
      // var GongXuError = [];
      console.log(GOngxuCode, GongXuData, GongXuDataLength);
      for (var i = 0; i < GongXuDataLength; i++) {
        if ((GongXuData[i].errorState != "OK") ||(GongXuData[i].connectState=="UN_READY")) {
          console.log(GongXuData[i].equipmentName);
          this.GongXuError.push(GongXuData[i].equipmentName);
        }
      }
      if(this.GongXuError.length == 0){
        this.zhanshi = false
        console.log('hi 我执行了吗',this.zhanshi)
      }
      this.gongxuerror = this.GongXuError.join()
      console.log('我是错误个数',this.gongxuerror);
    },
    async order() {
      if (this.GOngxuCode == 20000) {
        clearInterval(this.GONGXUtimer);
      } else {
        this.GONGXUtimer = setInterval(() => {
          this.getGongXu();
        }, 5000);
      }
    },
    async getVideo(){
      let res  = await this.$http.get(
        `/proline/station/getFile/?positionId=p1`
      );
      console.log('我是工序里面获取video的路径',res)
      console.log(this.nextVideoIndex,res.data.data)
      var videoData = res.data.data
      for(var i= 0;i<res.data.data.length;i++){
        if(this.nextVideoIndex[0] == videoData[i].procedureId){
          this.videoUrl =videoData[i].fileUrl
          console.log(videoData[i].fileUrl)
        }
      }
    },
    async fetchWork() {
      console.log("我是工序中的状态码", this.GOngxuCode);
      let res = await this.$http.get(
        `/proline/station/getProcess/?positionId=p1`
      );
      console.log("我是res", res);
      if (res.data.code == 20000) {
        this.item = res.data.data;
        this.nextOperateSet = this.item.nextOperateSet;
        this.procedureList = this.item.procedureList;
        this.nextVideoIndex = [];
        this.nextOpId = [];
        for (var i = 0; i < this.nextOperateSet.length; i++) {
          var id = this.nextOperateSet[i].opId;
          this.nextOpId.push(id);
          this.nextVideoIndex.push(this.nextOperateSet[i].pcdId)
        }
        // console.log('我是id',this.nextOpId)
        this.$message({ message: res.data.message, type: "success" });
      } else {
        this.$message({ message: "获取信息失败", type: "warning" });
      }
    },
    async fetchVideo() {
      let res = await this.$http.get(
        `proline/station/getProcess/?positionId=p1`
      );
      console.log("1111我是res", res);

      if (res.data.code == 20000) {
        this.item = res.data.data;

        this.$message({ message: res.data.message, type: "success" });
      } else {
        this.$message({ message: "获取信息失败", type: "warning" });
      }
    },
    changeWarning() {
      setInterval(() => {
        this.warning = false;
      }, 8000);
    },
   
    showZhang() {
      this.zhanshi = false;
      this.xianshi = true;
      setInterval(() => {
        this.xianshi = false;
        this.zhanshi = true
      }, 8000);
    },
  },
  async created() {
    await this.fetchWork();
    await this.getGongXu();
    await this.getVideo();
  },
  mounted() {
    // this.fetchVideo();
    this.changeWarning();
    document.addEventListener('click', (e) => {
    if (e.target.className !== 'zhang') {
      this.xianshi = false
      this.zhanshi = true
    }
  })
  },
};
</script>
<style scoped>
.work {
  height: 100vh;
}
.work .WorkTitle2 {
  margin: 0 auto;
  width: 96%;
  height: 80px;
  border-bottom: 2px solid #767676;
}
.work .WorkTitle2 .WorkTitleImg2 {
  width: 300px;
  height: 50px;
  float: left;
  margin-bottom: 10px;
  margin-top: 20px;
  /* position: absolute; */
  top: 20px;
  /* bottom: 10px; */
  padding: 0 50px;
  border-right: 2px solid #767676;
}
.work .WorkTitle2 .WorkTitleImg2 img {
  width: 100%;
  height: 100%;
}
.work .WorkTitle2 .WorkTitleName2 {
  float: left;
  height: 80px;
  margin-left: 50px;
  top: 20px;
  padding: 30px 0 0 0;
  color: white;
  font-size: 23px;
  border-bottom: 3px solid;
  /* background-color: red; */
  border-image: linear-gradient(to right, #3356bb, #6caacc) 1;
}
.work .WorkTitle2 .WorkTitleKuohao {
  float: left;
  height: 80px;
  margin-left: 50px;
  top: 20px;
  padding: 30px 0 0 0;
  color: white;
  font-size: 23px;
}
.work .WorkTitleRight {
  width: 350px;
  height: 80px;
  float: right;
  color: white;
  /* top: 20px; */
  /* padding: 30px 0 0 0; */
  font-size: 23px;
  margin-right: 50px;
  /* background-color: white;  ; */
}
.work .WorkTitleRight .WorkTitleRightOne {
  float: left;
  height: 80px;
  width: 180px;
}
.work .WorkTitleRight .WorkTitleRightOne img {
  /* display: block; */
  /* height: 80px; */
  padding: 30px 0 0 0;
  padding-left: 15px;
  float: left;
}
.work .WorkTitleRight .WorkTitleRightOne .WorkTitleRightOneWord {
  float: left;
  height: 80px;
  /* margin-left: 50px; */
  top: 20px;
  padding: 30px 0 0 20px;
  color: white;
  font-size: 23px;
  /* background-color: red; */
}
.work .WorkTitleRight .WorkTitleRightTwo {
  float: left;
  height: 80px;
  width: 170px;
  /* margin-left: 50px;
  top: 20px;
  padding: 30px 0 0 0;
  color: white;
  font-size: 23px; */
  /* background-color: green; */
}
.work .WorkTitleRight .WorkTitleRightTwo img {
  /* display: block; */
  /* height: 80px; */
  padding: 30px 0 0 0;
  padding-left: 15px;
  float: left;
}
.work .WorkTitleRight .WorkTitleRightTwo .WorkTitleRightTwoWord {
  float: left;
  height: 80px;
  /* margin-left: 50px; */
  top: 20px;
  padding: 30px 0 0 20px;
  color: white;
  font-size: 23px;
  /* background-color: red; */
}
.work .body {
  /* background: red; */
  width: 96%;
  height: calc(96vh - 80px);
  margin: 0 auto;
  padding-top: 20px;
  position: relative;
}
.work .body .zhang {
  width: 80px;
  height: 80px;
  position: fixed;
  right: 50px;
  /* float: right; */
  text-align: center;
  line-height: 80px;
  font-size: 35px;
  background-color: #b23433;
  color: white;
  border-radius: 8px;
  z-index: 999;
}
.work .body .showzhang {
  background: #5d5d5d;
  border-radius: 0px 12px 12px 0px;
  /* opacity: 0.5; */
  width: 364px;
  float: right;
  height: 352px;
  padding-left: 18px;
  padding-right: 59px;
  overflow: auto;
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 99;
}
/*滚动条高宽度*/
.showzhang::-webkit-scrollbar {
  width: 8px;
  height: 4px;
  background: #29292d;
}
/*滚动条滑块*/
.showzhang::-webkit-scrollbar-thumb {
  border-radius: 3px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  /* background: #c7c4c4; */
  background: #434343;
}
/*滚动条里面轨道*/
.showzhang ::-webkit-scrollbar-track {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 1) inset;
}
/*滚动条的小边角*/
.showzhang::-webkit-scrollbar-corner {
  background: transparent;
}
.work .body .showzhang ul {
  z-index: 999;
}
.work .body .showzhang ul li {
  height: 44px;
  text-align: left;
  /* text-align:justify; */
  list-style: none;
  padding-left: 46px;
  /* margin-top:23px; */
  font-size: 22px;
  line-height: 44px;
  letter-spacing: 10px;
  color: #f44040;
  z-index: 999;
}

.work .body .video {
  width: calc(100% - 364px);
  height: calc(96vh - 80px);
  background: pink;
  float: left;
}
.work .body .video .AllWarning {
  width: 800px;
  /* height: 50px; */
  position:absolute;
  top:0;
  left:0;
  z-index:999;
  color: #f44040;
  line-height: 50px;
  font-size: 20px;
  letter-spacing: 10px;
  /* position: fixed; */
  background-color: #fff;
}
.work .body .video .AllWarning img {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: none;
  margin-right: 10px;
}
.work .body .process {
  float: left;
  color: white;
  /* background:#1E1E24; */
  background: #1e1e24;
  border-radius: 0px 12px 12px 0px;
  width: 364px;
  height: calc(96vh - 80px);
  padding-left: 18px;
  padding-right: 59px;
  overflow: auto;
  z-index: 9;
}
/*滚动条高宽度*/
.process::-webkit-scrollbar {
  width: 8px;
  height: 4px;
  background: #29292d;
}
/*滚动条滑块*/
.process::-webkit-scrollbar-thumb {
  border-radius: 3px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  /* background: #c7c4c4; */
  background: #434343;
}
/*滚动条里面轨道*/
.process ::-webkit-scrollbar-track {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 1) inset;
}
/*滚动条的小边角*/
.process::-webkit-scrollbar-corner {
  background: transparent;
}

.work .body .process ul {
  margin-top: 44px;
}
.work .body .process ul > div {
  text-align: left;
  font-size: 28px;
  line-height: 40px;

  letter-spacing: 20px;
  font-weight: bold;
}
.work .body .process ul li {
  text-align: left;
  /* text-align:justify; */
  list-style: none;
  padding-left: 46px;
  margin-top: 23px;
  font-size: 22px;
  line-height: 44px;
  letter-spacing: 10px;
  color: white;
  /* color: #a0a0a0; */
}
.next {
  color: #59C5D2 !important;
}
.next img{
  content:url('./icon/blue-circle.png');
}
.undo {
  color: #b5b5b5 !important;
}
.doing {
  color: #59c5d2 !important;
}
</style>