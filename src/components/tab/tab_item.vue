<template>
    <div :class="['item',activeIndex==itemIndex?'active':'',activeIndex==itemIndex?shapeOf:'']" :style="activeIndex==itemIndex?activeStyle:{}"  :itemIndex="itemIndex">
        <slot></slot>
    </div>
</template>

<script>
    import objectAssign from 'object-assign'
    export default {
        
        data(){
            return {
                activeIndex:null,
                left:'',
                activeStyle:{},
                shapeOf:''
            }
        },
        props:{
            itemIndex:{
                type:Number,
                required:true
            },
            // 子组件配置项
            tab_options:{
                type:Object,
                default(){
                    return {}
                }
                /**
                 * // 线性配置项
                 * lineConfig:{
                 *      color:'' ; // 字体的颜色
                 *      lineColor: '' // 线的颜色
                 *      linerWidth: '' // 线的宽度
                 *      linerAnimation:'' // 提供几种动画
                 *      direction:'' // 方向，默认是下。其他的就是上了
                 * }
                 * // 椭圆配置项
                 * pillConfig :{
                 *      color:''// 字体颜色
                 *      pillBg: // 背景颜色
                 *      pillRadius: '' // 圆角多少
                 * }
                 * 
                 * // 凹凸配置项 是线与椭圆的组合
                 * 
                 * 
                 */
            }
        },
        // mixins:[child],
        created(){
            this.$nextTick(()=>{
                // 告诉父元素，我已经更新。
                this.$parent.$children.length-1 == this.itemIndex ?this.$parent.updateParent():'';
                // let options = objectAssign(, this.tab_options)
                


                // for(var items in  this.tab_options) {
                //     //  this.tab_options[items].
                //     switch (items) {
                //         case 'shapeOf':
                //             this.shapeOf = this.tab_options.shapeOf;
                //             if(this.shapeOf == 'bump' || 'line') {
                //                 this.$parent.$el.style.borderBottom = '1px solid #14D2B8'
                //             }
                //             break;
                //         case 'color':
                //             this.activeStyle.color = this.tab_options.color
                //             break;
                //         case 'background':
                //             this.activeStyle.background = this.tab_options.background
                //             break;
                //         case 'lineThickness':
                //             this.shapeOf == 'line' ? this.activeStyle.borderBottom = this.tab_options.lineThickness : '';
                //             break;
                //         case 'radius':
                //             this.shapeOf != 'line' &&  this.shapeOf != "bump" ? this.activeStyle.borderRadius= this.tab_options.radius: '';
                //             break;
                //         default:
                //             break;
                //     }
                // }
            })
        },
        methods:{
            updatedData(index){
                this.activeIndex = index;
            }
        },
        // watch:{
        //     activeStyle(to){
        //         console.log(to)
        //     }
        // }
    }
</script>

<style lang="less" scoped>
    .item {
        white-space:nowrap; 
        line-height: 0.825rem;
        padding:  0.58rem 0.9375rem;
        font-weight: 600;
        font-size: 0.825rem;
        text-align: center;
        // position: absolute;
    }
    .active {
        background: #14D2B8;
        color: #fff;
        border-radius: 20px;
        &.bump {
            border-radius: 12px 12px 0 0;
        }
    }
    .tab-vi {
        display: block;
        height: 100%;
        width: 100%;
    }
</style>

