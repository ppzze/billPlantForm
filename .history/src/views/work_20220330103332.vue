<template>
<div class = "work">
    <div class="WorkTitle2">
        <div class="WorkTitleImg2">
            <img src="./img/logo.png" alt="">
        </div>
        <div class="WorkTitleName2">
            充&nbsp;电&nbsp;站&nbsp;1&nbsp;号&nbsp;流&nbsp;水&nbsp;线&nbsp;1&nbsp;号&nbsp;工&nbsp;位
        </div>
        <div class="WorkTitleKuohao">
          ( 生&nbsp;产&nbsp;中 )
        </div>
        <div class = "WorkTitleRight">
          <div class="WorkTitleRightOne">
            <img src="./img/user.png" alt="">
            <div class="WorkTitleRightOneWord">林&nbsp;一&nbsp;凡</div>
          </div>
            <div class="WorkTitleRightTwo">
              <img src="./img/exit.png" alt="">
              <div class="WorkTitleRightTwoWord">退&nbsp;出</div>
            </div>
            
        </div>
    </div>
    <div class="body">
      <div class="zhang" @click="showZhang" v-show="zhanshi">
        障
      </div>
      <div class="showzhang" v-if="xianshi">
         <ul>
           <li :key="guzhang.key" v-for="guzhang in guZhang">
                      <img style="width:22px;height:22px" 
                      src = './img/红点.png'>
                      {{guzhang.word}}</li>
         </ul>
      </div>
        <div class="video">
          <div class="AllWarning" v-show="warning">
            <img src="./img/Slice 1.png" alt="">
            <span>电动螺丝刀1出现故障，请检查</span>
          </div>
        </div>
        <div class="process">
                <ul>
                    <div> <img style="width:22px;height:22px" :src="this.state==1? require('./icon/blue-circle.png'):require('./icon/grey-circle.png')" > 工序二</div>
                    <li> <img style="width:22px;height:22px" src="./icon/blue-circle.png"> 使用电动螺丝刀1拧螺丝1</li>
                    <li class="doing"><i class="el-icon-success"></i>使用电动螺丝刀2拧螺丝2</li>
                    <li><i class="el-icon-success"></i>使用电动螺丝刀3拧螺丝</li>
                    <li><i class="el-icon-success"></i>使用电动螺丝刀4拧螺丝</li>
                    <li><i class="el-icon-success"></i>使用电动螺丝刀5拧螺丝</li>
                </ul>
                <ul>
                    <div class="undo"> <i class="el-icon-success"></i>工序三</div>
                    <li class="success"><i class="el-icon-success"></i>使用电动螺丝刀1拧螺丝1</li>
                    <li class="success"><i class="el-icon-success"></i>使用电动螺丝刀2拧螺丝2</li>
                    <!-- <li class="success"><i class="el-icon-success" v-show="!ok"></i><div v-show="ok" style="border-radius:50%;width:20px;height:20px;color:white;background-color:red;line-height:17px;text-align:center;font-size:16px;padding-left:5px;">x</div>使用电动螺丝刀3拧螺丝</li> -->
                    <li class="doing"><i class="el-icon-success"></i>使用电动螺丝刀3拧螺丝</li>
                    <li class="doing"><i class="el-icon-success"></i>使用电动螺丝刀4拧螺丝</li>
                    <li><i class="el-icon-success"></i>使用电动螺丝刀5拧螺丝</li>
                </ul>
                  <!-- 下面是循环生成li -->
                  <ul>
                    <li :key="gongxu.do" v-for="gongxu in paper">
                      <img style="width:22px;height:22px" 
                      @click="changeImg(gongxu.do)"
                      src = './icon/blue-circle.png'
                      id="GongXUState">
                      {{gongxu.word}}</li>
                  </ul>
<!-- 循环生成li结束 -->
        </div> 
    </div> 
