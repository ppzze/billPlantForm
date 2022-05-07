<template>
  <div class="spotCheck">
    <div class="title">
      <div class="title_img">
        <img src="./img/logo.png" alt="" />
      </div>
      <div class="title_name">产&nbsp;线&nbsp;操&nbsp;作&nbsp;系&nbsp;统</div>
      <div class="title_right">
        <div class="title_rightOne">
          <div class="title_staff">
            <span>点检工位：</span>{{ positionName }}
          </div>
        </div>
        <div class="title_rightTwo">
          <div class="title_rightTwoWord">
            <span>点检人：</span>{{ userName }}
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="num">点检项目数量{{ checkCount }}</div>
      <div class="check_left">
        <!-- :key="item.checkRuleId" v-for="item in itemList" -->
        <ul class="list">
          <li :key="item.checkRuleId" v-for="item in itemList">
            <div class="list_title">
              {{ item.content }}
            </div>
            <div class="list_result">
              <span>检测结果：</span>
              <el-input
                v-if="item.type == 'RESULT'"
                v-model="item.checkResult"
              ></el-input>
              <el-radio-group
                v-if="item.type == 'VALUE_SCOPE'"
                v-model="item.checkResult"
              >
                <el-radio label="PASS">PASS</el-radio>
                <el-radio label="NG">NG</el-radio>
              </el-radio-group>
            </div>
          </li>
        </ul>
      </div>
      <div class="check_right">
        <ul id="list">
          <li
            class="check_data"
            :class="index == nowData ? 'now' : ''"
            :key="index"
            v-for="(item, index) in checklist"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <div class="submit">
      <el-button type="primary" @click="dialogVisible = true">提交</el-button>
    </div>
    <el-dialog
      title="点检设备"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div class="dia_title">
        <i
          class="el-icon-warning"
          style="color:yellow,font-size:20px,font-weight:800"
        ></i>
        <span>是否有质量问题上报</span>
      </div>
      <div class="dia_des">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 10 }"
          placeholder="问题描述"
          v-model="describe"
        >
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="(dialogVisible = false), getrecordList()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "spotCheck",
  data() {
    return {
      checkCount: "",
      positionName: "",
      userName: "",
      itemList: [
        {
          checkRuleId: "11",
          content: "请检测 ",
          equipmentId: "2",
          type: "RESULT",
        }
      ],
      // checkResult: "",
      checklist: [],
      nowData: "",
      dialogVisible: false,
      describe: "",
      recordList: [],
    };
  },
  methods: {
    async checkEquipment() {
      var userId = localStorage.userId.split("#")[1]
      let res = await this.$http.get(
        `proline/station/checkEquipment?positionId=${localStorage.positionId}&userId=${userId}`
      );
      if (res.data.code == 20000) {
        this.checkCount = res.data.data.checkCount;
        this.positionName = res.data.data.positionName;
        this.userName = res.data.data.userName;
        this.itemList = res.data.data.itemList;
        for (var i = 0; i < this.itemList.length; i++) {
          this.itemList[i].checkResult = "";
        }
        console.log("##", this.itemList);
      }
    },
    async listCheckData() {
      let res = await this.$http.get(
        `/proline/station/listCheckData?positionId=${localStorage.positionId}`
      );
      this.nowData = res.data.data.length - 1;
      // console.log(this.nowData);
      if (res.data.code == 20000) {
        this.checklist = res.data.data;
      }
      setTimeout(this.handleScroll(), 500);
    },
    handleScroll() {
      document.getElementById("list").scrollTop = 100000;
    },
    //获取提交的设备列表 ,生成this.recordList
    getrecordList() {
      this.recordList = [];
      for (var i = 0; i < this.itemList.length; i++) {
        var list = {};
        list.checkRuleId = this.itemList[i].checkRuleId;
        list.equipmentId = this.itemList[i].equipmentId;
        list.value = this.itemList[i].checkResult.tostring();
        list.content = this.itemList[i].content;
        this.recordList.push(list);
      }
      console.log(this.recordList)
      setTimeout(async () => {await this.commitCheckRecord()}, 500);
    },
    async commitCheckRecord() {
      console.log('我是提交结果',this.recordList)
      if(this.describe == '')
      {
        this.describe = '暂无'
      }
      let res = await this.$http.post(`/proline/station/commitCheckRecord`, {
        checkStaffId: localStorage.userId,
        positionId: localStorage.positionId,
        remarks: this.describe,
        recordList: this.recordList,
      });
      console.log(res)
      if (res.code == 20000) {
        this.$message({
          showClose: true,
          message: "提交成功",
          type: "success",
        });
        this.$router.push({ path: "/work" });
      }
      this.describe = "";
    },

    // dialog模块开始
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
  },
  mounted() {
    this.checkEquipment();
    setInterval(() => {
      this.listCheckData();
    }, 2000);
  },
};
</script>

