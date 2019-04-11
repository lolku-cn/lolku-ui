<template>
  <div class="home">
    <tab-box v-model="selectIndex" :placedTopSelect="placedTopSelect" >
      <tab-item 
      :itemIndex="index"
      v-for="(item,index) in tabData1" 
      :key="index" 
      @click.native="selectIndex=index"
      :tab_options="{
        shapeOf:'bump',
        color:'',
        background:'',
        lineThickness:'',
        radius:''
      }"
      >{{item.name}}</tab-item>
    </tab-box>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import {tabBox,tabItem} from '@/components/tab/index'
@Component({
  components: {
    tabBox,
    tabItem
  }
})
export default class Tab extends Vue {
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
  
}
</script>
<style lang="less" scoped>
.home {
    padding-top: 12px;
}
</style>