</div>   
</template>
<script>
export default{
  data(){
  return{
    ok:true,
    state:1,
    warning:true,
    zhanshi:true,
    xianshi:false,
    // :src="imagepath" 
    // imagepath:require('./icon/blue-circle.png'),
    paper:[
      {
        state:5,
        word:'工序五',
        do:'no'
      },
      {
        state:5.1,
        word:'使用电动螺丝刀1拧螺丝1',
        do:'yes'
      },
      {
        state:5.2,
        word:'使用电动螺丝刀5拧螺丝',
        do:'prepare'
      },
    ],
    guZhang:[
      {
        key:'zhang1',
        word:'电动螺丝刀1',
      },
      {
        key:'zhang2',
        word:'电动螺丝刀2',
      },
      {
        key:'zhang3',
        word:'电动螺丝刀3',
      },
      {
        key:'zhang4',
        word:'电动螺丝刀4',
      },
      {
        key:'zhang5',
        word:'电动螺丝刀5',
      },
      {
        key:'zhang6',
        word:'电动螺丝刀6',
      },
      {
        key:'zhang7',
        word:'电动螺丝刀7',
      },
      {
        key:'zhang8',
        word:'电动螺丝刀8',
      },
      {
        key:'zhang9',
        word:'电动螺丝刀9',
      },
      {
        key:'zhang10',
        word:'电动螺丝刀1',
      },
    ],
  }
},
methods:{
  changeImg(do1){
  var obj = document.getElementById("GongXUState")
     console.log(do1);
     if (do1 =='yes'){
       console.log('hello')
       obj.src = './icon/right.png'
        // this.imagepath =require('./icon/right.png');
     }
     else if(do1 =='no'){
       this.imagepath = require('./icon/error.png');
     }
     else if(do1 =='prepare'){
       this.imagepath = require('./icon/blue-circle.png');
     }
  },
  async fetchWork() {
      let res = await this.$http.get(`proline/station/listEquipmentState/?positionId=aaa`);
      console.log('我是res',res);
      // https://blog.csdn.net/wwf1225/article/details/90603139
      // 根据返回状态判断请求是否成功
      if (res.data.code == 20000) {
        this.item = res.data.data;
        this.$message({ message: res.data.message, type: "success" });
      } else {
        this.$message({ message: "获取信息失败", type: "warning" });
      }
    },
  changeWarning(){
    setInterval(() => {
      this.warning = false;
          }, 5000)
  },
  showZhang(){
    this.zhanshi = false;
    this.xianshi = true;
    setInterval(() => {
      this.xianshi = false;
          }, 5000)
  }
},

async created() {
    await this.fetchWork();
  },
mounted() {
    this.changeWarning();
  },
}


