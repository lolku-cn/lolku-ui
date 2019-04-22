<template>
    <div class="rotation">
        <!-- 使用solt对应的法子，进行对应着。 -->
        <div v-for="(item,index) in itemNumber" :key="index" :class="['lists',index==activeClass?'active':'']">
            <slot :name="index">
                <!-- {{scenery.length!=0?scenery[index].smallImg:''}} -->
                <img :src="item[config.img]" alt="">
                <p>{{item[config.name]}}</p>
            </slot>
        </div>
    </div>
</template>

<script>
    /**
     * 应用场景：
     * 只用于九宫格类型（包括中间按钮或者没有按钮的）
     * 旋转原理：
     * 1、用户的插槽与这边对应着，这杨可以将当前
     * 2、
     *                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
     * 使用情况：
     * 1、如果用户单击开始抽奖按钮后，先运动（调用run方法）在进行获取接口抽中的结果（物品位置），再次停止（stop传入时间）到哪个位置。
     * 2、如果是先获取抽取接口，在运动哪个位置，那么直接调用 stop 方法，传入旋转的时间。
     * 3、如果抽取机会有多次，那么就得重置下，在进行（情况1和情况2中）来跑
     */
   
    export default {
        data(){
            return {
                activeClass:0,
                timer:null,
                speedTime:0,
                stopTimer:null,
                num:0,
                noTrajectory:false,
                selectIndex:0,
                onruns:false,
            }
        },
        props:{
            // 用于告诉多少格子
            itemNumber:{
                type:[Number, Array],
                required:true
            },
            /**
             * 用于轨迹
             *  */
            trajectory:{
                type:Array
            },
            // 用于轨迹的第几个，进行选中
            activeIndex:{
                type:Number,
                required:true
            },
            // 运动的速度
            speed:{
                type:Number,
                default:160
            },
            // 修改字段名称：
            config:{
                type:Object,
                default(){
                    return {
                        img:'smallImg',
                        name:'name'
                    }
                }
            }
        },
        created(){
            this.activeClass = this.$props.activeIndex;
            this.selectIndex = this.activeClass;
            this.num = this.$props.activeIndex;
            this.speedTime = this.speed;
            // 判断是否没有轨迹，如果没有轨迹，那么就直接
            if(!this.trajectory) {
                this.noTrajectory = true;
            }
        },
        methods:{
            // 进行跑当前的
            run(){
                clearInterval(this.timer)
                this.timer = setInterval(() => {
                    this.onruns = true;
                    if(this.stopSelect) {
                        if(this.activeClass == this.selectIndex) {
                            this.onruns = false;
                            /**
                             * @return {active,trajectoryIndex}
                             */
                            this.$emit('on-stop', {active:this.activeClass,trajectoryIndex:!this.noTrajectory?this.trajectory[this.activeClass]:this.num});
                            // this.activeClass = this.$props.activeIndex;
                            clearInterval(this.timer)
                            return;
                        }
                    }
                    // 进行判断是否跑到最后轨迹了
                    if(!this.noTrajectory && this.num == this.trajectory.length-1) {
                        this.num = -1;
                    }else if(this.num == this.itemNumber-1) {
                        this.num = -1;
                    }
                    this.num++;
                    this.activeClass = !this.noTrajectory?this.trajectory[this.num]:this.num;
                },this.speedTime);
            },
            // 停止跑,
            stop(time = 3000){
                this.speedTime = this.speed;
                clearTimeout(this.stopTimer);
                // 由于更新了定时器时间，但是是不会再次更新的
                this.run();
                this.stopTimer = setTimeout(() => {
                    // 进行告诉当前要进行选中查询了
                    this.stopSelect = true;
                }, time);
            },
            // 重置，用于回到原来的位置
            extractionInit() {
                clearInterval(this.timer);
                this.speedTime = this.speed;
                this.num = this.$props.activeIndex;
                this.activeClass = this.$props.activeIndex;
                this.stopSelect = false;
            }
        },
        watch:{
            activeIndex(to){
                this.selectIndex = to;
                if(!this.onruns){
                    this.activeClass = to;
                }
            }
        },
        beforeDestroy(){
            clearInterval(this.timer);
            clearTimeout(this.stopTimer);
        }
    }
</script>
<style lang="less" scoped>
.rotation {
    display: flex;
    flex-wrap: wrap;
    .lists {
        width: 33.333333333333336%;
        height: 120px;
        text-align: center;
        padding: 6px;
        img {
            width: 100%;
        }
        &.active {
            background: aqua;
        }
    }
}
</style>
