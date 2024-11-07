<template>
  <div class="main">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="结果汇总" name="forth">
        <span style="float: left; font-size: 18px; font-weight: 800"
          >结果汇总</span
        >
        <div>
          <el-button
            type="primary"
            style="float: right"
            @click="exportExcel_all_result()"
          >
            导出成excel
          </el-button>
        </div>
        <el-table id="out-table-result" :data="all_result">
          <el-table-column property="type" label="类型"></el-table-column>
          <el-table-column property="date" label="发票日期"></el-table-column>
          <el-table-column  label="发票描述">
            <template slot-scope="scope">
              <ul v-if="scope.row.type == '火车票据' ">
                <li>
                  {{ scope.row.des}}
                </li>
              </ul>
              <ul v-if="scope.row.type == '出租票据' ">
                <li>
                  {{ scope.row.des}}
                </li>
              </ul>
              <ul v-if="scope.row.type !== '火车票据' && scope.row.type !== '出租票据' ">
                <li
                  v-for="item in scope.row.des"
                  :key="'单项总价' + item.word"
                >
                  {{ item.word }}
                </li>
              </ul>
            </template>

          </el-table-column>
          <el-table-column property="fare" label="总价"></el-table-column>
          <el-table-column property="fare1" label="总价"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="通用发票、增值税发票结果" name="first">
        <div style="font-size: 18px; font-weight: 800">
          <span style="float: left">通用发票、增值税发票结果(1&2)</span>
          <div>
            <el-button
              type="primary"
              style="float: right"
              @click="exportExcel()"
            >
              导出成excel
            </el-button>
          </div>
        </div>
        <el-table id="out-table" :data="result">
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
          <!-- <el-table-column label="数量">
            <template slot-scope="scope">
              <ul>
                <li
                  v-for="item in scope.row.CommodityNum"
                  :key="item.word"
                >
                  {{ item.word }}
                </li>
              </ul>
            </template>
          </el-table-column> -->

          <el-table-column label="税额">
            <template slot-scope="scope">
              <ul>
                <li
                  v-for="item in scope.row.CommodityTax"
                  :key="'税额' + item.word"
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
          <el-table-column
            property="TotalAmount"
            label="商品总价"
          ></el-table-column>
          <el-table-column property="TotalTax" label="税额"></el-table-column>

          <!-- <el-table-column property="CommodityAmount[1].word" label="税额">
        
      </el-table-column> -->

          <el-table-column
            property="AmountInWords"
            label="总金额（大）"
          ></el-table-column>
          <el-table-column
            property="AmountInFiguers"
            label="总金额（小）"
          ></el-table-column>
          <!-- <el-table-column property="num" label="总金额（小）"></el-table-column>
      <el-table-column property="name" label="总金额（小）"></el-table-column> -->
        </el-table>
      </el-tab-pane>
      <el-tab-pane label=" 火车票结果" name="second">
        <div style="font-size: 18px; font-weight: 800">
          <span style="float: left">火车票结果(3)</span>
          <div>
            <el-button
              type="primary"
              style="float: right"
              @click="exportExcel2()"
            >
              导出成excel
            </el-button>
          </div>
        </div>

        <el-table id="out-table2" :data="result2">
          <el-table-column
            property="ticket_num"
            label="车票号"
          ></el-table-column>
          <el-table-column
            property="starting_station"
            label="始发站"
          ></el-table-column>
          <el-table-column
            property="train_num"
            label="车次号"
          ></el-table-column>
          <el-table-column
            property="destination_station"
            label="到达站"
          ></el-table-column>
          <el-table-column property="date" label="出发日期"></el-table-column>
          <el-table-column
            property="ticket_rates"
            label="车票金额"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="出租车票结果" name="third">
        <span style="float: left; font-size: 18px; font-weight: 800"
          >出租车票结果(4)</span
        >
        <div>
          <el-button
            type="primary"
            style="float: right"
            @click="exportExcel3()"
          >
            导出成excel
          </el-button>
        </div>
        <el-table id="out-table3" :data="result3">
          <el-table-column
            property="InvoiceCode"
            label="发票代码"
          ></el-table-column>
          <el-table-column
            property="InvoiceNum"
            label="发票号码"
          ></el-table-column>
          <el-table-column property="City" label="城市"></el-table-column>
          <el-table-column property="Distance" label="距离"></el-table-column>
          <el-table-column property="Date" label="发票日期"></el-table-column>
          <el-table-column property="TotalFare" label="总价"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  data() {
    return {
      // result: [],
      activeName: "forth",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    sumresult() {
      this.all_result = [];
      for (let i = 0; i < this.result2.length; i++) {
        let sum = {};
        sum.type = "火车票据";
        sum.date = this.result2[i].date;
        sum.fare = this.result2[i].ticket_rates;
        sum.fare1 = this.result2[i].ticket_rates;
        sum.des =
          this.result2[i].train_num +
          this.result2[i].starting_station +
          "至" +
          this.result2[i].destination_station;
        console.log(sum);
        this.all_result.push(sum);
      }
      for (let i = 0; i < this.result3.length; i++) {
        let sum = {};
        sum.type = "出租票据";
        sum.date = this.result3[i].Date;
        sum.fare = this.result3[i].TotalFare;
        sum.fare1 = this.result3[i].TotalFare;
        sum.des =
          this.result3[i].TaxiNum +
          this.result3[i].Distance +
          this.result3[i].Time;
        console.log(sum);
        this.all_result.push(sum);
      }
      for (let i = 0; i < this.result.length; i++) {
        let sum = {};
        sum.type = this.result[i].InvoiceType;
        sum.date = this.result[i].InvoiceDate;
        sum.fare = this.result[i].AmountInFiguers;
        sum.fare1 = this.result[i].AmountInWords;
        // var sumdes = document.querySelector('#sumdes');
        // console.log(sumdes)
        sum.des = this.result[i].CommodityName;
        console.log(sum);
        this.all_result.push(sum);
      }
      console.log(this.all_result);
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
          "bill_plantform_" + time + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    exportExcel2() {
      var xlsxParam = { raw: true };
      var time = this.nowtime();
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(
        document.querySelector("#out-table2"),
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
          "bill_plantform_" + time + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    exportExcel3() {
      var xlsxParam = { raw: true };
      var time = this.nowtime();
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(
        document.querySelector("#out-table3"),
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
          "bill_plantform_" + time + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    exportExcel_all_result() {
      var xlsxParam = { raw: true };
      var time = this.nowtime();
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(
        document.querySelector("#out-table-result"),
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
          "bill_plantform_" + time + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
  },
  created() {
    this.result = JSON.parse(localStorage.getItem("result"));
    this.result2 = JSON.parse(localStorage.getItem("result2"));
    this.result3 = JSON.parse(localStorage.getItem("result3"));
    console.log(toString(this.result.length));
    console.log(toString(this.result2.length));
    console.log(toString(this.result3.length));
    this.sumresult();
    // return this.all_result;
  },
  mounted() {},
};
</script>
<style scoped>
.main {
  width: 90%;
  height: 80vh;
}
#out-table {
  margin: 20px 0;
}
#out-table2 {
  margin: 20px 0;
}
</style>