<template>
  <div class="main">
    <div class="header">
      <div class="top">
        <img src="./icon/首页图标.png" alt="" />
        <span
          style="float: left;
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
        :active="2"
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
      <el-table id="out-table" height="70vh" :data="result">
        <el-table-column property="type"      :filters="[{text: '办公费', value: '1'}, {text: '印刷费', value: '2'}, {text: '咨询费', value: '3'}, {text: '手续费', value: '4'}, {text: '水电费', value: '5'}, {text: '邮电费', value: '6'}, {text: '物业管理费', value: '7'}, {text: '差旅费', value: '8'}, {text: '维修费', value: '9'}, {text: '租赁费', value: '10'},{text: '会议费', value: '11'},{text: '培训费', value: '12'}, {text: '公务接待费', value: '13'}, {text: '专用材料费', value: '14'}]"
      :filter-method="filterHandler"  label="财务类型"></el-table-column>
        <el-table-column
          property="InvoiceType"
          label="发票类型"
     
        ></el-table-column>
        <el-table-column
          property="InvoiceCode"
          label="发票代码"
        ></el-table-column>
        <el-table-column
          property="InvoiceNum"
          label="发票号码"
        ></el-table-column>
        <el-table-column
          property="InvoiceDate"
          label="发票日期"
          width="150px"
        ></el-table-column>
        <el-table-column label="商品信息" width="200px">
          <template slot-scope="scope">
            <ul id="sumdes">
              <li
                v-for="item in scope.row.CommodityName"
                :key="'信息' + item.word"
              >
                {{ item.word }}
              </li>
            </ul>
          </template>
        </el-table-column>

        <el-table-column label="单价" width="150px">
          <template slot-scope="scope">
            <ul>
              <li
                v-for="item in scope.row.CommodityPrice"
                :key="'单价' + item.word"
              >
                {{ item.word }}
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column label="单项金额">
          <template slot-scope="scope">
            <ul>
              <li
                v-for="item in scope.row.CommodityAmount"
                :key="'单项总价' + item.word"
              >
                {{ item.word }}
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column property="TotalTax" label="税额"></el-table-column>
        <el-table-column
          property="AmountInWords"
          label="总金额（大）"
        ></el-table-column>
        <el-table-column
          property="AmountInFiguers"
          label="总金额（小）"
        ></el-table-column>
      </el-table>
      <div>
        <el-button style="float: left" @click="tofirst()">上一步</el-button>
        <el-button type="primary" style="margin: 0 auto" @click="exportExcel()">
          导出成excel
        </el-button>
        <el-button style="float: right" type="primary" @click="tothird()"
          >下一步</el-button
        >
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
      percentage: 50,
    };
  },
  methods: {
    tofirst() {
      this.$router.push("/first");
    },
    tothird() {
      this.$router.push("/third");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
    dispatchList() {
      if (localStorage.removeItem("dispatch_list") !== undefined) {
        localStorage.removeItem("dispatch_list");
      }
      this.dispatch_list = [];
      for (let i = 0; i < this.result.length; i++) {
        let sum = {};
        sum.type = this.result[i].type;
        sum.fare = this.result[i].AmountInFiguers;
        console.log(sum);
        this.dispatch_list.push(sum);
      }
      localStorage.setItem("dispatch_list", JSON.stringify(this.dispatch_list));
      console.log(this.dispatch_list);
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
          "bill_plantform_result" + time + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
  },
  created() {
    this.result = JSON.parse(localStorage.getItem("result"));
    console.log(toString(this.result.length));

    // return this.all_result;
  },
  mounted() {},
  destroyed() {
    this.dispatchList();
    console.log("销毁");
  },
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