<style  scoped >
.spotCheck {
  height: 100vh;
}
.spotCheck .title {
  margin: 0 auto;
  width: 96%;
  height: 80px;
  border-bottom: 2px solid #767676;
}
.spotCheck .MainContent2 {
  /* width: 96%; */
  height: 700px;
  min-height: 700px;
  position: absolute;
  /* background-color: red; */
}
.spotCheck .title .title_img {
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
.spotCheck .title .title_img img {
  width: 100%;
  height: 100%;
}
.spotCheck .title .title_name {
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
.spotCheck .title .title_right {
  width: 480px;
  height: 80px;
  float: right;
  color: white;
  font-size: 23px;
}
.spotCheck .title .title_right .title_rightOne {
  float: left;
  height: 80px;
}
.spotCheck .title .title_right .title_rightOne img {
  /* display: block; */
  /* height: 80px; */
  padding: 30px 0 0 0;
  padding-left: 15px;
  float: left;
}
.spotCheck .title .title_right .title_rightOne .title_staff {
  float: left;
  height: 80px;
  top: 20px;
  padding: 30px 0 0 20px;
  color: white;
  font-size: 23px;
}
.spotCheck .title .title_right .title_rightTwo {
  float: left;
  height: 80px;
}
.spotCheck .title .title_right .title_rightTwo img {
  padding: 30px 0 0 0;
  padding-left: 15px;
  float: left;
}
.spotCheck .title_right .title_rightTwo .title_rightTwoWord {
  float: left;
  height: 80px;
  top: 20px;
  padding: 30px 0 0 20px;
  color: white;
  font-size: 23px;
}
.main {
  margin: 0 auto;
  width: 90%;
  height: calc(90vh - 100px);
  /* background-color: red; */
}
.main .num {
  border: 2px solid black;
  width: 200px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  color: white;
}
.main .check_left {
  float: left;
  width: 50%;
  height: calc(100% - 50px);
  /* color:white; */
  background-color: gray;
}
.main .check_right {
  float: left;
  width: 50%;
  height: calc(100% - 50px);

  background-color: white;
}
.list {
  height: 100%;
  overflow: auto;
}
.list .list_title {
  margin: 5px 0;
  text-align: left;
  /* background-color: rgb(164, 180, 199); */
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}
.list .list_result {
  text-align: left;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  /* background-color: #fff; */
}
.list .list_result .el-input {
  width: 50%;
}
.check_right ul {
  height: 100%;
  overflow: auto;
}
.check_data {
  height: 40px;
  text-align: left;
  font-size: 18px;
}
.submit {
  width: 90%;
  height: 50px;
  margin: 0 auto;
  /* background-color: pink; */
}
.dia_title {
  width: 80%;
  height: 40px;
  font-size: 20px;
  font-weight: 800;
  text-align: left;
}
.el-icon-warning {
  color: rgb(230, 104, 21);
}
</style>
