<template>
  <div class="home">
    <div class="tabMenue">
      <div :class="CurrentPath == item.path ? 'active':''" class="tabItem" v-for="(item,index) in PageArr" @click="gotoPage(item.path)" :key="index">
        {{item.title}}
        <img v-if="index !=0" @click.stop="deletePath(item.path)" src="@/assets/img/close.png" alt="">
      </div>
    </div>
    <div class="wrapper">
      <keep-alive>
        <router-view v-if="keepAlive" />
      </keep-alive>
      <router-view v-if="!keepAlive" />
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, computed, onUnmounted, ref } from "vue";
export default {
  setup() {
    const { ctx } = getCurrentInstance();
    const PageArr = computed(() => ctx.$store.state.page);
    const CurrentPath = computed(() => ctx.$store.state.currentPath);
    const deletePath = path => {
      ctx.$store.commit("deletePage", path);
      console.log(ctx.$store.state.page);
      // history.go(-1);
    };
    console.log(getCurrentInstance())
    const keepAlive = ref(ctx.$router.currentRoute.value.meta.keepAlive);
    const gotoPage = path => {
      console.log(ctx.$router);
      ctx.$store.commit("setCurrent", path);
      ctx.$router.push(path);
    };
    return {
      PageArr,
      gotoPage,
      CurrentPath,
      deletePath,
      keepAlive
    };
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  .tabMenue {
    background: #ebeef3;
    height: 40px;
    padding-top: 10px;
    overflow: hidden;
    .tabItem {
      cursor: pointer;
      color: #222;
      background: #fff;
      @include flex();
      @include wh(90px, 30px);
      float: left;
      font-size: 12px;
      border-radius: 8px 8px 0 0;
      margin-left: 15px;
      position: relative;
      img {
        width: 20px;
        @include positionRight(absolute, -10px, 0px);
      }
    }
    .active {
      color: #419afe;
    }
  }
  .wrapper {
    width: 100%;
    height: calc(100% - 40px);
  }
}
</style>
