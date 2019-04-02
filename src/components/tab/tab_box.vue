
<template>
    <div  class="tab-box">
        <div ref="tabMain" :style="styles" :class="['tab',spaceBetween?'spaceBetween':'',placedTopSelect?'placedTop':'']" >
            <slot></slot>
        </div>
    </div>
</template>

<script>
    /**
     * @老程
     * ** 注意：1、在阿语中，offsetLeft 值与scrollLeft值是相反的，scrollLeft设置是从右到左习惯来的。2、销毁此组件，如果当前有dom 插入到其他的外面的dom中，不会进行销毁，所以在销毁前弄回。 **
     * 第一步：根据 des_index 这个字段来定义 v-model 传值，传当前需要选中的第几个。
     * 第二步：监听传过来的第几个被选中，然后将值传给 item_tab 子组件，只要通知之前选中的去掉选中样式和通知现在要选中样式。
     * 第三步：进行滚动到哪个位置。判断是否是阿语，如果是阿语进行反方向和上面的注意点来。如果是（从右到左习惯）来的话，应该直接赋值即可
     * 
     */
    import anime from 'animejs';
    export default {
        name:'',
        data(){
            return {
                width:'0',
                spaceBetween:false,
                styles:{},
                suckObj:null
            }
        },
        // mixins:[parents],
        props:{
            // 选中索引
            des_index:{
                type:Number,
                required:true
            },
            // 切换置顶还是不置顶
            placedTopSelect:{
                type:Boolean,
                default:false
            },
            // 置顶的样式
            placedTopStyle:{
                type:Object
            },
            // 置顶到哪个元素上，默认是插入到自身上级元素上。
            SuckTheTop:{
                type:Object
            },
            // 布局方向。上、左、右
            
        },
        model:{
            prop:"des_index",
            event:'on-setStatus'
        },
        mounted(){
            this.$nextTick(()=>{
                console.log(this)
                this.suckObj = this.$props.SuckTheTop || this.$parent.$el;
                // 如果一进来就设置了置顶的话，那么这个就得置顶
                if(this.placedTopSelect) {
                    // 插入到当前 html
                    this.suckObj.append(this.$refs.tabMain);
                }
            })
        },
        /**
         * 注意：在父组件中，不能使用生命周期进行监控子元素，不然会你会发现
         */
        methods:{
            // 移动
            move(index,flag){
                // console.log(Math.abs(this.$children[index].$el.offsetLeft));
                // 此处判断是否是阿语
                // 如果是阿语的话以 offsetRight 值来，但是没有这个值，获取最后一个元素
                // this.$el.scrollLeft =  document.body.offsetWidth - this.$children[index].$el.offsetLeft 
                // console.log(window.getComputedStyle(this.$children[index].$el))
                // console.dir(this.$children[index].$el)
                // 计算滚动多少公式： 
                // 1、判断是否是阿语
                if(window.getComputedStyle(this.$el).direction == 'rtl') {
                    let children = this.$children[this.$children.length - index -1].$el;
                    // this.$el.scrollLeft =  (children.offsetLeft?-children.offsetLeft:Math.abs( children.offsetLeft) ) + 180 - children.offsetWidth/2;
                    // debugger
                    anime({
                        targets:this.$refs.tabMain,
                        scrollLeft:(children.offsetLeft?-children.offsetLeft:Math.abs( children.offsetLeft) ) + this.width - children.offsetWidth/2,
                        easing: 'linear',
                        duration:flag?0:400
                    })
                }else {
                    anime({
                        targets:this.$refs.tabMain,
                        scrollLeft:this.$children[index].$el.offsetLeft - this.width + (this.$children[index].$el.offsetWidth/2),
                        duration:flag?0:400,
                        easing: 'linear'
                    })
                }
                
                // log(this.$children.length - index)
                // log(  );
                // log(this.$el.scrollLeft)
            },
            // 当子组件通知此组件，子组件已经加载完成。可以滚动。
            updateParent(){
                this.width = (document.documentElement.clientWidth || document.body.clientWidth )/2;
                this.$children[this.$props.des_index].updatedData(this.$props.des_index);
                // 解决在阿语中最后一个没有被选中
                setTimeout(()=>{
                    this.move(this.$props.des_index);
                },100)
                if(this.$el.scrollWidth >= this.width*2) {
                    this.spaceBetween = true;
                }
            }
        },
        watch:{
            // 2、监听选中
            des_index(to,form){
                this.move(to);
                this.$children[to].updatedData(to)
                this.$children[form].updatedData(null)
            },
            // 进行放入到置顶
            placedTopSelect(to){
               to? this.suckObj.append(this.$refs.tabMain) : this.$el.append(this.$refs.tabMain);
                // 上面的每次切换都会滑动位置重置为0的地方。所以下面移动。第二个参数为了不直接到达
                this.move(this.des_index,true);
            },
            // 更新置顶样式
            placedTopStyle(to){
                this.styles = to;
            }
        },
        // 进行销毁之前要泼出去的tab内容。拉回来进行销毁
        beforeDestroy(){
            // 当前切换语言的时候，你会发现在外面是不会进行销毁的。
            if(this.placedTopSelect) {
                this.$el.append(this.$refs.tabMain)
            }
        }
    }
</script>

<style lang="less" scoped>
    .tab-box {
        height: 1.95rem;
        overflow: hidden;
        width: 100%;
    }
    .tab {
        width: 100%;
        height: 1.95rem;
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: auto;
        padding: 0 0.68rem;
        &.spaceBetween {
            justify-content: space-between;
        }
        & /deep/ .item {
            flex: 1;
        }
        &.placedTop {
            position: fixed;
            height: auto;
            background-color: #fff;
            top: 0;
            left: 0;
            z-index: 999;
            padding: 0.4rem 0.68rem;
            box-sizing: inherit;
        }
    }
    .tab::-webkit-scrollbar {
        display: none;
    }
</style>
