<template>
  <div class="main">
    <div class="MainTitle">
      <div class="MainTitleImg">
        <img src="./img/logo.png" alt="">
      </div>
      <div class="MainTitleName">
        产&nbsp;线&nbsp;管&nbsp;理&nbsp;系&nbsp;统
      </div>
    </div>
    <div class="MainContent" >
      <div class="MainContentOne">
        首&nbsp;先
      </div>
      <div class="MainContentTwo">
        <div class="word">
          <span class="word1">扫&nbsp;描</span>
          <span class="word2">屏&nbsp;幕&nbsp;二&nbsp;维&nbsp;码</span>
          <span class="word3">以&nbsp;进&nbsp;行&nbsp;工&nbsp;站&nbsp;登&nbsp;录</span>
        </div>
        <div class="qrcode" ref="qrCodeUrl"></div>
        <div class="right">
          <div class="throl">
          
        </div>
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
import QRCode from 'qrcodejs2'
export default {
  components: {},
  data() {
    return {
      item: "",
    };
  },
  methods: {
    
    // 接口示例get，这个接口可用，用来体会下过程
    // test(){
    //   setInterval( , 1000);
    // },
    async test() {
        return new Promise(resolve => {
            setInterval(() => {
                resolve(this.fetchType())
            }, 8000)
        })
    },

    async fetch() {
      let res = await this.$http.get(`/proline/station/getLoginCode`);
      console.log('我是res',res);
      // 根据返回状态判断请求是否成功
      if (res.data.code == 20000) {
        this.item = res.data.data;
        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
            text: this.item, // 需要转换为二维码的内容
            width: 100,
            height: 100,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        })
        console.log(qrcode);
        this.$message({ message: res.data.message, type: "success" });
      } else {
        this.$message({ message: "获取信息失败", type: "warning" });
      }
    },
    // 请求登陆码状态
    async fetchType() {
      
      let res = await this.$http.get(
        `/proline/station/getLoginState/?code=${this.item}`
      );
      console.log(res.data.data);
      // {staffId: '', staffName: '', staffNum: '', state: 'WAIT_QR_CODE'}
      // 根据返回状态判断请求是否成功
      if (res.data.code == 20000) {
        this.item = res.data.data.state;
        if(this.item == 'WAIT_QR_CODE'){
          this.$router.push({path:'/login2'})
        }
        else if(this.item == 'WAIT_STAFF_CODE '){
          console.log(this.item);
        }
        else if (this.item == 'success'){
          this.$router.push({path:'/login2'}) //,query: {id:res.data.data.staffId}
        }
        else{
          console.log(this.item);
        }
      } 
      // else {
      //   this.$message({ message: '获取信息失败', type: "warning" });
      // }
    },
    // 接口示例post,这个只是假设用法如何传值，接口无法使用
    async save() {
      let res = await this.$http.post(`student/group/new`, {
        number: this.items.length + 1,
        expClassId: this.expClassId,
        week: this.expTime.week,
        day: this.expTime.day,
        section: this.expTime.section,
        expId: this.expId,
      });
      console.log(res);
    },
    
  },

  async created() {
    await this.fetch();
    // await this.fetchType();
    await this.test();
    
  },
  // mounted() {
  //   this.test();
  // },
};
</script>

<style scoped>
.main{
  height:100vh;
}
.main .MainTitle {
  margin: 0 auto;
  width: 96%;
  height: 80px;
  border-bottom: 2px solid #767676;
}
html,body{
    width: 100%;
    height: 100%;
}
.main .MainContent{
  /* width: 96%; */
  height: 700px;
  min-height: 700px;
  /* position: absolute; */
  margin: 0 auto;
  /* background-color: red; */
}
.main .MainTitle .MainTitleImg{
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
.main .MainTitle .MainTitleImg img{
  width: 100%;
  height: 100%;
}
.main .MainTitle .MainTitleName{
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
.main .qrcode{
    display: inline-block;
}
/deep/.qrcode img {
        width: 200px;
        height: 200px;
        background-color: black; 
        padding: 0 10px 10px 0; 
        box-sizing: border-box;
        
        border-bottom:3px solid;
        border-right: 3px solid;
        border-image: linear-gradient(to bottom, #3768D2, #71BED4) 1;
}
.main .MainContent .MainContentOne{
  top: 230px;
  text-align: left;
  width: 200px;
  position: relative;
  /* left: 280px; */
  /* left: 30%; */
  left:20%;
  font-size: 16px;
  /* background-color: red; */
  color: #23BFEC;
  height: 20px;
}
.main .MainContent .MainContentTwo{
  position: relative;
  top: 230px;
  /* left: 280px; */
  left: 20%;
  /* left: 30%; */
  height: 400px;
  width: 1000px;
  /* background-color: blue; */
}
.main .MainContent .MainContentThree{
  position: relative;
  text-align: left;
  /* top: 420px; */
  left: 280px;
  height: 40px;
  font-size: 16px;
  color: white;
  /* background-color: white; */
}
.main .MainContent .word{
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
.main .MainContent .word span{
  width: 100px;
  height: 50px;
  /* float: left; */
  display: block;
  /* background-color: skyblue; */
  text-align: left;
  line-height: 50px;
}
.main .MainContent .word .word1{
  margin-top: 25px;
  font-weight: bold;
}
.main .MainContent .word .word2{
  font-weight: bold;
}
.main .MainContent .word .word3{
  font-size: 14px;
  height: 30px;
  margin-top: 40px;
}
.MainContent .throl{
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
.MainContent .right{
  width: 120px;
  height: 200px;
  
  /* background-color: red; */
  float: right;
}
.MainContent .gun{
  width: 40px;
  height: 60px;
  float: right;
  /* background-color: #fff; */
}
.MainContent .gun .gun1{
  width: 40px;
  margin-top: 40px;
  height: 35px;
  font-size: 25px;
  display: block;
  color: #23BFEC;
  text-align: center;
}
.MainContent .gun .gun2{
  width: 40px;
  height: 15px;
  margin-top: 10px;
  font-size: 15px;
  display: block;
  color: #fff;
  text-align: center;
}
</style>
