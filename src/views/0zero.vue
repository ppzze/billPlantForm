<template>
  <div class="first">
    <div class="header">
      <div class="top">
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
          <li @click="push('HomePage')" >首页</li>
          
          <li>使用说明</li>
          <li>联系我们</li>
          <li>开始使用</li>
          <li>更多</li>
        </ul>
      </div>
    </div>
    <div class="mid">
      <el-steps
        :active="0"
        finish-status="success"
        simple
        style="margin: 20px"
      >
        <el-step title="项目选择"></el-step>
        <el-step title="票据识别"></el-step>
        <el-step title="识别结果"></el-step>
        <el-step title="生成报销单"></el-step>
      </el-steps>

      <span style="font-size: 18px; font-weight: 800">
        根据《关于实施中央预算单位公务卡强制结算目录的通知》（财库〔2011〕160号）规定，凡强制目录规定的公务支出，应按规定使用公务卡结算，原则上不再使用现金结算。科研项目中小额材料费和测试化验加工费等，需按规定实行公务卡结算。
      </span>
      <div class="select" style="margin: 30px auto; ">
        <span>请选择项目类型</span>
        <el-select v-model="type" placeholder="请选择" style="margin: 0 20px">
          <el-option
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.value
            }}</span>
          </el-option>
        </el-select>
        <el-button type="primary" @click="tofirst()">下一步</el-button>
      </div>

      <div>
        <!-- <img src="../static/zero.png" alt="" />
         -->
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column prop="order" label="序号" width="300px">
          </el-table-column>
          <el-table-column prop="item" label="公务卡结算项目" width="300px">
          </el-table-column>
          <el-table-column prop="remark" label="备注"> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // activeName: "second",
      percentage: 0,
      tableData: [
        {
          order: "1",
          item: "办公费",
          remark: "指单位购买按财务会计制度规定不符合固定资产确认标准的日常办公用品、书报杂志等支出。",
        },
        {
          order: "2",
          item: "印刷费",
          remark: "指单位的印刷费支出。",
        },
        {
          order: "3",
          item: "咨询费",
          remark: "指单位咨询方面的支出。",
        },
        {
          order: "4",
          item: "手续费",
          remark: "指单位支付的手续费支出。",
        },
        {
          order: "5",
          item: "水电费",
          remark: "指单位支付的水电费支出。",
        },
        {
          order: "6",
          item: "邮电费",
          remark: "指单位开支的电话费、电报费、传真费、网络通讯费等支出。",
        },
        {
          order: "7",
          item: "物业管理费",
          remark: "指单位开支的办公用房、职工及离退休人员宿舍等的物业管理费，包括综合治理、绿化、卫生等方面的支出。",
        },
        {
          order: "8",
          item: "差旅费",
          remark: "指单位工作人员因出差支付的住宿费、购买机票支出等。",
        },
        {
          order: "9",
          item: "维修(护)费",
          remark: "指单位日常开支的固定资产(不包括车船等交通工具)修理和维护费用，网络信息系统运行与维护费用。",
        },
        {
          order: "10",
          item: "租赁费",
          remark: "指租赁办公用房、宿舍、专用通讯网以及其他设备等方面的费用。",
        },
        {
          order: "11",
          item: "会议费",
          remark: "指会议中按规定开支的房租费、伙食补助费以及文件资料的印刷费、会议场地租用费等。",
        },
        {
          order: "12",
          item: "培训费",
          remark: "指各类培训支出。",
        },
        {
          order: "13",
          item: "公务接待费",
          remark: "指单位按规定开支的各类公务接待(含外宾接待)费用。",
        },
        {
          order: "14",
          item: "专用材料费",
          remark: "指单位购买日常专用材料的支出。具体包括药品及医疗耗材，农用材料兽医用品，实验室用品，专用服装，消耗性体育用品，专用工具和仪器艺术部门专用材料和用品，广播电视台发射台发射机的电力、材料等方面的支出。",
        },
       
      ],
      cities: [
        {
          value: "1",
          label: "办公费",
        },
        {
          value: "2",
          label: "印刷费",
        },
        {
          value: "3",
          label: "咨询费",
        },
        {
          value: "4",
          label: "手续费",
        },
        {
          value: "5",
          label: "水电费",
        },
        {
          value: "6",
          label: "邮电费",
        },
        {
          value: "7",
          label: "物业管理费",
        },
        {
          value: "8",
          label: "差旅费",
        },
        {
          value: "9",
          label: "维修费",
        },
        {
          value: "10",
          label: "租赁费",
        },
        {
          value: "11",
          label: "会议费",
        },
        {
          value: "12",
          label: "培训费",
        },
        {
          value: "13",
          label: "公务接待费",
        },
        {
          value: "14",
          label: "专用材料费",
        },
      ],
      type: "",
    };
  },
  created() {},
  methods: {
    push(router){
      this.$router.push(router)
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    tofirst() {
      if (this.type !== "") {
        this.$router.push({
          name: "first",
          query: {
            type: this.type,
          },
        });
      } else {
        this.$message.error("项目类型不能为空！");
      }
    },
  },
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

.progress {
  margin-bottom: 10px;
}

.select {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
}
</style>
