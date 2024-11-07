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
          <li>首页</li>
          <li>使用说明</li>
          <li>联系我们</li>
          <li>开始使用</li>
          <li>更多</li>
        </ul>
      </div>
    </div>
    <div class="main">
      <div class="mid">
        <el-steps
          :active="1"
          finish-status="success"
          simple
          style="margin: 20px"
        >
          <el-step title="项目选择"></el-step>
          <el-step title="票据识别"></el-step>
          <el-step title="识别结果"></el-step>
          <el-step title="生成报销单"></el-step>
        </el-steps>
        <div class="left">
          <div class="bigimg">
            <img
              id="bigimg"
              style="height: 95%"
              src="./icon/发票管理.png"
              alt=""
            />
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              class="file"
              id="file"
              @change="changeImg"
            />
          </div>
          <div class="img_d" id="img_d" v-for="(v, i) in blogArr" :key="i">
            <div class="img-centent">
              <img :src="v.url" alt="" id="img" @click="bigimg(v.url)" />
            </div>
            <div class="del_d" @click="del(v, i)">
              <div class="del"></div>
            </div>
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
              :value="chresults"
              copyable
              theme="my-awesome-json-theme"
            ></json-viewer>
          </div>
        </div>
        <div>
          <el-button style="float: left" @click="tozero()">上一步</el-button>

          <el-button
            type="primary"
            v-loading.fullscreen.lock="fullscreenLoading"
            @click="recogImg"
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
    </div>
  </div>
</template>

<script>
import JsonViewer from "vue-json-viewer";

export default {
  components: {
    JsonViewer,
  },
  name: "upload",
  data() {
    return {
      uploadNum_Max: 8, //图片上传数量上限
      blogArr: [], //压缩对象
      base64: [],
      percentage: 25,
      fullscreenLoading: false,
      access_token: "",
      // base64: "",
      resultnum: "",
      result: {},
      chresults: [],
      chresult: {},
      show: false,
    };
  },
  methods: {
    tozero() {
      this.$router.push("/zero");
    },
    tosecond() {
      this.$router.push("/second");
    },

    async getState() {
      let res = await this.$http.post(
        `/oauth/2.0/token?grant_type=client_credentials&client_id=VGSpt2vCVd3psfFIxXojan4U&client_secret=qMzC73ImEzH3UspvTaA1bGBgEdgCwu2u`
      );
      // console.log(res);
      localStorage.access_token = res.data.access_token;
      console.log(this.access_token);
    },
    async sendImg(url) {
      // this.openFullScreen();
      this.getState();
      let formData = new FormData();
      formData.append("image", url);
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
            this.chresult = {};
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
            this.chresult.购方纳税人识别号 =
              res.data.words_result.PurchaserRegisterNum;
            this.chresult.销售方名称 = res.data.words_result.SellerName;
            this.chresult.销售方纳税人识别号 =
              res.data.words_result.SellerRegisterNum;
            this.chresult.联次信息 = res.data.words_result.SheetNum;
            this.chresult.类型 = this.$route.query.type;
            this.chresult.合计税额 = this.$route.query.TotalTax;
            this.chresults.push(this.chresult);
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
    recogImg() {
      this.fullscreenLoading = true;
      for (let i = 0; i < this.blogArr.length; i++) {
        this.sendImg(this.blogArr[i].url);
      }
      this.fullscreenLoading = false;
    },
    // 选择文件
    changeImg(e) {
      if (this.blogArr.length + e.target.files.length > this.uploadNum_Max) {
        alert(`最多上传${this.uploadNum_Max}张图片`);
        return;
      }
      this.base64 = [];
      for (let i = 0; i < e.target.files.length; i++) {
        let file = e.target.files[i]; // 拿到选择的文件信息(未压缩)
        console.log(file);
        let reader = new FileReader(); // 实例化FileReader
        reader.readAsDataURL(file); // 将文件信息转成DataUrl(base64)，转成功后执行 reader.onload 方法
        // 读取成功以后执行的方法
        reader.onload = (e) => {
          let img = new Image();
          img.src = e.target.result;
          this.base64.push(img.src);
          // console.log(img.src)
          img.onload = () => {
            this.imagetoCanvas(img); //Image 对象转变为一个 Canvas 类型对象,i为遍历的下标
          };
          this.bigimg(img.src)
        };
      }
      
      // document.querySelector("#bigimg").src = this.base64;
      console.log("###", this.base64);
    },

    // imagetoCanvas(image) 会将一个 Image 对象转变为一个 Canvas 类型对象，其中 image 参数传入一个Image对象
    imagetoCanvas(image) {
      var cvs = document.createElement("canvas");
      var ctx = cvs.getContext("2d");
      cvs.width = image.width;
      cvs.height = image.height;
      ctx.drawImage(image, 0, 0, cvs.width, cvs.height);
      let quality = 0.5;
      this.canvasResizetoFile(cvs, quality, image.src); //Canvas 对象压缩转变为一个 Blob 类型对象
    },

    //canvasResizetoFile(cvs,quality,fn) 会将一个 Canvas 对象压缩转变为一个 Blob 类型对象；其中 cvs 参数传入一个 Canvas 对象; quality 参数传入一个0-1的 number 类型，表示图片压缩质量;
    canvasResizetoFile(canvas, quality, src) {
      let _this = this;
      canvas.toBlob(
        function (blob) {
          _this.blogArr.push({
            url: src,
            file: blob,
          });
          console.log(_this.blogArr); //得到压缩后的Blob 类型对象
        },
        "image/jpeg",
        quality
      );
    },

    bigimg(url) {
      document.querySelector("#bigimg").src = url;
    },

    // 删除图片
    del(e, i) {
      if (e.url == document.querySelector("#bigimg").src) {
        document.querySelector("#bigimg").src = require("./icon/发票管理.png");
      }
      this.blogArr.splice(i, 1);
      console.log(this.blogArr);
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
.main {
  margin: 0 auto;
}
.mid {
  width: 90%;
  height: 70vh;
  max-width: 1240px;
  margin: 10px auto;
  min-width: 1000px;
  /* background-color: rgb(241, 212, 235); */
}
.left {
  float: left;
  width: 70%;
  height: 100%;
  /* overflow-y: auto; */
  /* background-color: #efef66; */
}
.bottom {
  margin-top: 20px;
}

.right {
  float: left;
  width: 30%;
  height: 100%;
  overflow: auto;
  /* border-left: 5px solid rgb(151, 148, 148); */
  padding-left: 5px;
  background-color: rgb(240, 240, 240);
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
.bigimg {
  width: 100%;
  padding-top: 10px;
  /* margin-top: 10px; */
  border: 2px solid rgb(220, 219, 212);
  height: calc(100% - 180px);
}
.img_d {
  position: relative;
  float: left;
  width: 20%;
  height: 70px;
  margin: 5px 10px;
  background-color: rgb(140, 140, 140) !important;
}
.img-centent {
  /* width: 100%; */
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.img-centent img {
  width: 100%;
}

.del_d {
  position: absolute;
  width: 20px;
  height: 20px;
  background: red;
  border-radius: 50%;
  top: -10px;
  right: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.del {
  width: 10px;
  height: 3px;
  background: white;
}
</style>