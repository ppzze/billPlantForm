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
        <div class="qrcode" ref="qrCodeUrl"></div>
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
      qrcode: "",
    };
  },
  methods: {
    async liucheng() {
      this.liuchengtimer = setInterval(() => {
        this.getLoginState();
      }, 1000);
    },

    clearliucheng() {
      clearInterval(this.liuchengtimer);
    },

    async getLoginCode() {
      var res = await this.$http.get(`/proline/station/getLoginCode`);
      if (res.data.code == 20000) {
        console.log("生成二维码的信息", res);
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
      console.log("我是第一次请求", res);
    },

    // 请求登陆码状态
    async getLoginState() {
      let res = await this.$http.get(
        `/proline/station/getLoginState?code=${this.item}`
      );
      if (res.data.code == 20000) {
        this.state = res.data.data.state;
        if (this.state == "WAIT_STAFF_CODE") {
          console.log("login扫码成功");
          window.sessionStorage.setItem("admin", "2");
          // sessionStorage.admin = "2";
          this.$router.push({ path: "/login2" });
        } else {
          console.log("login-等待员工扫码");
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
  },

  async created() {
    await this.getLoginCode();
    await this.liucheng();
  },
  mounted() {
    localStorage.userId = "#";
  },
  destroyed() {
    this.clearliucheng();
  },
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
  background-color: white;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 20px;
  border: 3px solid;
  /* border-image: linear-gradient(to bottom, #3768d2, #71bed4) 1; */
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
  left: 20%;
  height: 400px;
  /* alter by zze */
  /* margin: 230px auto; */
  width: 1000px;
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
