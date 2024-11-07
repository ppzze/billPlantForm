<template>
  <div class="first">
    <div class="header">
      <div class="top" >
        <img src="./icon/首页图标.png" alt="" />
        <span
          style="
            float: left;
            margin-left: 10px;
            border-left: 3px solid #000000;
            padding-left: 10px;
          "
          >单据识别系统</span
        >
        <ul class="tab">
          <li>首页</li>
          <li>使用说明</li>
          <li>联系我们</li>
          <li>开始使用</li>
          <li>更多</li>
        </ul>
      </div>
    </div> 
    <div style="margin: 20px 0; min-width: 1200px;">
      <el-carousel :interval="5000"  arrow="always" height="500px" >
        <el-carousel-item v-for="item in imgList" :key="item.id">
          <img :src="item.idView" class="image" style="width:100%" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="mid">
   
      <div style="text-align:center; font-size:30px">特色优势</div>
      <div class="mid_left" >
        <img src="./icon/homeicon1.png" alt="" style="position:absolute; left:20px; top:20px; height: 40px;width: 40px;">
        <span style="position:absolute; left:65px; top:20px; font-size: 24px; line-height: 40px; font-weight: 800;"> 适用范围广</span>
        <span style="position:absolute; left:65px; top:80px; font-size: 18px; line-height: 40px; text-align: left;">支持对各类银行汇票进行识别，并结构化返回关键字段识别结果，能够满足对不同种类银行汇票进行信息提取的需求</span>
      </div>
      <div class="mid_right">
        <img src="./icon/homeicon2.png" alt="" style="position:absolute; left:20px; top:20px; height: 40px;width: 40px;">
        <span style="position:absolute; left:65px; top:20px; font-size: 24px; line-height: 40px; font-weight: 800;"> 服务稳定</span>
        <span style="position:absolute; left:65px; top:80px; font-size: 18px; line-height: 40px; text-align: left;">依托百度云技术实力，提供高可靠性、弹性可伸缩、高并发承载的文字识别服务，服务可用性高达99.99%</span>
        
      </div>
      <div style="text-align:center; font-size:30px">使用方式</div>
      <div class="mid_left" >
        <img src="./icon/homeicon3.png" alt="" style="position:absolute; left:20px; top:20px; height: 40px;width: 40px;">
        <span style="position:absolute; left:65px; top:20px; font-size: 24px; line-height: 40px; font-weight: 800;"> 云端服务</span>
        <span style="position:absolute; left:65px; top:80px; font-size: 18px; line-height: 40px; text-align: left;">提供各类文字识别的云端Paas服务接口，用户可直接调用API或使用SDK对图片中的文字进行识别</span>
      </div>
      <div class="mid_right">
        <img src="./icon/homeicon4.png" alt="" style="position:absolute; left:20px; top:20px; height: 40px;width: 40px;">
        <span style="position:absolute; left:65px; top:20px; font-size: 24px; line-height: 40px; font-weight: 800;"> 服务稳定</span>
        <span style="position:absolute; left:65px; top:80px; font-size: 18px; line-height: 40px; text-align: left;">部署至客户本地服务器，在客户内网中实现文字识别功能，保障数据私密性，提供一体机和软件部署包两种私有化方案</span>
        
      </div>

  
    </div>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      imgList: [
        { id: 0, idView: require("./icon/home1.jpg") },
        { id: 1, idView: require("./icon/home2.jpg") },
        { id: 2, idView: require("./icon/home3.jpg") },
        { id: 3, idView: require("./icon/home4.jpg") },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>
  
  <style  scoped>
.header {
  min-width: 1240px;
  /* background-color: rgb(94, 105, 211); */
  padding: 0 !important;
  height: 80px;
  border-bottom: 3px solid #000;
}

.top {
  margin: 0 auto;
  width: 1240px;
  color: #000000;
  font-weight: 800;
  line-height: 80px;
  font-size: 24px;
  /* background-color: pink; */
}

.top img {
  float: left;
  height: 80px;
}

.tab li {
  list-style: none;
  float: left;
  width: 180px;
  font-size: 20px;
  color: #333333;
  height: 60px;
  margin: 5px auto;
}
.tab li:hover {
  border-bottom: 3px solid rgb(28, 29, 102);
  cursor: pointer;
}
.mid {
  width: 90%;
  /* height: 80vh; */
  margin: 10px auto;
  min-width: 1000px;
  max-width: 1200px;
  /* background-color: rgb(241, 212, 235); */
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.select {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
}
.mid_left{
  width:50%;
  float: left;
  position: relative;
  height: 200px;
  /* background-color: rgb(131, 74, 74); */
}
.mid_right{
  width:50%;
  float: left;
  position: relative;
  height: 200px;
  /* background-color: rgb(214, 173, 173); */
}
</style>
  