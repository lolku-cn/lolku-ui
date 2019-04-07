<template>
    <div class="scroll-wrap">
        <div ref="up" class="up" :style="{height:upH+'px'}">
            <slot name="up">
                {{upText}}
            </slot>
        </div>
        <div class="ajScroll" ref="ajScroll" :style="scrollStyle">
            <div class="scroll-main" ref="scrollHeight">
                {{pageY}}
                <div class="lists" v-for="i in datas" :key="i">
                    {{i}}
                </div>
            </div>
        </div>
        <div class="down" ref="down" :style="downStyle">
            <slot name="down">
                {{downText}}
            </slot>
        </div>
    </div>
</template>

<script>
    /**
     * 需求：
     * 1、可以自定义顶部与底部样式
     */
    import anime from 'animejs';
    export default {
        name:'updown',
        data() {
            return {
                scroll:null,
                datas:92,
                upH:'0',
                upHNum:0,
                isSupportTouch:false,
                pageY:0,
                scrollNumber:0,
                scrollStyle:{},
                statusUp:1, // 1：未请求。2：请求中（请求中，是不能动的。）
                statusDown:1, // 1：未请求。2、请求中(上拉请求中，是可以在下拉的)
                upConfig:{ // 下拉配置项
                    loadding:'加载中...',
                    upText:'下拉刷新',
                    offset:60,
                    maxOffset:80
                },
                downCinfig:{ // 上拉配置项
                    loadding:'加载中...',
                    downText:'上拉刷新',
                    bottomB: 420,
                },
                upText:'',
                downText:'',
                parentHeight:0,
                direction:true, // 方向，用来判断是往上还是往下，true为往上，如果是往下为false
                scrollMainHeight:'',
                scrollH:'',
                scrollOffset:'',
                setDontData:false, // 用于判断数据加载完成，不需要再触发那些事情了。
                downStyle:{
                    height:0
                },
                appendDown:false, // 是否插入到滚动里面
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.scroll = this.$refs.ajScroll;
                // window.addEventListener('resize',this.deviceType);
                this.scrollEventBing();
                this.configInit();
            })
        },
        methods: {
            // 设备型号
            deviceType(){
                // 判断当前的是有手指的
                this.isSupportTouch = "ontouchend" in document ? true : false;
            },
            // 重置配置
            configInit(){
                this.upText = this.upConfig.upText;
                this.downText = this.downCinfig.downText;
                this.statusUp = 1;
                this.statusDown = 1;
                this.pageY = 0;
                this.scrollNumber = 0;
                this.parentHeight = Number(window.getComputedStyle(this.$el).height.split('px')[0]);
                this.scrollStyle.height = this.parentHeight + 'px';
            },
            // 绑定事件
            scrollEventBing() {
                let timeout = null;
                // 滚动
                this.scroll.addEventListener('scroll', (e) =>{
                    this.scrollNumber = e.target.scrollTop;
                    // 判断是否是到了底部
                    if(this.scrollNumber == this.scrollH) {
                        // console.log('到底部了')
                    }else if(this.scrollNumber >= this.scrollOffset){ // 判断当前是否是在
                        // console.log('到了设置偏移区域')
                        if(!this.appendDown && !this.setDontData){
                            this.appendDown = true;
                            this.$refs.scrollHeight.append(this.$refs.down);
                            this.downStyle = {
                                height:'auto'
                            }
                        }
                    }
                },false);
                //记录开始位置 this.isSupportTouch ? :'mousedown'
                this.scroll.addEventListener( 'touchstart' ,  e=> {
                    if(this.statusUp == 2) {
                        return;
                    }
                   this.pageY = e.changedTouches[0].pageY;
                    //  获取滚动里面的高度  
                   this.scrollMainHeight = Number(window.getComputedStyle(this.$refs.scrollHeight).height.split('px')[0]);
                   // 使用高度减去当前外面滚动高度即可
                   this.scrollH =this.scrollMainHeight- this.parentHeight;
                   // 将滚动到偏移地方，设置；
                   this.scrollOffset = this.scrollH - this.downCinfig.bottomB;
                },false)
                // 
                this.scroll.addEventListener( 'touchmove' ,  e=> {
                    if(this.statusUp == 2) {
                        return;
                    }
                    /**
                     * @老程
                     * 两种情况
                     * 情况一：判断当前的为最顶部，且判断当前是往上滑动还是往下滑动
                     * 情况二：判断当前马上接近底部（扩展中可以偏移多少），
                     * 定义三个事件
                     */
                    if(this.scrollNumber == 0 && e.changedTouches[0].pageY >= this.pageY) { // 从 this.scrollNumber 为0可以判断滚动的到顶部了
                        this.direction = true;
                        this.downStyle = {
                            height:'0px'
                        }
                        this.upHNum  = e.changedTouches[0].pageY - this.pageY;
                        // 判断下拉的距离小于配置偏移的不
                        if(this.upHNum < this.upConfig.maxOffset)
                        {
                            this.upH = this.upHNum;
                            this.scrollStyle = {
                                overflowY:'hidden',
                                height:this.parentHeight - this.upH +'px'
                            }
                        }
                    }else if(e.changedTouches[0].pageY < this.pageY) {
                        // 往下方向
                        this.direction = false;
                    }
                },false);
                // 抬起手指
                this.scroll.addEventListener('touchend',e=>{
                    
                    if(this.statusUp == 2) {
                        return;
                    }
                    if(this.direction) {
                        
                         // 下拉判断偏移量
                        if(this.upH >= this.upConfig.offset) {
                            // 请求中状态
                            this.statusUp = 2;
                            this.upText = this.upConfig.loadding;
                            anime({
                                targets: this.$refs.up,
                                height: this.upConfig.offset,
                                easing: 'easeInOutQuad',
                                duration:420,
                                complete:()=>{
                                    this.scrollStyle.height = this.parentHeight -  this.upConfig.offset + 'px';
                                }
                            });
                        } else {
                            anime({
                                targets: this.$refs.up,
                                height: 0,
                                easing: 'easeInOutQuad',
                                duration:120,
                                complete:()=>{
                                    this.scrollStyle = {
                                        overflowY:'auto',
                                        height:this.parentHeight +'px'
                                    }
                                }
                            })
                        }
                    }else {
                        
                    }
                   
                })
                // 给当前dom绑定方法，如果调用则进行还原
                this.$el.__proto__.onSuccessed = (setDontData) => {
                    this.animeRun(this.$refs.up)
                    this.animeRun(this.$refs.down);
                    this.configInit();
                    this.setDontData = setDontData
                    console.log('调用成功')
                }
                window.ssd = () =>{
                    this.$el.onSuccessed()
                }
                // this.$el.onSuccessed()
            },
            // 动画
            animeRun(obj) {
                anime({
                    targets:obj,
                    height: 0,
                    easing: 'easeInOutQuad',
                    duration:200,
                    complete:()=>{
                        this.upH = 0;
                        this.downStyle = {
                            height:0
                        }
                        this.scrollStyle = {
                            overflowY:'auto',
                            height:this.parentHeight +'px'
                        }
                    }
                });
                this.$refs.down == obj && this.appendDown ? this.$el.append(obj):''
                this.appendDown = false;
            }
        }
    }
</script>

<style lang="less" scoped>
    .ajScroll {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .lists {
        height: 42px;
        line-height: 42px;
        text-align: center;
    }
    .scroll-wrap {
        height: 100vh;
        
    }
    .up {
        overflow: hidden;
        background-color: aqua;
    }
    .down {
        height: 0px;
        overflow: hidden;
    }
</style>