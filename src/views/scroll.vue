<template>
    <div>
        div
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    @Component({
        components: {

        }
    })
    export default class scroll extends Vue{
        /**
         * 用于滚动
         */
        isSupportTouch:Boolean = false
        public scroll () {
            
        }
        created () {
            this.$nextTick(()=>{
                // 判断当前的是有手指的
                this.isSupportTouch = "ontouchend" in document ? true : false;
            })
        }
    }
</script>


<style lang="less" scoped>

</style>

