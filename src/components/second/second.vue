<template>
  <div>
    这是第二个页面
    <button @click="gotoPath">点击</button>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";

export default {
  setup() {
    const { ctx } = getCurrentInstance();
    ctx.$router.beforeResolve((to, from, next) => {
      ctx.$store.commit("setCurrent", to.path);
      next();
    });
    const gotoPath = () => {
      let obj = {
        path: "/third",
        name: "third",
        title: "第三个"
      };
      ctx.$store.commit("setPage", obj);
      ctx.$router.push("/third");
    };
    return {
      gotoPath
    };
  }
};
</script>
