<template>
  <div class="main">
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
          <li>首页</li>
          <li>使用说明</li>
          <li>联系我们</li>
          <li>开始使用</li>
          <li>更多</li>
        </ul>
      </div>
    </div>

    <div class="mid">
      <div>
        <el-steps
        :active="3"
        finish-status="success"
        simple
        style="margin: 20px"
      >
        <el-step title="项目选择"></el-step>
        <el-step title="票据识别"></el-step>
        <el-step title="识别结果"></el-step>
        <el-step title="生成报销单"></el-step>
      </el-steps>
      </div>
      <el-table id="out-table" :data="tablelist">
        <el-table-column property="type" label="项目类型"></el-table-column>
        <el-table-column property="fare" label="金额"></el-table-column>
        <el-table-column property="num" label="张数"></el-table-column>
      </el-table>
      <div>
        <el-button style="float: left" @click="tosecond()">上一步</el-button>
        <el-button type="primary" style="float: right" @click="exportExcel()">
          导出成excel
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  data() {
    return {
      percentage: 100,
      dispatch_list: [],
      all_result: [],
      tablelist: [],
    };
  },
  methods: {
    tosecond() {
      this.$router.push("/second");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    sumresult() {
      this.all_result = [];

      function groupBy(objectArray, property) {
        return objectArray.reduce(function (acc, obj) {
          let key = obj[property];
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(obj);
          return acc;
        }, {});
      }

      this.all_result = groupBy(this.dispatch_list, "type");

      for (let i = 0; i < 16; i++) {
        if (this.all_result[i] !== undefined) {
          this.all_result[i].num = this.all_result[i].length;
          this.all_result[i].fare = 0;
          for (let j = 0; j < this.all_result[i].length; j++) {
            this.all_result[i].fare += parseFloat(this.all_result[i][j].fare);
          }
        }
      }
      this.tablelist = [];
      for (let i = 0; i < 16; i++) {
        if (this.all_result[i] !== undefined) {
          var list = {};
          if(i==1)
          {
          list.type = '办公费';
          }
          else if(i==2)
          {
          list.type = '印刷费';
          }
          else if(i==3)
          {
          list.type = '咨询费';
          }
          else if(i==4)
          {
          list.type = '手续费';
          }
          else if(i==5)
          {
          list.type = '水电费';
          }
          else if(i==6)
          {
          list.type = '邮电费';
          }
          else if(i==7)
          {
          list.type = '物业管理费';
          }
          else if(i==8)
          {
          list.type = '差旅费';
          }
          else if(i==9)
          {
          list.type = '维修费';
          }
          else if(i==10)
          {
          list.type = '租赁费';
          }
          else if(i==11)
          {
          list.type = '会议费';
          }
          else if(i==12)
          {
          list.type = '培训费';
          }
          else if(i==13)
          {
          list.type = '公务接待费';
          }
          else if(i==14)
          {
          list.type = '专用材料费';
          }
          else if(i==15)
          {
          list.type = '公务用车费';
          }
          else if(i==16)
          {
          list.type = '其他交通费';
          }
          else
          {
          list.type = '其他';
          }

          list.num = this.all_result[i].num;
          list.fare = this.all_result[i].fare;
          this.tablelist.push(list);
        }
      }
      console.log("all_result", this.all_result);
    },
    nowtime() {
      var date = new Date(); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    exportExcel() {
      var xlsxParam = { raw: true };
      var time = this.nowtime();
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(
        document.querySelector("#out-table"),
        xlsxParam
      );
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "bill_plantform_dispatch" + time + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
  },
  created() {
    setTimeout(() => {
      this.dispatch_list = JSON.parse(localStorage.getItem("dispatch_list"));
      console.log(this.dispatch_list);
      this.sumresult();
      // return this.all_result;
    }, 1000);
  },
  mounted() {},
};
</script>
<style scoped>
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

#out-table {
  margin: 20px 0;
}
#out-table2 {
  margin: 20px 0;
}
</style>