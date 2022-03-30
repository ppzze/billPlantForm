<template>
<div class = "work">
    <div class="WorkTitle2">
        <div class="WorkTitleImg2">
            <img src="./img/logo.png" alt="">
        </div>
        <div class="WorkTitleName2">
            充&nbsp;电&nbsp;站&nbsp;1&nbsp;号&nbsp;流&nbsp;水&nbsp;线&nbsp;1&nbsp;号&nbsp;工&nbsp;位
        </div>
        <div class = "WorkTitleRight">
            
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
                    <li class="success"><i class="el-icon-success"></i>使用电动螺丝刀3拧螺丝</li>
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
  border-image: linear-gradient(to right, #3356bb, #6caacc) 1;
}
.work .WorkTitleRight{
    width: 150px;
    height: 80px;
    float: right;
    background-color: white;  ;
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
  background:#1E1E24;
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