<template>
  <div class="main">
    <div class="MainTitle">
      <div class="MainTitleImg">
        <img src="./img/logo.png" alt="" />
      </div>
      <div class="MainTitleName">
        产&nbsp;线&nbsp;管&nbsp;理&nbsp;系&nbsp;统
      </div>
    </div>
    <div class="MainContent">
      <div class="MainContentOne">首&nbsp;先</div>
      <div class="MainContentTwo">
        <div class="word">
          <span class="word1">扫&nbsp;描</span>
          <span class="word2">屏&nbsp;幕&nbsp;二&nbsp;维&nbsp;码</span>
          <span class="word3"
            >以&nbsp;进&nbsp;行&nbsp;工&nbsp;站&nbsp;登&nbsp;录</span
          >
        </div>
        <div class="qrcode" ref="qrCodeUrl" ></div>
        <div class="right">
          <div class="throl"></div>
          <div class="gun">
            <span class="gun1">0 1</span>
            <span class="gun2">0 2</span>
          </div>
        </div>
      </div>
      <!-- <div class="MainContentThree"></div> -->
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
// const axios = require('axios');
export default {
  components: {},
  data() {
    return {
      item: "",
      qrcode:""
    };
  },
  methods: {
    liucheng(){
      this.liuchengtimer = setInterval(() =>{
        this.lunxun2();
      },2000)
    },
    clearliucheng(){
      clearInterval(this.liuchengtimer)
    },
    test() {
      this.timer = setInterval(() => {
        this.fetchType();
      }, 2000);
    },
    clear() {
      console.log("我要清除定时器");
      clearInterval(this.timer);
    },
// 模拟扫码枪登录
    async saomaqiang1(){
      let res = this.$http.post(`/proline/station1/jnaScanner`,{
  "positionId": "p1",
  "equipmentId": "4",
"data": {"code": this.item}
});
    console.log('我是第一次扫码枪',res)
    },
    async saomaqiang2(){
      let res = this.$http.post(`/proline/station1/jnaScanner`,{
  "positionId": "p1",
  "equipmentId": "4",
"data": {"code": "10001"}
});
console.log('我是第二次扫码枪',res)
    },
// 模拟扫码枪登录结束
    async fetchlyp(){
      const positionId = localStorage.positionId;
      const staffId = localStorage.staffId;
      const staffName = localStorage.staffName;
      const staffNum = localStorage.staffNum;
      if(positionId !== "" && typeof(positionId) !== undefined&&typeof(staffId) !== "undefined" 
      && typeof(staffName) !== "undefined" && typeof(staffNum) !== "undefined" 
      && staffId !== "" && staffName !== "" && staffNum !== ""){
        console.log('我是新的逻辑中直接跳转到work页面的人')
        this.$router.push({ path: "/work" });
      }
      else{
        await this.lunxun();
        this.liucheng();
        // 每两秒执行一次轮询查询
      }
    },
    async lunxun(){
      const positionId = localStorage.positionId;

      console.log(positionId !== "" && typeof(positionId) !== 'undefined')
      if(positionId !== "" && typeof(positionId) !== 'undefined'){
        console.log('1111')
         var res = await this.$http.get(`/proline/station/getLoginCode?positionId=${localStorage.positionId}`);
      }else{
        console.log('2222')
        res = await this.$http.get(`/proline/station/getLoginCode`);
      }
      console.log('我是第一次请求',res)
      if(res.data.code == 20000){
        console.log('生成二维码的信息',res)
        this.item = res.data.data;
          localStorage.item = this.item;
          this.code = res.data.code;
          var qrcode = new QRCode(this.$refs.qrCodeUrl, {
            text: this.item, // 需要转换为二维码的内容
            width: 100,
            height: 100,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
          });
          // $(.qrcode).removeItem
          console.log(qrcode);
          console.log("获取二维码成功", this.item);
      }
      
    },
    async lunxun2(){
      let res2 = await this.$http.get(`/proline/station/getLoginState?code=${this.item}`);
      console.log('我是res2',res2)
      if (res2.data.code == 20000) {
        this.state = res2.data.data.state;
        // 如果请求成功 记录 id num name position 四个信息，并且直接跳转
        // 24小时后 删除 id num name 三者 position保留
        // 取消 getLoginState 的轮询
        if (this.state == "SUCCESS") {
          // this.$message({ message: "登陆成功", type: "success" });
          console.log("登陆成功");
          localStorage.staffId = res2.data.data.staffId;
          localStorage.staffName = res2.data.data.staffName;
          localStorage.staffNum = res2.data.data.staffNum;
          localStorage.positionId = res2.data.data.positionId;
          localStorage.stationName = res2.data.data.stationName;
          this.$router.push({ path: "/work" });
          this.clearliucheng();
          this.startTime();
        } else if (this.state == "WAIT_STAFF_CODE") {
          console.log("尚未获取到员工信息");
          this.$router.push({ path: "/login2" });
          await this.saomaqiang2();
        } else {
          await this.saomaqiang1();
          console.log("尚未获取到信息");
        }
      }
    },
    async fetch() {
      const positionId = localStorage.positionId;
      const staffId = localStorage.staffId;
      const staffName = localStorage.staffName;
      const staffNum = localStorage.staffNum;
      if (positionId !== "" && positionId !== undefined) {
        //如果positionID 不为空 ，就不需要获取二维码了
        //  查有没有员工状态  如果有 就跳到work界面
        //                  如果没有 就跳到login2界面
        // 如果positionID为空  重新获取二维码了 直接进行轮询 每两秒获取一次fetchType()
        let res = await this.$http.get(`/proline/station/getLoginCode?positionId=${localStorage.positionId}`);
        this.item = res.data.data
        console.log('我是有工站信息直接跳转到工作页面',res,res.data.code)
        if (res.data.code == 20000) {
          if (typeof(staffId) !== "undefined" && typeof(staffName) !== "undefined" && typeof(staffNum) !== "undefined" && staffId !== "" && staffName !== "" && staffNum !== "") {
          console.log('##',staffId,staffName,staffNum)
          this.$router.push({ path: "/work" });
        } else {
          this.test();
          // await this.fetchType();
          // this.$router.push({ path: "/login2" });
        }
        }
        
      } 
      else {
        let res = await this.$http.get(`/proline/station/getLoginCode`);
        console.log("我是res", res);
        // 根据返回状态判断请求是否成功
        if (res.data.code == 20000) {
          this.item = res.data.data;
          localStorage.item = this.item;
          this.code = res.data.code;
          var qrcode = new QRCode(this.$refs.qrCodeUrl, {
            text: this.item, // 需要转换为二维码的内容
            width: 100,
            height: 100,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
          });
          console.log(qrcode);
          console.log("获取二维码成功", this.item);
          this.test(); //进行轮询 每两秒获取一次fetchType()
          // this.$message({ message: res.data.message, type: "success" });
        } else {
          // this.$message({ message: "获取信息失败", type: "warning" });
        }
      }
    },
    // 请求登陆码状态
    async fetchType() {
      let res = await this.$http.get(
        `/proline/station/getLoginState?code=${this.item}`
      );
      console.log(res,this.item)
      // console.log(
      //   "我是login第二步请求登录码的真实数据",
      //   this.item,
      //   res.data.data.state
      // );
      // {staffId: '', staffName: '', staffNum: '', state: 'WAIT_QR_CODE'}
      // 根据返回状态判断请求是否成功
      if (res.data.code == 20000) {
        this.state = res.data.data.state;

        // 如果请求成功 记录 id num name position 四个信息，并且直接跳转
        // 24小时后 删除 id num name 三者 position保留
        // 取消 getLoginState 的轮询
        if (this.state == "SUCCESS") {
          // this.$message({ message: "登陆成功", type: "success" });
          console.log("登陆成功");
          localStorage.staffId = res.data.data.staffId;
          localStorage.staffName = res.data.data.staffName;
          localStorage.staffNum = res.data.data.staffNum;
          localStorage.positionId = res.data.data.positionId;
          localStorage.stationName = res.data.data.stationName;
          this.$router.push({ path: "/work" });
          this.clear();
          this.startTime();
        } else if (this.state == "WAIT_STAFF_CODE") {
          
          console.log("尚未获取到员工信息");
          this.$router.push({ path: "/login2" });
          await this.saomaqiang2();
        } else {
          await this.saomaqiang1();
          console.log("尚未获取到信息");
        }
      }
    },
    async startTime() {
      var start = new Date(new Date()).getTime();
      var startTime1 = new Date(new Date().toLocaleDateString()).getTime(); // 当天0点
      var endTime1 =
        new Date(new Date().toLocaleDateString()).getTime() +
        24 * 60 * 60 * 1000 -
        1; // 当天23:59
      var during = endTime1 - start;
      console.log("目前时间", start);
      console.log("今天开始时间", startTime1);
      console.log("今晚结束时间", endTime1);
      console.log("持续时间", during);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.clearState());
        }, during);
      });
    },
    async clearState() {
      // localStorage.clear(); //localStorage.clear()是清除所有的存储内容
      console.log("清除localstore信息成功！");
      localStorage.removeItem("staffId"); //localStorage.clear()是清除这一项的存储内容
      localStorage.removeItem("staffName");
      localStorage.removeItem("staffNum");
    },
  },
  // created(){
  //   this.fetch();
  //   this.test();
  // }

  async created() {
    await this.fetchlyp();
    // await this.fetch();
    // await this.fetchType();
    // await this.test();
    //  this.clear();
  },

  // mounted() {
  //   this.test();
  // },
};
</script>

