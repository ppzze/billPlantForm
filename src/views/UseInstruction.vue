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
   
    <div class="mid">
   
      <div style="text-align:center; font-size:30px">使用步骤</div>
      <div class="mid_left" >
        <img src="./icon/instruction1.png" alt="" style="position:absolute; left:20px; top:20px; height: 50px;width: 50px;">
        <span style="position:absolute; left:75px; top:20px; font-size: 24px; line-height: 50px; font-weight: 800; color: #4472C4;"> 项目选择</span>
        <span style="position:absolute; left:75px; top:80px; font-size: 18px; line-height: 50px; text-align: left;">首先，根据《关于实施中央预算单位公务卡强制结算目录的通知》规定，从14种类型中选取所要报销的票据类型。</span>
      </div>
      <div class="mid_right">
      
      </div>

      <div class="mid_left" >
    
      </div>
      <div class="mid_right">
        <img src="./icon/instruction2.png" alt="" style="position:absolute; left:20px; top:20px; height: 50px;width: 50px;">
        <span style="position:absolute;left:75px; top:20px; font-size: 24px; line-height: 50px;  font-weight: 800;color: #4472C4;"> 票据识别</span>
        <span style="position:absolute; left:75px; top:80px; font-size: 18px; line-height: 40px; text-align: left;">其次，上传所要识别的发票图片（包含增值税发票、出租车发票、火车票等），图片上限是8张。</span>
        
      </div>
      <div class="mid_left" >
        <img src="./icon/instruction3.png" alt="" style="position:absolute; left:20px; top:20px; height: 50px;width: 50px;">
        <span style="position:absolute; left:75px; top:20px; font-size: 24px; line-height: 50px; font-weight: 800; color: #4472C4;"> 识别结果</span>
        <span style="position:absolute; left:75px; top:80px; font-size: 18px; line-height: 50px; text-align: left;">接着，识别结果将以表格的形式展示，可以对发票按类别筛选、排序，以及以Excel的形式导出。</span>
      </div>
      <div class="mid_right">
      
      </div>
      <div class="mid_left" >
    
  </div>
  <div class="mid_right">
    <img src="./icon/instruction4.png" alt="" style="position:absolute; left:20px; top:20px; height: 50px;width: 50px;">
    <span style="position:absolute;left:75px; top:20px; font-size: 24px; line-height: 50px;  font-weight: 800;color: #4472C4;"> 报销单生成</span>
    <span style="position:absolute; left:75px; top:80px; font-size: 18px; line-height: 40px; text-align: left;">最后，将按照识别结果自动生成报销单，同样可以按类别筛选、排序，以及以Excel的形式导出。</span>
    
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
  