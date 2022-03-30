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
        <div class="video">
        </div>
        <div class="process">
                <ul>
                    <div> <i class="el-icon-success"></i>工序二</div>
                    <li><i class="el-icon-success"></i>使用电动螺丝刀1拧螺丝1</li>
                    <li class="doing"><i class="el-icon-success"></i>使用电动螺丝刀2拧螺丝2</li>
                    <li><i class="el-icon-success"></i>使用电动螺丝刀3拧螺丝</li>
                    <li><i class="el-icon-success"></i>使用电动螺丝刀4拧螺丝</li>
                    <li><i class="el-icon-success"></i>使用电动螺丝刀5拧螺丝</li>
                </ul>
                <ul>
                    <div class="undo"> <i class="el-icon-success"></i>工序三</div>
                    <li class="success"><i class="el-icon-success"></i>使用电动螺丝刀1拧螺丝1</li>
                    <li class="success"><i class="el-icon-success"></i>使用电动螺丝刀2拧螺丝2</li>
                    <li class="success"><i class="el-icon-success"><div style="border-radius:50%;width:30px;height:30px;color:white;background-color:red;">x</div></i>使用电动螺丝刀3拧螺丝</li>
                    <li class="doing"><i class="el-icon-success"></i>使用电动螺丝刀4拧螺丝</li>
                    <li><i class="el-icon-success"></i>使用电动螺丝刀5拧螺丝</li>
                </ul>
        </div> 
    </div> 
</div>   
</template>
<script>

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
.work .body .video{
 width:calc(100% - 364px);
 height: calc(96vh - 80px);
 background:pink;
 float:left;
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