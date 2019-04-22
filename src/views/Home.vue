<template>
  <div class="home" v-P="24">
    <div class="group">
      <div class="title">
        导航类
      </div>
      <div class="group-main">
        <div class="list" @click="groupList('/tab')">
          Tab 标签页
        </div>
      </div>
    </div>
    <div class="group">
      <div class="title">
        基本组件
      </div>
      <div class="group-main">
        <div class="list" @click="groupList('/tab')">
          icon
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
  }
})
export default class Home extends Vue {
  created(){
    // this.$nextTick()
    // this.scroll('');
    console.log(this.lolku)
  }
  public groupList (path:any) {
    this.$router.push(path);
  }
}
</script>
<style lang="less" scoped>
.scroll {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  .main {
    height: 1000px;
  }
}
.home {
  // padding: 24px;
  .group {
    border: 1px solid #ececec;
    // padding: 6px 12px;
    // border-radius: 10px;
    .title {
      // font-size: 16px;
      // padding-bottom: 7px;
    }
    .group-main {
      // font-size: 14px;
    }
  }
}
</style>

