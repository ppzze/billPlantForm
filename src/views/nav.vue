<template>
  <el-container>
    <el-header><div class="top">单据识别系统</div></el-header>
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-col>
            <el-menu
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              router
            >
              <el-menu-item index="/first">
                <i class="el-icon-location"></i>
                <span>1.通用发票</span>
              </el-menu-item>
              <el-menu-item index="/second">
                <i class="el-icon-menu"></i>
                <span>2.增值税发票</span>
              </el-menu-item>
              <el-menu-item index="/third">
                <i class="el-icon-tickets"></i>
                <span>3.火车发票</span>
              </el-menu-item>
              <el-menu-item index="/forth">
                <i class="el-icon-document-remove"></i>
                <span>4.出租车发票</span>
              </el-menu-item>
              <el-menu-item index="/result">
                <i class="el-icon-folder-checked"></i>
                <span>结果汇总</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-main>
          <div class="tip">目前只支持PNG、JPG类型票据的识别,结果在“结果汇总”</div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style scoped>
.top {
  height: 50px;
  font-weight: 800;
  line-height: 50px;
  font-size: 26px;
  background-color: rgb(118, 134, 224);
}
.tip {
  font-size: 18px;
  font-weight: 800;
  text-align: left;
  margin-bottom: 20px;
  border-bottom: 4px solid #000;
}
</style>