<style scoped>
.main {
  height: 100vh;
}
.main .MainTitle {
  margin: 0 auto;
  width: 96%;
  height: 80px;
  border-bottom: 2px solid #767676;
}
html,
body {
  width: 100%;
  height: 100%;
}
.main .MainContent {
  /* width: 96%; */
  height: 700px;
  min-height: 700px;
  /* position: absolute; */
  margin: 0 auto;
  /* background-color: red; */
}
.main .MainTitle .MainTitleImg {
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
.main .MainTitle .MainTitleImg img {
  width: 100%;
  height: 100%;
}
.main .MainTitle .MainTitleName {
  float: left;
  height: 80px;
  margin-left: 50px;
  top: 20px;
  padding: 30px 0 0 0;
  color: white;
  font-size: 23px;
  border-bottom: 3px solid;
  border-image: linear-gradient(to right, #3356bb, #6caacc) 1;
}
.main .qrcode {
  display: inline-block;
}
/deep/.qrcode img {
  width: 200px;
  height: 200px;
  background-color: black;
  padding: 0 10px 10px 0;
  box-sizing: border-box;

  border-bottom: 3px solid;
  border-right: 3px solid;
  border-image: linear-gradient(to bottom, #3768d2, #71bed4) 1;
}
.main .MainContent .MainContentOne {
  top: 230px;
  text-align: left;
  width: 200px;
  position: relative;
  /* left: 280px; */
  /* left: 30%; */
  left: 20%;
  font-size: 16px;
  /* background-color: red; */
  color: #23bfec;
  height: 20px;
}
.main .MainContent .MainContentTwo {
  position: relative;
  top: 230px;
  /* left: 280px; */
  left: 20%;
  /* left: 30%; */
  height: 400px;
  width: 1000px;
  /* background-color: blue; */
}
.main .MainContent .MainContentThree {
  position: relative;
  text-align: left;
  /* top: 420px; */
  left: 280px;
  height: 40px;
  font-size: 16px;
  color: white;
  /* background-color: white; */
}
.main .MainContent .word {
  text-align: left;
  float: left;
  /* display: inline-block; */
  font-size: 30px;
  color: white;
  height: 270px;
  width: 380px;
  /* line-height: 270px; */
  /* background-color: rgb(173, 15, 15); */
  margin-right: 50px;
}
.main .MainContent .word span {
  width: 100px;
  height: 50px;
  /* float: left; */
  display: block;
  /* background-color: skyblue; */
  text-align: left;
  line-height: 50px;
}
.main .MainContent .word .word1 {
  margin-top: 25px;
  font-weight: bold;
}
.main .MainContent .word .word2 {
  font-weight: bold;
}
.main .MainContent .word .word3 {
  font-size: 14px;
  height: 30px;
  margin-top: 40px;
}
.MainContent .throl {
  width: 100px;
  height: 120px;
  /* display: inline-block; */
  float: right;
  margin-right: 20px;
  font-size: 30px;
  color: white;
  border-right: 2px solid white;
  /* background-color: #fff; */
}
.MainContent .right {
  width: 120px;
  height: 200px;

  /* background-color: red; */
  float: right;
}
.MainContent .gun {
  width: 40px;
  height: 60px;
  float: right;
  /* background-color: #fff; */
}
.MainContent .gun .gun1 {
  width: 40px;
  margin-top: 40px;
  height: 35px;
  font-size: 25px;
  display: block;
  color: #23bfec;
  text-align: center;
}
.MainContent .gun .gun2 {
  width: 40px;
  height: 15px;
  margin-top: 10px;
  font-size: 15px;
  display: block;
  color: #fff;
  text-align: center;
}
</style>
