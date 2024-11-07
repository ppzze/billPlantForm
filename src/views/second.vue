<template>
  <div class="first">
    <div class="mid">
      <div class="left">
        <img
          id="fileimg"
          @click="onshowfile"
          style="height: 75%"
          src="./icon/发票管理.png"
          alt=""
        />

        <div class="bottom">
          <input type="file" @change="getimgs(this)" name="" id="gfile" />
          <el-button
            v-loading.fullscreen.lock="fullscreenLoading"
            type="primary"
            @click="sendImg"
            >发送</el-button
          >
        </div>
      </div>
      <div class="right">
        <div class="rtitle">增值税发票-识别结果</div>
        <div v-if="!this.show" class="rresult">
          <span style="font-size: 16px">等待识别</span>
        </div>
        <div v-if="this.show" class="rresult">
          <span style="font-size: 16px">共有{{ resultnum }}类</span>
          <json-viewer
            :value="result"
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
      access_token: "",
      base64: "",
      resultnum: "",
      result: {},
      show: false,
      fullscreenLoading: false,
    };
  },
  mounted() {
    console.log(this.result);
  },
  methods: {
    async getState() {
      let res = await this.$http.post(
        `/oauth/2.0/token?grant_type=client_credentials&client_id=VGSpt2vCVd3psfFIxXojan4U&client_secret=qMzC73ImEzH3UspvTaA1bGBgEdgCwu2u`
      );
      // console.log(res);
      localStorage.access_token = res.data.access_token;
      console.log(this.access_token);
    },
    async sendImg() {
      this.getState();
      let formData = new FormData();
      formData.append("image", this.base64);
      await this.$http
        .post(
          `/rest/2.0/ocr/v1/vat_invoice?access_token=${localStorage.access_token}`,
          formData
        )
        .then((res) => {
          console.log(res);
          const h = this.$createElement;
          if (typeof res.data.error_code !== "undefined") {
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
            this.resultnum = res.data.words_result_num;
            this.show = true;
            if (localStorage.getItem("result") == undefined) {
              let result = [];
              result.push(res.data.words_result)
              localStorage.setItem(
                "result",
                JSON.stringify(result)
              );
              console.log(localStorage.getItem("result"));
              // console.log("1111");
            } else {
              // let result = [];
              let be = JSON.parse(localStorage.getItem("result"));
              console.log(be)
              be.push(res.data.words_result)
              // result.push(be)
             
              // result.push(res.data.words_result);
              localStorage.setItem("result", JSON.stringify(be));
              console.log(localStorage.getItem("result"));
              // console.log("1122");
            }
          }
        });
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
  },
};
</script>

<style  scoped>
#fileimg {
  cursor: pointer;
}
.mid {
  width: 90%;
  height: 80vh;
  margin: 0 auto;
  min-width: 1000px;
  /* background-color: rgb(241, 212, 235); */
}
.left {
  float: left;
  width: 70%;
  height: 100%;
  background-color: #fffffe;
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
</style>
