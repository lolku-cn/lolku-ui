<template>
    <i :class="icon">
        <slot></slot>
    </i>
</template>

<script>
    /**
     * 
     * 1、如果是插槽的话，那么就不能使用 class了。
     * 先读取配置文件，然后在配置文件中，如果是
     */
    export default {
        data(){
            return {
                icon:''
            }
        },
        props:{
            type:{
                type:''
            }
        },
        created(){
            this.iconInit();
            // console.log(this.$slots);
        },
        methods:{
            iconInit(){
                if(!this.$slots.default) {
                    this.icon = 'lolku-icon lolkuIcon-'+this.$props.type;
                }
            }
        },
        watch:{
            type(){
                this.iconInit();
            }
        }
    }
</script>

<style lang="less" scoped>
// ../../assets/font/
@font-face {
  font-family: "lolkuIcon";
  font-weight: normal;
  font-style: normal;
  src: url('../../assets/font/iconfont.eot?t=1554810972100'); /* IE9 */
  src: url('../../assets/font/iconfont.eot?t=1554810972100#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('../../assets/font/iconfont.woff?t=1554810972100') format('woff'),
  url('../../assets/font/iconfont.ttf?t=1554810972100') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('../../assets/font/iconfont.svg?t=1554810972100#iconfont') format('svg'); /* iOS 4.1- */
}
.lolku-icon{
    width: 100%;
    font-family:"lolkuIcon" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    display: inline-block;
    &:before{
        // 平滑升级
        display: inline-block;
        margin-left: .2em;
        margin-right: .2em;
    }
}

.lolkuIcon-success:before {
  content: "\e61b";
}

.lolkuIcon-menu:before {
  content: "\e790";
}

.lolkuIcon-radio:before {
  content: "\e624";
}

.lolkuIcon-search:before {
  content: "\e611";
}

.lolkuIcon-check-box-checked:before {
  content: "\e606";
}

.lolkuIcon-warn:before {
  content: "\e60f";
}

.lolkuIcon-circle-warn:before {
  content: "\e600";
}

.lolkuIcon-more:before {
  content: "\e60c";
}

.lolkuIcon-home:before {
  content: "\e7ee";
}

.lolkuIcon-back:before {
  content: "\e60e";
}

.lolkuIcon-circle-close:before {
  content: "\e622";
}

.lolkuIcon-checked:before {
  content: "\e614";
}

.lolkuIcon-hazard:before {
  content: "\e715";
}

.lolkuIcon-close:before {
  content: "\e66c";
}

.lolkuIcon-top:before {
  content: "\e7ef";
}

.lolkuIcon-down:before {
  content: "\e7f0";
}

.lolkuIcon-right-black:before {
  content: "\e7f1";
}
</style>
