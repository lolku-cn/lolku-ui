<template>
    <div>
        <!-- {{'请根据索引值定义轨迹值：'+index}} -->
        <grid-lottery class="mat13px" :itemNumber="9" :activeIndex="1">
            <div v-for="(item,index) in 9" :key="index" :slot="index">
                根据索引可以制定运动轨迹：{{index}}
            </div>
        </grid-lottery>

        <grid-lottery class="mat13px grid2" :itemNumber="scenerys" ref="grid2" :activeIndex="0"></grid-lottery>
    </div>
</template>

<script>
    import {scenery} from '@/assets/imgurl.js'
    import gridLottery from '@/components/gridLottery/grid_lottery'
    export default {
        components:{
            gridLottery
        },
        data(){
            return {
                scenerys:[],
            }
        },
        created(){
            this.$nextTick(()=>{
                this.scenerys = scenery;
            })
        },
        methods:{

        }
    }
</script>

<style lang="less" scoped>
.mat13px {
    margin-top: 13px;
}
    /deep/ .grid2 {
        .lists {
            img {
                width: 50%;
            }
        }
    } 
</style>

