<template>
  <div>
    <div class="title">登录界面</div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      item: [],
    };
  },
  methods: {
    // 接口示例get，这个接口可用，用来体会下过程
    async fetch() {
      let res = await this.$http.get(`api/public/v1/categories`);
      console.log(res);
      // 根据返回状态判断请求是否成功
      if (res.data.meta.status == 200) {
        this.item = res.data.message;
        console.log(this.item);
      } else {
        this.$message({ message: res.data.meta.msg, type: "warning" });
      }
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

  created() {
    this.fetch();
  },
};
</script>

<style  scoped>
.title {
  font-size: 25px;
  color: #222;
}
</style>