</script>
<style scoped>
.work{
  height: 100vh;
}
.work .WorkTitle2 {
  margin: 0 auto;
  width: 96%;
  height: 80px;
  border-bottom: 2px solid #767676;
  
}
.work .WorkTitle2 .WorkTitleImg2{
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
.work .WorkTitle2 .WorkTitleImg2 img{
  width: 100%;
  height: 100%;
}
.work .WorkTitle2 .WorkTitleName2{
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
.work .WorkTitle2 .WorkTitleKuohao{
  float: left;
  height: 80px;
  margin-left: 50px;
  top: 20px;
  padding: 30px 0 0 0;
  color: white;
  font-size: 23px;
}
.work .WorkTitleRight{
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
.work .WorkTitleRight .WorkTitleRightOne{
    float: left;
  height: 80px;
  width: 180px;
}
.work .WorkTitleRight .WorkTitleRightOne img{
  /* display: block; */
  /* height: 80px; */
  padding: 30px 0 0 0;
  padding-left: 15px;
  float: left;
}
.work .WorkTitleRight .WorkTitleRightOne .WorkTitleRightOneWord{
float: left;
  height: 80px;
  /* margin-left: 50px; */
  top: 20px;
  padding: 30px 0 0 20px;
  color: white;
  font-size: 23px;
  /* background-color: red; */
}
.work .WorkTitleRight .WorkTitleRightTwo{
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
.work .WorkTitleRight .WorkTitleRightTwo img{
  /* display: block; */
  /* height: 80px; */
  padding: 30px 0 0 0;
  padding-left: 15px;
  float: left;
}
.work .WorkTitleRight .WorkTitleRightTwo .WorkTitleRightTwoWord{
float: left;
  height: 80px;
  /* margin-left: 50px; */
  top: 20px;
  padding: 30px 0 0 20px;
  color: white;
  font-size: 23px;
  /* background-color: red; */
}
.work .body{
  /* background: red; */
  width: 96%;
  height: calc(96vh - 80px);
  margin: 0 auto;
  padding-top: 20px;
}
.work .body .zhang{
  width: 80px;
  height: 80px;
  position: fixed;
  right: 50px;
  /* float: right; */
  text-align: center;
  line-height: 80px;
  font-size: 35px;
  background-color: #B23433;
  color: white;
  border-radius: 8px;
  z-index: 999;
}
.work .body .showzhang{
  background: #5D5D5D;
  border-radius: 0px 12px 12px 0px;
  width:364px;
  float: right;
  height: 352px;
  padding-left:18px;
  padding-right:59px;
  overflow:auto;
  z-index: 10086;
}
/*滚动条高宽度*/
.showzhang::-webkit-scrollbar{
    width: 8px;
    height: 4px;
    background:#29292D;
}
/*滚动条滑块*/
.showzhang::-webkit-scrollbar-thumb{
    border-radius: 3px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    /* background: #c7c4c4; */
    background:#434343;
}
/*滚动条里面轨道*/
.showzhang ::-webkit-scrollbar-track {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 1) inset;
}
/*滚动条的小边角*/
.showzhang::-webkit-scrollbar-corner {
    background: transparent;
}
.work .body .showzhang ul li{
  height: 44px;
  text-align:left;
  /* text-align:justify; */
  list-style:none;
  padding-left:46px;
  /* margin-top:23px; */
  font-size:22px;
  line-height:44px;
  letter-spacing:10px;
  color:#F44040;
}

.work .body .video{
 width:calc(100% - 364px);
 height: calc(96vh - 80px);
 background:pink;
 float:left;
}
.work .body .video .AllWarning{
  width: 500px;
  height: 50px;
  float: left;
  color: #F44040;
  line-height: 50px;
  font-size: 20px;
  letter-spacing:10px;
  /* position: fixed; */
  /* background-color: #fff; */
}
.work .body .video .AllWarning img{
  display: inline-block;
  width: 20px;
  height: 20px;
  background: none;
  margin-right: 10px;
}
.work .body .process{
  float:left;
  /* background:#1E1E24; */
  background: #1E1E24;
  border-radius: 0px 12px 12px 0px;
  width:364px;
  height: calc(96vh - 80px);
  padding-left:18px;
  padding-right:59px;
  overflow:auto;
}
/*滚动条高宽度*/
.process::-webkit-scrollbar{
    width: 8px;
    height: 4px;
    background:#29292D;
}
/*滚动条滑块*/
.process::-webkit-scrollbar-thumb{
    border-radius: 3px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    /* background: #c7c4c4; */
    background:#434343;
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
  margin-top:44px;
}
.work .body .process ul > div{
  text-align:left;
  font-size:28px;
  line-height:40px;
  color:#59C5D2;
  letter-spacing:20px;
  font-weight:bold;
}
.work .body .process ul > li{
  text-align:left;
  /* text-align:justify; */
  list-style:none;
  padding-left:46px;
  margin-top:23px;
  font-size:22px;
  line-height:44px;
  letter-spacing:10px;
  color:#A0A0A0;
}
.success{
    color:#23C516 !important;
}
.undo{
    color:#B5B5B5 !important;
}
.doing{
    color:#59C5D2 !important;
}

</style>