<template>
  <div class="main2">
    <div class="MainTitle2">
      <div class="MainTitleImg2">
        <img src="./img/logo.png" alt="">
      </div>
      <div class="MainTitleName2">
        产&nbsp;线&nbsp;管&nbsp;理&nbsp;系&nbsp;统
      </div>
    </div>
    <div class="MainContent2" >
      <div class="MainContentOne2">
        现&nbsp;在
      </div>
      <div class="MainContentTwo2">
        <div class="word2">
          <span class="word12">扫&nbsp;描</span>
          <span class="word22">员&nbsp;工&nbsp;条&nbsp;形&nbsp;码</span>
          <span class="word32">以&nbsp;进&nbsp;行&nbsp;员&nbsp;工&nbsp;登&nbsp;录</span>
        </div>
        <div class="right2">
          <div class="throl2">
          
          </div>
          <div class="gun2">
            <span class="gun12">0 1</span>
            <span class="gun22">0 2</span>
          </div>
    </div>
    </div>
  
  
    </div>
  </div>
</template>

<script>
// import QRCode from 'qrcodejs2'
// import { useRouter } from 'vue-router'
export default {
  components: {},
  data() {
    return {
      item: "",
    };
  },
  methods: {
    test2(){
     this.timer2 = setInterval(() => {this.fetchType2()
            }, 2000)
    },
    clear2(){
      console.log('我要清除定时器')
      clearInterval(this.timer2);
    },
    // 请求登陆码状态
    async fetchType2() {
      // const router = useRouter()
      // console.log('我是login传给login2的参数',router.currentRoute.value.query)
      let res = await this.$http.get(
        `/proline/station/getLoginState/?code=${this.item}`
      );
      console.log('我是login2222222里面的内容',res);
     if (res.data.code == 20000) {
        this.item = res.data.data.state;
        if (this.item == 'success'){
          
          this.$router.push({path:'/work'}) //,query: {id:res.data.data.staffId}
          this.clear2()
        }
        else{
          console.log('我是其他错误');
          this.$router.push({path:'/work'})
          this.clear2()
        }
        }
    },
    async startTime(){
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.clearState())
            }, 6000)
        })
    },
    async clearState(){
        localStorage.clear();  //localStorage.clear()是清除所有的存储内容 
        console.log('清除localstore信息成功！')
        // localStorage.removeItem('staffId') //localStorage.clear()是清除这一项的存储内容
    },
    
    
  },

  async created() {
    // await this.fetch();
    // await this.fetchType2();
    await this.test2();
  },
  
};
</script>

<style scoped>
.main2{
  height: 100vh;
}
.main2 .MainTitle2 {
  margin: 0 auto;
  width: 96%;
  height: 80px;
  border-bottom: 2px solid #767676;
}
html,body{
    width: 100%;
    height: 100%;
}
.main2 .MainContent2{
  /* width: 96%; */
  height: 700px;
  min-height: 700px;
  position: absolute;
  /* background-color: red; */
}
.main2 .MainTitle2 .MainTitleImg2{
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
.main2 .MainTitle2 .MainTitleImg2 img{
  width: 100%;
  height: 100%;
}
.main2 .MainTitle2 .MainTitleName2{
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

.main2 .MainContent2 .MainContentOne2{
  top: 230px;
  text-align: left;
  width: 200px;
  position: relative;
  left: 580px;
  font-size: 16px;
  /* background-color: red; */
  color: #23BFEC;
  height: 20px;
}
.main2 .MainContent2 .MainContentTwo2{
  position: relative;
  top: 230px;
  left: 580px;
  height: 400px;
  width: 600px;
  /* background-color: blue; */
}

.main2 .MainContent2 .word2{
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
.main2 .MainContent2 .word2 span{
  width: 100px;
  height: 50px;
  /* float: left; */
  display: block;
  /* background-color: skyblue; */
  text-align: left;
  line-height: 50px;
}
.main2 .MainContent2 .word2 .word12{
  margin-top: 25px;
  font-weight: bold;
}
.main2 .MainContent2 .word2 .word22{
  font-weight: bold;
}
.main2 .MainContent2 .word2 .word32{
  font-size: 14px;
  height: 30px;
  margin-top: 40px;
}
.MainContent2 .throl2{
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
.MainContent2 .right2{
  width: 120px;
  height: 200px;
  
  /* background-color: red; */
  float: right;
}
.MainContent2 .gun2{
  width: 40px;
  height: 60px;
  float: right;
  /* background-color: #fff; */
}
.MainContent2 .gun2 .gun22{
  width: 40px;
  margin-top: 10px;
  height: 35px;
  font-size: 25px;
  display: block;
  color: #23BFEC;
  text-align: center;
}
.MainContent2 .gun2 .gun12{
  width: 40px;
  height: 15px;
  margin-top: 30px;
  font-size: 15px;
  display: block;
  color: #fff;
  text-align: center;
}

</style>
