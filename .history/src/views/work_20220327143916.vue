<template>
<div class = "work">
    <div class="WorkTitle2">
      <div class="WorkTitleImg2">
        <img src="./img/logo.png" alt="">
      </div>
      <div class="WorkTitleName2">
        产&nbsp;线&nbsp;管&nbsp;理&nbsp;系&nbsp;统
      </div>
    </div>
    <div class="body">
        <div class="video">
        </div>
        <div class="process">
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
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
.work .body{
  background:red;
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
  padding-top:44px;
  padding-left:18px;
  padding-right:59px
}
.work .body .process ul{

}
</style>