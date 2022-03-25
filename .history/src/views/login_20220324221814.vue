<template>
  <div class="main">
    <div class="MainTitle">
      <div class="MainTitleImg">
        <img src="./img/智慧数字能源b.png" alt="">
      </div>
      <div class="MainTitleName">
        产线管理系统
      </div>
    </div>
    <div class="MainConcent"></div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      item: "",
    };
  },
  methods: {
    // 接口示例get，这个接口可用，用来体会下过程
    async fetch() {
      let res = await this.$http.get(`/proline/station/getLoginCode`);
      console.log(res);
      // 根据返回状态判断请求是否成功
      if (res.data.code == 20000) {
        this.item = res.data.data;
        console.log(this.item);
        this.$message({ message: res.data.message, type: "success" });
      } else {
        this.$message({ message: "获取信息失败", type: "warning" });
      }
    },
    // 请求登陆码状态
    async fetchType() {
      let res = await this.$http.get(
        `/proline/station/getLoginState/?code=${this.item}`
      );
      console.log(res);
      // 根据返回状态判断请求是否成功
      // if (res.data.code == 20000) {
      //   this.item = res.data.data;
      //   console.log(this.item);
      //   this.$message({ message: res.data.message, type: "success" });
      // } else {
      //   this.$message({ message: '获取信息失败', type: "warning" });
      // }
    },
    // 接口示例post,这个只是假设用法如何传值，接口无法使用
    async save() {
      let res = await this.$http.post(`student/group/new`, {
        number: this.items.length + 1,
        expClassId: this.expClassId,
        week: this.expTime.week,
        day: this.expTime.day,
        section: this.expTime.section,
        expId: this.expId,
      });
      console.log(res);
    },
  },

  async created() {
    await this.fetch();
    await this.fetchType();
  },
};
</script>

<style  scoped>
.main .MainTitle {
  margin: 0 auto;
  width: 96%;
  height: 80px;
  border-bottom: 2px solid #767676;
}
html,body{
    width: 100%;
    height: 100%;
}
.main .MainTitle .MainTitleImg{
  width: 200px;
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
.main .MainTitle .MainTitleImg img{
  width: 100%;
  height: 100%;
}
.main .MainTitle .MainTitleName{
  float: left;
  height: 80px;
  margin-bottom: 10px;
  margin-top: 20px;
  top: 20px;
  padding: 0 50px;
  color: white;
  font-size: 20px;
}
</style>
