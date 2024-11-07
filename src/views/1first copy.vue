<template>
  <div class="first">
    <el-header><div class="top">单据识别系统</div></el-header>
    <div class="mid">
      <h2 style="text-align: left">总体进度: 票据识别</h2>
      <el-progress
        class="progress"
        :text-inside="true"
        :stroke-width="26"
        :percentage="percentage"
      ></el-progress>
      <div class="left">
        <img
          id="fileimg"
          @click="onshowfile"
          style="height: 75%"
          src="./icon/发票管理.png"
          alt=""
        />

        <div class="bottom">
          <el-button style="float: left" @click="tozero()">上一步</el-button>
          <input type="file" @change="getimgs(this)" name="" id="gfile" />
          <el-button
            type="primary"
            v-loading.fullscreen.lock="fullscreenLoading"
            @click="sendImg"
            >发送</el-button
          >
          <el-button
            type="primary"
            style="float: right; margin-right: 10px"
            @click="tosecond()"
            >下一步</el-button
          >
        </div>
      </div>
      <div class="right">
        <div class="rtitle">通用发票-识别结果</div>
        <div v-if="!this.show" class="rresult">
          <span style="font-size: 16px">等待识别</span>
        </div>
        <div v-if="this.show" class="rresult">
          <span style="font-size: 16px">共有{{ resultnum }}类</span>
          <json-viewer
            :value="chresult"
            copyable
            theme="my-awesome-json-theme"
          ></json-viewer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import JsonViewer from "vue-json-viewer";
export default {
  components: {
    JsonViewer,
  },

  data() {
    return {
      percentage: "25",
      access_token: "",
      base64: "",
      resultnum: "",
      result: {},
      chresult:{},
      fullscreenLoading: false,
      show: false,
    };
  },
  mounted() {},
  created() {
    console.log(this.$route.query.type);
    console.log(localStorage.getItem("result") == undefined);
  },
  methods: {
    test() {},
    async getState() {
      let res = await this.$http.post(
        `/oauth/2.0/token?grant_type=client_credentials&client_id=VGSpt2vCVd3psfFIxXojan4U&client_secret=qMzC73ImEzH3UspvTaA1bGBgEdgCwu2u`
      );
      // console.log(res);
      localStorage.access_token = res.data.access_token;
      console.log(this.access_token);
    },
    async sendImg() {
      this.openFullScreen1();
      this.getState();
      let formData = new FormData();
      formData.append("image", this.base64);
      await this.$http
        .post(
          `/rest/2.0/ocr/v1/invoice?access_token=${localStorage.access_token}`,
          formData
        )
        .then((res) => {
          console.log(res);
          const h = this.$createElement;
          if (res.data.error_code !== undefined) {
            this.$message({
              message: h("p", null, [
                h(
                  "i",
                  { style: "color: red" },
                  "错误码为" + res.data.error_msg
                ),
              ]),
              type: "error",
            });
          } else {
            console.log(res.data.words_result);
            this.$message({
              message: h("p", null, [
                h("i", { style: "color: green" }, "识别成功"),
              ]),
              type: "success",
            });
            this.result = res.data.words_result;
            res.data.words_result.type = this.$route.query.type;
            this.chresult.价税合计小写 = res.data.words_result.AmountInFiguers;
            this.chresult.价税合计大写 = res.data.words_result.AmountInWords;
            this.chresult.校验码 = res.data.words_result.CheckCode;
            this.chresult.货物名称 = res.data.words_result.CommodityName;
            this.chresult.数量 = res.data.words_result.CommodityNum;
            this.chresult.单价 = res.data.words_result.CommodityPrice;
            this.chresult.单位 = res.data.words_result.CommodityUnit;
            this.chresult.发票代码 = res.data.words_result.InvoiceCode;
            this.chresult.开票日期 = res.data.words_result.InvoiceDate;
            this.chresult.发票号码 = res.data.words_result.InvoiceNum;
            this.chresult.发票种类 = res.data.words_result.InvoiceType;
            this.chresult.机打号码 = res.data.words_result.MachineNum;
            this.chresult.购方名称 = res.data.words_result.PurchaserName;
            this.chresult.省份 = res.data.words_result.Province;
            this.chresult.购方纳税人识别号 = res.data.words_result.PurchaserRegisterNum;
            this.chresult.销售方名称 = res.data.words_result.SellerName;
            this.chresult.销售方纳税人识别号 = res.data.words_result.SellerRegisterNum;
            this.chresult.联次信息 = res.data.words_result.SheetNum;
            this.chresult.类型 = this.$route.query.type;
            this.chresult.合计税额 = this.$route.query.TotalTax;

            // this.resultnum = res.data.words_result_num;
            this.resultnum = 20;
            this.show = true;

            if (localStorage.getItem("result") == undefined) {
              let result = [];
              result.push(res.data.words_result);
              localStorage.setItem("result", JSON.stringify(result));
              console.log(localStorage.getItem("result"));
            } else {
              let be = JSON.parse(localStorage.getItem("result"));
              console.log(be);
              be.push(res.data.words_result);
              localStorage.setItem("result", JSON.stringify(be));
              console.log(localStorage.getItem("result"));
            }
          }
        });
    },
    openFullScreen1() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
    },
    onshowfile() {
      document.querySelector("#gfile").click();
    },
    getimgs() {
      let file = document.querySelector("#gfile").files[0];
      let reader = new FileReader();
      let imgFile;
      if (file != undefined && file.type === "image/jpeg") {
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          imgFile = e.target.result;
          let arr = imgFile.split(",");
          let base64 = `data:image/png;base64,${arr[1]}`;
          this.base64 = base64;
          // console.log(this.base64);
          document.querySelector("#fileimg").src = base64;
        };
      }
    },
    tozero() {
      this.$router.push("/zero");
    },
    tosecond() {
      this.$router.push("/second");
    },
  },
};
</script>

<style  scoped>
.el-header {
  padding: 0 !important;
}
.top {
  color: #fffffe;
  height: 50px;
  font-weight: 800;
  line-height: 50px;
  font-size: 26px;
  background-color: rgb(0, 22, 221);
}

#fileimg {
  cursor: pointer;
  border: 2px solid grey;
  border-radius: 20px;
  background-color: #e4e4e4;
}
.mid {
  width: 90%;
  height: 80vh;
  margin: 10px auto;
  min-width: 1000px;
  background-color: rgb(241, 212, 235);
}
.progress {
  margin-bottom: 10px;
}
.left {
  float: left;
  width: 70%;
  height: 100%;
  background-color: #eed2d2;
}
.bottom {
  margin-top: 20px;
}
.right {
  float: left;
  width: 30%;
  height: 100%;
  border-left: 5px solid rgb(151, 148, 148);
  padding-left: 5px;
  /* background-color: rgb(199, 144, 144); */
}
.rtitle {
  font-size: 20px;
  border-bottom: 2px solid rgb(85, 81, 81);
  margin-bottom: 10px;
  /* text-align: left !important; */
}
/deep/.jv-node {
  text-align: left !important;
  font-size: 16px;
}
/deep/.el-dialog {
  width: 90%;
  overflow: auto;
}
</style>
