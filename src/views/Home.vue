<template>
  <div class="home">
    <lolkuScroll>

    </lolkuScroll>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import lolkuScroll from '@/components/lolkuScroll/scroll.vue'
console.log(lolkuScroll)
@Component({
  components: {
    lolkuScroll
  }
})
export default class Home extends Vue {
  selectIndex : Number = 0;
  tabData1: Object = [{
    name:"首页"
  },{
    name:"美食"
  },{
    name:"天天学习"
  },{
    name:"电影"
  },{
    name:"逛街"
  },{
    name:"遛狗"
  },{
    name:"放假"
  }];
  placedTopSelect: Boolean = false;
  // 滚动
  public scroll (e:any){
    e.target.scrollTop > 120 ? this.placedTopSelect = true: this.placedTopSelect = false;
  }
  created(){
    // this.$nextTick()
    // this.scroll('');
    // console.log(3131)
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
</style>

