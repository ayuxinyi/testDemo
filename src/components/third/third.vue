<template>
  <div>
    这是第三个页面
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";

export default {
  setup() {
    const { ctx } = getCurrentInstance();
    return {};
  }
};
</script>
